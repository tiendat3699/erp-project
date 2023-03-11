import classNames from 'classnames/bind';

import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './File.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

function File({ multiple, accept }) {
    const [drag, setDrag] = useState(false);

    const handleDrag = (e) => {
        if (e.type === 'dragenter') {
            setDrag(true);
        }

        if (e.type === 'dragleave') {
            setDrag(false);
        }
    };

    return (
        <div className={cx('wrapper', { drag })}>
            <input
                type="file"
                className={cx('input')}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDragEnter={handleDrag}
                multiple={multiple}
                accept={accept}
            />
            <div className={cx('inner')}>
                <div className={cx('icon')}>
                    <FontAwesomeIcon icon={faDownload} />
                    <span className={cx('text')}>Chọn file hoặc kéo vào đây</span>
                </div>
            </div>
        </div>
    );
}

export default File;
