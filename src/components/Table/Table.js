import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { memo, useRef, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faBackwardStep,
    faCaretDown,
    faForwardStep,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faEdit, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { Button } from '../Input';
import Modal from '../Modal';

import style from './Table.module.scss';

const cx = classNames.bind(style);

Table.propTypes = {
    title: PropTypes.string,
    prefixRowName: PropTypes.string,
    minWidth: PropTypes.number,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    tabs: PropTypes.array,
    pageSizeOptions: PropTypes.array,
    onAddMore: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    onClickRow: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    btnControl: PropTypes.bool,
    onClickEdit: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickTab: PropTypes.func,
};

function Table({
    title,
    prefixRowName,
    minWidth,
    rows = [],
    columns = [],
    tabs = [],
    pageSizeOptions = [],
    onAddMore,
    onClickRow,
    btnControl,
    onClickEdit,
    onClickDelete,
    onClickTab,
}) {
    const deleteModalRef = useRef(null);
    const [deleteRow, setDeleteRow] = useState({ row: {}, index: null });
    const [pageSize, setPageSize] = useState(pageSizeOptions[0]?.value || pageSizeOptions[0] || 5);
    const [page, setPage] = useState(1);
    const maxPage = Math.ceil(rows.length / pageSize);
    const displayedRow = page * pageSize;
    const startIndex = (page - 1) * pageSize;
    const lastIndex = displayedRow > rows.length ? rows.length : displayedRow;
    const displayRow = rows.slice(startIndex, lastIndex);

    const handlePagination = (numberPage) => {
        if (numberPage >= 1 && numberPage <= maxPage) {
            setPage(numberPage);
        }
    };

    const handleSelectPageSize = (e) => {
        handlePagination(1);
        const size = e.target.value;
        setPageSize(size);
    };

    const RenderPaginationOptions = () => {
        const options = [];
        for (let i = 0; i < maxPage; i++) {
            const value = i + 1;
            options.push(
                <option value={value} key={value}>
                    {value}
                </option>,
            );
        }

        return options;
    };

    const RenderPaginationPageSize = () => {
        return pageSizeOptions.map((pageSizeOption) => {
            let size = pageSizeOption === -1 ? rows.length : pageSizeOption;
            let label = size;
            if (typeof pageSizeOption === 'object') {
                size = pageSizeOption.value === -1 ? rows.length : pageSizeOption.value;
                label = pageSizeOption.label;
            }
            return (
                <option value={size} key={size}>
                    {label}
                </option>
            );
        });
    };

    return (
        <div className={cx('wrapper')}>
            {!!title && <h4 className={cx('title')}>{title}</h4>}
            {tabs.length > 0 && (
                <ul className={cx('tab-list')}>
                    {tabs.map((tab, index) => (
                        <li className={cx({ active: tab.active })} key={index} onClick={(e) => onClickTab(index, e)}>
                            {tab.title}
                        </li>
                    ))}
                </ul>
            )}
            <div className={cx('table-container')}>
                <table style={{ minWidth: minWidth }}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <td key={column.id} style={{ width: column.width }}>
                                    {column.headerName}
                                </td>
                            ))}
                            {btnControl && <td className={cx('edit-table')}></td>}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 &&
                            displayRow.map((row, index) => {
                                return (
                                    <tr
                                        className={cx('row')}
                                        key={row._id}
                                        onClick={(e) => onClickRow && onClickRow(row, e)}
                                    >
                                        {columns.map((column) => (
                                            <td key={column.id}>
                                                {column.image ? (
                                                    <div className={cx('imga-col')}>
                                                        <img src={row[column.id]} alt="" />
                                                    </div>
                                                ) : (
                                                    row[column.id]
                                                )}
                                            </td>
                                        ))}
                                        {btnControl && (
                                            <td className={cx('edit-table')}>
                                                <div className={cx('btn-control')}>
                                                    <Button
                                                        size="sm"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onClickEdit(row, index, e);
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        danger
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setDeleteRow({ row, index: index });
                                                            deleteModalRef.current.open();
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faTrashCan} />
                                                    </Button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            {rows.length === 0 && (
                <div className={cx('empty')}>
                    <p>Chưa có dữ liệu</p>
                    {!!onAddMore && (
                        <Button
                            className={cx('addmore')}
                            rounded
                            size="sm"
                            leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                            onClick={onAddMore}
                        >
                            Thêm
                        </Button>
                    )}
                </div>
            )}
            <div className={cx('pagination')}>
                <span className={cx('displayed-rows')}>
                    {rows.length > 0 ? startIndex + 1 : 0} - {lastIndex} of {rows.length}
                </span>
                <div className={cx('control')}>
                    {pageSizeOptions.length > 0 && (
                        <div className={cx('select-group')}>
                            <span className={cx('text')}>Số hàng trên trang</span>
                            <div className={cx('select-wrapper')}>
                                <select value={pageSize} onChange={handleSelectPageSize}>
                                    {RenderPaginationPageSize()}
                                </select>
                                <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
                            </div>
                        </div>
                    )}
                    <div className={cx('select-group')}>
                        <span className={cx('text')}>Trang</span>
                        <div className={cx('select-wrapper')}>
                            <select value={page} onChange={(e) => setPage(e.target.value)}>
                                {RenderPaginationOptions()}
                            </select>
                            <FontAwesomeIcon className={cx('icon')} icon={faCaretDown} />
                        </div>
                    </div>
                    <button disabled={page <= 1} onClick={() => handlePagination(1)}>
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </button>
                    <button disabled={page <= 1} onClick={() => handlePagination(page - 1)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button disabled={page >= maxPage} onClick={() => handlePagination(page + 1)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <button disabled={page >= maxPage} onClick={() => handlePagination(maxPage)}>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </button>
                </div>
            </div>

            <Modal
                theme="danger"
                title="Xác nhận xóa"
                modalRef={deleteModalRef}
                acceptBtnText="Xóa"
                onAcceptClick={(e) => {
                    deleteModalRef.current.close();
                    onClickDelete(deleteRow.row, deleteRow.index, e);
                }}
            >
                {prefixRowName} <strong style={{ color: 'var(--danger-color)' }}>{' ' + deleteRow.row.name}</strong> sẽ
                được chuyển vào thùng rác. Chọn "Xóa" để xác nhận?
            </Modal>
        </div>
    );
}

export default memo(Table);
