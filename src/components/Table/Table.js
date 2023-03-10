import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';

import style from './Table.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleLeft,
    faAngleRight,
    faBackwardStep,
    faCaretDown,
    faForwardStep,
    faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../Input';

const cx = classNames.bind(style);

function Table({ title, minWidth, rows = [], columns = [], pageSizeOptions = [], onAddMore, onClickRow }) {
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
            <div className={cx('table-container')}>
                <table style={{ minWidth: minWidth }}>
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <td key={column.id} style={{ width: column.width }}>
                                    {column.headerName}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length > 0 &&
                            displayRow.map((row, index) => {
                                return (
                                    <tr key={index} onClick={(e) => onClickRow(row, e)}>
                                        {columns.map((column) => (
                                            <td key={rows.id || column.id}>{row[column.id]}</td>
                                        ))}
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            {rows.length === 0 && (
                <div className={cx('empty')}>
                    <p>Ch??a c?? d??? li???u</p>
                    {!!onAddMore && (
                        <Button
                            className={cx('addmore')}
                            rounded
                            size="sm"
                            leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                            onClick={onAddMore}
                        >
                            Th??m
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
                            <span className={cx('text')}>S??? h??ng tr??n trang</span>
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
        </div>
    );
}

Table.propTypes = {
    title: PropTypes.string,
    minWidth: PropTypes.number,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    pageSizeOptions: PropTypes.array,
    onAddMore: PropTypes.func,
    onClickRow: PropTypes.func,
};

export default memo(Table);
