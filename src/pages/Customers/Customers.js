import classNames from 'classnames/bind';

import { useCallback, useEffect, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import Search from '~/components/Search';
import Modal from '~/components/Modal';
import ToastComponent, { showtoast, toastType } from '~/components/Toast';
import { customerService } from '~/services';
import { Button, TextField } from '~/components/Input';
import { Col, Row } from '~/components/GridSystem';
import CropperImage from '~/components/CropperImage';

import { useForm } from '~/hooks';

import styles from './Customers.module.scss';

const cx = classNames.bind(styles);

const tableOptions = {
    columns: [
        {
            id: 'avatar_url',
            headerName: 'Avatar',
            image: true,
            width: 80,
        },
        {
            id: 'fullname',
            headerName: 'Tên',
            width: 200,
        },
        {
            id: 'phone',
            headerName: 'Số điện thoại',
        },
        {
            id: 'email',
            headerName: 'Email',
        },
        {
            id: 'address',
            headerName: 'Địa chỉ',
        },
    ],

    pageSizeOptions: [10, 15, 20],
};

function Customers() {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [customers, setCustomers] = useState([]);
    const [tabs, setTabs] = useState([{ title: 'Tất cả', active: true }, { title: 'Của tôi' }, { title: 'Thùng rác' }]);
    const [edit, setEdit] = useState({ id: '', index: null });
    const [defaultImage, setDefaultImage] = useState('');
    const [disabledModal, setDisabledModal] = useState(false);
    const modalRef = useRef();
    const {
        rules,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { role } = user;

    useEffect(() => {
        const fetch = async () => {
            const res = await customerService.getAll();
            setCustomers(res);
        };
        fetch();
    }, []);

    const handleCloseModal = () => {
        setDefaultImage('');
        reset({});
    };

    const handleEdit = useCallback(
        (row, index) => {
            reset({
                fullname: row.fullname,
                phone: row.phone,
                email: row.email,
                address: row.address,
            });
            setDefaultImage(row.avatar_url);
            setEdit({ id: row._id, index });
            modalRef.current.open();
        },
        [reset],
    );

    const handleClickTab = useCallback((index) => {
        setTabs((prevState) =>
            prevState.map((tab, i) => {
                tab.active = index === i;
                return tab;
            }),
        );
    }, []);

    const handleDelete = useCallback((row, index) => {
        const fetch = async () => {
            const toastId = showtoast.loading('Đang xử lý...');
            try {
                const res = await customerService.delete(row._id);
                showtoast.update(toastId, res.message, toastType.SUCCESS);
                setCustomers((prevState) => {
                    prevState.splice(index, 1);
                    return [...prevState];
                });
                modalRef.current.close();
            } catch (error) {
                showtoast.update(toastId, error.message, toastType.ERROR);
            } finally {
            }
        };

        fetch();
    }, []);

    const handleOpenModal = useCallback(() => {
        modalRef.current.open();
    }, []);

    const onSubmit = (data) => {
        const reqData = {
            fullname: data.fullname,
            phone: data.phone,
            email: data.email,
            address: data.address,
            avatar: data.avatar[0],
        };

        modalRef.current.close();

        const fetch = async () => {
            const toastId = showtoast.loading('Đang xử lý...');
            try {
                setDisabledModal(true);
                let res;
                if (edit.id) {
                    res = await customerService.update(edit.id, reqData);
                    setCustomers((prevState) => {
                        prevState[edit.index] = res.updated;
                        return [...prevState];
                    });
                    setEdit({ id: '', index: null });
                } else {
                    res = await customerService.store(reqData);
                    setCustomers((prevState) => [...prevState, res.customer]);
                }
                showtoast.update(toastId, res.message, toastType.SUCCESS);
                modalRef.current.close();
            } catch (error) {
                showtoast.update(toastId, error.message, toastType.ERROR);
            } finally {
                handleCloseModal();
                setDisabledModal(false);
            }
        };

        fetch();
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Danh sách dự án</h3>
            <ContentBlock>
                <div className={cx('control')}>
                    <Search animation={false} scaleOnFocus={false} placeholder="Tìm kiếm khách hàng" />
                    {true && (
                        <Button
                            primary
                            size="sm"
                            leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}
                            onClick={handleOpenModal}
                        >
                            Thêm mới
                        </Button>
                    )}
                </div>
                <Table
                    tabs={tabs}
                    rows={customers}
                    columns={tableOptions.columns}
                    minWidth={1000}
                    pageSizeOptions={tableOptions.pageSizeOptions}
                    btnControl={role === 'Admin'}
                    onClickEdit={handleEdit}
                    onClickDelete={handleDelete}
                    onClickTab={handleClickTab}
                    onAddMore={role === 'Admin' ? handleOpenModal : false}
                    prefixRowName="Khách hàng"
                />
            </ContentBlock>
            <Modal
                size="md"
                title="Thêm khách hàng"
                modalRef={modalRef}
                staticBackDrop
                disabled={disabledModal}
                onClose={handleCloseModal}
                onAcceptClick={handleSubmit(onSubmit)}
            >
                <div className={cx('modal')}>
                    <div className={cx('block-modal')}>
                        <Row>
                            <Col>
                                <p className={cx('title')}>Thông tin khách hàng</p>
                            </Col>
                            <Col md={6}>
                                <TextField
                                    register={register('fullname', { required: rules.required })}
                                    size="sm"
                                    label="Tên khách hàng"
                                    placeholder="Nhập tên..."
                                    message={errors.name?.message}
                                />
                                <TextField
                                    register={register('phone', { required: rules.required })}
                                    size="sm"
                                    label="Số điện thoại"
                                    placeholder="Nhập số điên thoại..."
                                    message={errors.phone?.message}
                                />
                            </Col>
                            <Col md={6}>
                                <TextField
                                    register={register('email', { required: rules.required })}
                                    size="sm"
                                    label="Email"
                                    placeholder="Nhập email..."
                                    message={errors.email?.message}
                                />
                                <TextField
                                    register={register('address', { required: rules.required })}
                                    size="sm"
                                    label="Địa chỉ"
                                    placeholder="Nhập địa chỉ..."
                                    message={errors.address?.message}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className={cx('block-modal')}>
                        <p className={cx('title')}>Chọn Avatar</p>
                        <CropperImage
                            defaultImageScr={defaultImage}
                            circularCrop
                            aspect={1}
                            widthInit={200}
                            register={register('avatar')}
                        />
                    </div>
                </div>
            </Modal>
            <ToastComponent />
        </div>
    );
}

export default Customers;
