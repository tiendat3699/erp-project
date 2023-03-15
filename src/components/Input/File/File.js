import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faFileExcel, faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons';
import { faFile, faFileAudio, faFileImage, faFileVideo, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import styles from './File.module.scss';
import { useRef, useState } from 'react';
import { formatFileSize } from '~/utils';

const cx = classNames.bind(styles);

File.propTypes = {
    multiple: PropTypes.bool,
    accept: PropTypes.string,
    className: PropTypes.string,
    register: PropTypes.object,
};

function File({ multiple, accept, className, register = {} }) {
    const [drag, setDrag] = useState(false);
    const [files, setFiles] = useState([]);
    const inputRef = useRef();

    const { ref, onChange, ...restRegister } = register;

    const HandleUpFile = (e) => {
        const fileList = e.target.files;
        const accepts = accept?.split(',');
        const newFiles = [...fileList].filter((file) => {
            if (!accept) return true;
            let valid;
            for (accept of accepts) {
                valid = file.type.match(accept.trim());
                if (valid) {
                    break;
                }
            }
            return valid;
        });
        onChange(e);
        setFiles(newFiles);
    };

    const HandleRemoveFile = (file) => {
        const container = new DataTransfer();
        const indexRemove = files.indexOf(file);
        files.forEach((el) => container.items.add(el));
        container.items.remove(indexRemove);
        inputRef.current.files = container.files;
        inputRef.current.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const RenderListFile = () => {
        return files.map((file, index) => {
            let icon = faFile;
            if (file.type.match('image.*')) {
                icon = faFileImage;
            }

            if (file.type.match('video.*')) {
                icon = faFileVideo;
            }

            if (file.type.match('audio.*')) {
                icon = faFileAudio;
            }

            if (file.type.match('/pdf')) {
                icon = faFilePdf;
            }

            if (file.type.match('document')) {
                icon = faFileWord;
            }

            if (file.type.match('sheet')) {
                icon = faFileExcel;
            }

            return (
                <li className={cx('file-card')} key={index}>
                    <FontAwesomeIcon className={cx('icon')} icon={icon} />
                    <div className={cx('info')}>
                        <p className={cx('file-name')}>{file.name}</p>
                        <p className={cx('file-size')}>{formatFileSize(file.size)}</p>
                    </div>
                    <button className={cx('remove-btn')} onClick={() => HandleRemoveFile(file)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </li>
            );
        });
    };

    return (
        <>
            <div className={cx('wrapper', className)}>
                <div className={cx('drag-box', { drag })}>
                    <input
                        type="file"
                        className={cx('input')}
                        onDragLeave={() => setDrag(false)}
                        onDragEnter={() => setDrag(true)}
                        onDrop={() => setDrag(false)}
                        onChange={HandleUpFile}
                        multiple={multiple}
                        accept={accept}
                        ref={(e) => {
                            inputRef.current = e;
                            ref(e);
                        }}
                        {...restRegister}
                    />
                    <div className={cx('inner')}>
                        <div className={cx('icon')}>
                            <FontAwesomeIcon icon={faDownload} />
                            <span className={cx('text')}>Chọn file hoặc kéo vào đây</span>
                        </div>
                    </div>
                </div>
                {files.length > 0 && (
                    <>
                        <p className={cx('head-text')}>Sẵn sàng tải lên</p>
                        <ul className={cx('list-file')}>{RenderListFile()}</ul>
                    </>
                )}
            </div>
        </>
    );
}

export default File;
