import classNames from 'classnames/bind';

import styles from './File.module.scss';

const cx = classNames.bind(styles);

function File() {
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) {
            console.log(e.dataTransfer.files);
        }
    };

    return (
        <>
            <div className={cx('dragable')} draggable></div>
            <div
                className={cx('wrapper')}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={(e) => e.preventDefault()}
                onDragEnter={(e) => e.preventDefault()}
                onDrop={handleDrag}
            ></div>
        </>
    );
}

export default File;
