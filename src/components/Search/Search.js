import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import styles from './Search.module.scss';
import React, { useState } from 'react';

const cx = classNames.bind(styles);

function Search({ placeholder, animation = true, scaleOnFocus = true, size = 'md' }) {
    const [focus, setFocus] = useState(false);

    const classes = {
        animation,
        scaleOnFocus,
        focus,
        [size]: size,
    };

    return (
        <div className={cx('wrapper', classes)}>
            <input
                type="text"
                placeholder={placeholder}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
            />
            <button>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

Search.propTypes = {
    placeholder: PropTypes.string,
    animation: PropTypes.bool,
    scaleOnFocus: PropTypes.bool,
    size: PropTypes.string,
};

export default Search;
