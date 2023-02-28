import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import style from './Table.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faBackwardStep, faForwardStep } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Table({ title, rows, columns }) {
    return (
        <div className={cx('wrapper')}>
            {!!title && <h4 className={cx('title')}>{title}</h4>}
            <table>
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
                    {rows.map((row, index) => {
                        return (
                            <tr key={row.id ?? index}>
                                {columns.map((column) => (
                                    <td key={column.id}>{row[column.id]}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={cx('pagination')}>
                <div className={cx('control')}>
                    <button>
                        <FontAwesomeIcon icon={faBackwardStep} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                    <button>
                        <FontAwesomeIcon icon={faForwardStep} />
                    </button>
                </div>
            </div>
        </div>
    );
}

Table.propTypes = {
    title: PropTypes.string,
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
};

export default Table;
