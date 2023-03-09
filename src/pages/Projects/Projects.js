import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { shallowEqual, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { httpRequest } from '~/utils';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import Search from '~/components/Search';
import Modal from '~/components/Modal';
import { Button, TextField, Select, DatePicker } from '~/components/Input';
import ToastComponent, { showtoast, toastType } from '~/components/Toast';

import styles from './Projects.module.scss';
import { Col, Row } from '~/components/GridSystem';
import { userService } from '~/services';
import { useForm } from '~/hooks';
import { Controller } from 'react-hook-form';
import AccountItem from '~/components/AccountItem';
import { ImageChip } from '~/components/Input/Select';

const cx = classNames.bind(styles);

const columns = [
    {
        id: 'name',
        headerName: 'Tên',
        width: 200,
    },
    {
        id: 'customerId',
        headerName: 'Khách hàng',
    },
    {
        id: 'status',
        headerName: 'Tình trạng',
    },
    {
        id: 'users',
        headerName: 'Người thực hiện',
    },
];

function Projects() {
    const [data, setData] = useState({ projects: [], users: [], customers: [] });
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const [openModal, setOpenModal] = useState(false);
    const [disabledModal, setDisabledModal] = useState(false);
    const test = useForm();
    const {
        rules,
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = test;

    const { role } = user;

    useEffect(() => {
        const fetch = async () => {
            const [projectRes, userRes] = await Promise.all([httpRequest.get('/projects/all'), userService.getAll()]);

            const users = userRes.map((user) => ({
                value: user._id,
                label: user.fullname,
                fullname: user.fullname,
                username: user.username,
                avatar_url: user.avatar_url,
                image: user.avatar_url,
            }));

            setData((prevState) => ({
                ...prevState,
                projects: projectRes.data,
                users: users,
            }));
        };
        fetch();
    }, []);

    const onSubmit = (data) => {
        const fetch = async () => {
            const toastId = showtoast.loading('Đang xử lý...');
            try {
                setDisabledModal(true);
                const res = await httpRequest.post('/projects/store', data);
                showtoast.update(toastId, res.data.message, toastType.SUCCESS);
                setData((prevState) => ({ ...prevState, projects: [...prevState.projects, res.data] }));
                setOpenModal(false);
            } catch (error) {
                showtoast.update(toastId, error.message, toastType.ERROR);
                console.log(error);
            } finally {
                setDisabledModal(false);
            }
        };

        // fetch();
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
                            onClick={() => setOpenModal(true)}
                        >
                            Thêm mới
                        </Button>
                    )}
                </div>
                <Table
                    rows={data.projects}
                    columns={columns}
                    minWidth={600}
                    pageSizeOptions={[10, 15, 20]}
                    onAddMore={role === 'Admin' ? () => setOpenModal(true) : null}
                />
            </ContentBlock>
            <Modal
                disabled={disabledModal}
                title="Thêm mới dự án"
                size="md"
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                acceptBtnText="Lưu dự án"
                onAcceptClick={handleSubmit(onSubmit)}
            >
                <div className={cx('modal')}>
                    <div className={cx('block-modal')}>
                        <Row>
                            <Col>
                                <p className={cx('title')}>Thông tin dự án</p>
                            </Col>
                            <Col md={6}>
                                <TextField
                                    register={register('name', { required: rules.required })}
                                    size="sm"
                                    label="Tên dự án"
                                    placeholder="Nhập tên"
                                    message={errors.name?.message}
                                />
                                <Controller
                                    name="customer"
                                    control={control}
                                    rules={{ required: rules.required }}
                                    render={({ field: { ref, ...restField }, fieldState }) => (
                                        <Select
                                            isMutil
                                            size="sm"
                                            label="Khách hàng"
                                            placeholder="Chọn Khách hàng"
                                            options={data.users}
                                            message={fieldState.error?.message}
                                            inputRef={ref}
                                            formatOptionLabel={(option) => <AccountItem data={option} minimal />}
                                            components={{ MultiValue: ImageChip }}
                                            {...restField}
                                        />
                                    )}
                                />
                            </Col>
                            <Col md={6}>
                                <DatePicker
                                    register={register('date')}
                                    size="sm"
                                    label="Thời gian thực hiện"
                                    rangeSelector
                                />
                                <Controller
                                    name="users"
                                    control={control}
                                    rules={{ required: rules.required }}
                                    render={({ field: { ref, ...restField }, fieldState }) => (
                                        <Select
                                            isMutil
                                            size="sm"
                                            label="Nhân viên thực hiện"
                                            placeholder="Chọn nhân viên"
                                            options={data.users}
                                            message={fieldState.error?.message}
                                            inputRef={ref}
                                            formatOptionLabel={(option) => <AccountItem data={option} minimal />}
                                            components={{ MultiValue: ImageChip }}
                                            {...restField}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal>
            <ToastComponent />
        </div>
    );
}

export default Projects;
