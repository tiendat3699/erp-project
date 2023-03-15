import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import TippyHeadless from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Calendar, DateRange } from 'react-date-range';
import { Wrapper as PopperWrapper } from '~/components/Popper';

import styles from './DatePicker.module.scss';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const cx = classNames.bind(styles);

const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
};
function DatePicker({
    size = 'md',
    label,
    rangeSelector,
    className,
    message,
    inputRef,
    placementMessage = 'bottom-end',
    ...props
}) {
    const [rangeDate, setRangeDate] = useState(selectionRange);
    const [date, setDate] = useState(new Date());
    const [focus, setFocus] = useState(false);

    const { value, onChange, ...restProps } = props;

    const handleChange = (data) => {
        let date = data;
        if (rangeSelector) {
            date = data.selection;
            setRangeDate(date);
        } else {
            setDate(date);
        }
        onChange(date);
    };

    useEffect(() => {
        if (rangeSelector) {
            onChange(rangeDate);
        } else {
            onChange(date);
        }
    }, [date, onChange, rangeDate, rangeSelector]);

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
                        initialFocusedRange={[0, 1]}
                        onChange={handleChange}
                        ref={inputRef}
                        {...restProps}
                    />
                ) : (
                    <Calendar date={date} locale={vi} onChange={handleChange} ref={inputRef} {...restProps} />
                )}
            </PopperWrapper>
        </div>
    );

    const renderResult = () => {
        if (rangeSelector) {
            const date = value || rangeDate;
            const startDate = format(date.startDate, 'P', { locale: vi });
            const endDate = format(date.endDate, 'P', { locale: vi });
            return (
                <span>
                    Từ
                    <strong> {startDate} </strong>
                    Đến
                    <strong> {endDate} </strong>
                </span>
            );
        } else {
            return format(value || date, 'P', { locale: vi });
        }
    };

    return (
        <TippyHeadless
            trigger="click"
            placement="bottom-start"
            interactive
            appendTo={document.body}
            render={renderDatePicker}
            onShow={() => setFocus(true)}
            onHide={() => setFocus(false)}
        >
            <div className={cx('wrapper')}>
                {label && <label className={cx('label')}>{label}</label>}
                <Tippy
                    content={
                        <span className={cx('error-messgae')}>
                            <FontAwesomeIcon className={cx('error-icon')} icon={faTriangleExclamation} />
                            {message}
                        </span>
                    }
                    visible={!!message}
                    placement={placementMessage}
                    appendTo="parent"
                    theme="error"
                    offset={[0, 5]}
                >
                    <div className={cx('input', { [size]: size, focus, className })}>
                        <p>{renderResult()}</p>
                    </div>
                </Tippy>
            </div>
        </TippyHeadless>
    );
}

DatePicker.propTypes = {
    size: PropTypes.string,
    label: PropTypes.string,
    rangeSelector: PropTypes.bool,
    className: PropTypes.string,
    message: PropTypes.string,
    placementMessage: PropTypes.string,
};

export default DatePicker;
