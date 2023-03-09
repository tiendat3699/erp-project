import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Calendar, DateRange } from 'react-date-range';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './DatePicker.module.scss';

const cx = classNames.bind(styles);

const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};
function DatePicker({ size = 'md', label, rangeSelector, className, message, register }) {
    const [rangeDate, setRangeDate] = useState(selectionRange);
    const [date, setDate] = useState(new Date());
    const [focus, setFocus] = useState(false);

    const renderDatePicker = (attr) => (
        <div {...attr}>
            <PopperWrapper className={cx('date-popper')}>
                {rangeSelector ? (
                    <DateRange
                        months={2}
                        direction="horizontal"
                        dateDisplayFormat="P"
                        locale={vi}
                        ranges={[rangeDate]}
                        onChange={(range) => setRangeDate(range.selection)}
                    />
                ) : (
                    <Calendar date={date} locale={vi} onChange={(date) => setDate(date)} />
                )}
            </PopperWrapper>
        </div>
    );

    const renderResult = () => {
        if (rangeSelector) {
            const startDate = format(rangeDate.startDate, 'P', { locale: vi });
            const endDate = format(rangeDate.endDate, 'P', { locale: vi });
            return (
                <span>
                    Từ
                    <strong> {startDate} </strong>
                    Đến
                    <strong> {endDate} </strong>
                </span>
            );
        } else {
            return format(date, 'P', { locale: vi });
        }
    };

    const getValue = (date) => {
        return JSON.stringify(date);
    };

    return (
        <Tippy
            trigger="click"
            placement="bottom-start"
            interactive
            render={renderDatePicker}
            onShow={() => setFocus(true)}
            onHide={() => setFocus(false)}
        >
            <div className={cx('wrapper')}>
                <input type="hidden" value={getValue(rangeSelector ? rangeDate : date)} {...register} />
                {label && <label className={cx('label')}>{label}</label>}
                <div className={cx('input', { [size]: size, focus, className })}>
                    <p>{renderResult()}</p>
                </div>
                {message && (
                    <span className={cx('error-messgae')}>
                        <FontAwesomeIcon className={cx('error-icon')} icon={faTriangleExclamation} />
                        {message}
                    </span>
                )}
            </div>
        </Tippy>
    );
}

DatePicker.propTypes = {
    size: PropTypes.string,
    label: PropTypes.string,
    rangeSelector: PropTypes.bool,
    className: PropTypes.string,
    message: PropTypes.string,
    register: PropTypes.object,
};

export default DatePicker;
