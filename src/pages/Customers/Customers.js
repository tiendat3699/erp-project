import classNames from 'classnames/bind';

import { useCallback, useRef, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import Search from '~/components/Search';
import Modal from '~/components/Modal';
import ToastComponent from '~/components/Toast/Toast';
import { Button, File, TextField } from '~/components/Input';
import { Col, Row } from '~/components/GridSystem';

import { useForm } from '~/hooks';

import styles from './Customers.module.scss';

const cx = classNames.bind(styles);

const tableOptions = {
    columns: [
        {
            id: 'name',
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

const rows = [
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
];

function Customers() {
    const user = useSelector((state) => state.auth.user, shallowEqual);
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

    const handleCloseModal = () => {
        reset({});
    };

    const handleCLickRow = useCallback(
        (row) => {
            reset({
                name: row.name,
                customer: row.customerId,
                users: row.users,
                status: row.status,
                date: { startDate: new Date(row.start_date), endDate: new Date(row.end_date) },
            });
            modalRef.current.open();
        },
        [reset],
    );

    const handleOpenModal = useCallback(() => {
        modalRef.current.open();
    }, []);

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Danh sách dự án</h3>
            <ContentBlock>
                <div className={cx('control')}>
                    <Search animation={false} scaleOnFocus={false} placeholder="Tìm kiếm dự án" />
                    {role === 'Admin' && (
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
                    rows={rows}
                    columns={tableOptions.columns}
                    minWidth={600}
                    pageSizeOptions={tableOptions.pageSizeOptions}
                    onAddMore={handleOpenModal}
                    onClickRow={handleCLickRow}
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
                                    register={register('name', { required: rules.required })}
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
                        <File register={register('avatar')} accept="image/jpeg, image/jpg, image/png" />
                    </div>
                </div>
            </Modal>
            <ToastComponent />
        </div>
    );
}

export default Customers;
