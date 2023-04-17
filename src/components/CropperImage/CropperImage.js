import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import Modal from '../Modal/Modal';

import 'react-image-crop/dist/ReactCrop.css';

import style from './CropperImage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { Button } from '../Input';

const cx = classNames.bind(style);

CropperImage.propTypes = {
    aspect: PropTypes.number,
    locked: PropTypes.bool,
    circularCrop: PropTypes.bool,
    widthInit: PropTypes.number,
};

function CropperImage({ aspect, locked, circularCrop, widthInit = 100 }) {
    const [crop, setCrop] = useState({});
    const [image, setImage] = useState({});
    const [completedCrop, setCompletedCrop] = useState();
    const inputRef = useRef(null);
    const imgRef = useRef(null);
    const canvasRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        //clear preview image
        return () => {
            URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    const canvasPreview = (image, canvas, crop) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error('No 2d context');
        }

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const pixelRatio = window.devicePixelRatio;
        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = 'high';

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        const centerX = image.naturalWidth / 2;
        const centerY = image.naturalHeight / 2;

        ctx.save();

        ctx.translate(-cropX, -cropY);
        ctx.translate(centerX, centerY);
        ctx.translate(-centerX, -centerY);
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
        );

        ctx.restore();
    };

    const onSelectFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            file.preview = URL.createObjectURL(e.target.files[0]);
            setImage(file);
            modalRef.current.open();
        } else {
            setImage((prevState) => ({ ...prevState, preview: '' }));
        }
    };

    const handleCropImage = () => {
        const cropData = completedCrop || crop;
        canvasPreview(imgRef.current, canvasRef.current, cropData);
        modalRef.current.close();
    };

    const handleStoreCropedImage = () => {
        canvasRef.current.toBlob((blob) => {
            const file = new File(
                [blob],
                'cropped-image',
                { type: 'image/jpeg', lastModified: new Date().getTime() },
                'utf-8',
            );
            const container = new DataTransfer();
            container.items.add(file);
            inputRef.current.files = container.files;
            setImage((preState) => ({
                ...preState,
                completedCrop: { with: completedCrop.width, height: completedCrop.height },
            }));
        }, 'image/jpeg');
    };

    const onImageLoad = (e) => {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(
                centerCrop(
                    makeAspectCrop(
                        {
                            unit: 'px',
                            width: widthInit,
                        },
                        aspect,
                        width,
                        height,
                    ),
                    width,
                    height,
                ),
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('preview')}>
                <canvas
                    ref={canvasRef}
                    style={{
                        display: !!!image.completedCrop && 'none',
                        width: image.completedCrop?.width,
                        height: image.completedCrop?.height,
                    }}
                />
                {!!!image.completedCrop && (
                    <div className={cx('holder')}>
                        <FontAwesomeIcon icon={faImage} className={cx('icon')} />
                    </div>
                )}
            </div>
            <Button size="sm" primary onClick={(e) => inputRef.current.click()}>
                Tải ảnh lên
            </Button>
            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg, image/jpg, image/png"
                onChange={onSelectFile}
                onClick={(e) => (e.target.value = null)}
            />
            <Modal
                size="md"
                modalRef={modalRef}
                title="Cắt ảnh"
                acceptBtnText="Cắt"
                onAcceptClick={handleCropImage}
                onClose={handleStoreCropedImage}
            >
                <div className={cx('cropper')}>
                    <ReactCrop
                        circularCrop={circularCrop}
                        locked={locked}
                        crop={crop}
                        ruleOfThirds
                        minHeight={50}
                        minWidth={50}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                    >
                        <img ref={imgRef} alt="Cropped" src={image.preview} onLoad={onImageLoad} />
                    </ReactCrop>
                </div>
            </Modal>
        </div>
    );
}

export default CropperImage;
