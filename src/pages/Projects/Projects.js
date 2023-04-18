import classNames from 'classnames/bind';
import { useCallback, useEffect, useRef, useState } from 'react';

import { shallowEqual, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import Search from '~/components/Search';
import Modal from '~/components/Modal';
import { Button, TextField, Select, DatePicker, Editor } from '~/components/Input';
import ToastComponent, { showtoast, toastType } from '~/components/Toast';

import { Col, Row } from '~/components/GridSystem';
import { userService, projectService } from '~/services';
import { useForm } from '~/hooks';
import { Controller } from 'react-hook-form';
import AccountItem from '~/components/AccountItem';
import { ImageChip } from '~/components/Input/Select';

import styles from './Projects.module.scss';

const cx = classNames.bind(styles);

const tableOptions = {
    columns: [
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
    ],

    pageSizeOptions: [10, 15, 20],
};

function Projects() {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    // const [customers, setCustomers] = useState([]);
    const modalRef = useRef();
    const [disabledModal, setDisabledModal] = useState(false);
    const {
        rules,
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm();

    const user = useSelector((state) => state.auth.user, shallowEqual);
    const { role } = user;

    useEffect(() => {
        const fetch = async () => {
            const [projectRes, userRes] = await Promise.all([projectService.getAll(), userService.getAll()]);

            const users = userRes.map((user) => ({
                value: user._id,
                label: user.fullname,
                fullname: user.fullname,
                username: user.username,
                avatar_url: user.avatar_url,
                image: user.avatar_url,
            }));

            setUsers(users);
            setProjects(projectRes);
        };
        fetch();
    }, []);

    const onSubmit = (data) => {
        const reqData = {
            name: data.name,
            customerId: data.customer,
            description: data.description,
            start_date: data.date.startDate,
            end_date: data.date.endDate,
            status: data.status,
            users: data.users,
        };

        modalRef.current.close();

        const fetch = async () => {
            const toastId = showtoast.loading('Đang xử lý...');
            try {
                setDisabledModal(true);
                const res = await projectService.store(reqData);
                showtoast.update(toastId, res.message, toastType.SUCCESS);
                setProjects((prevState) => [...prevState, res.project]);
                modalRef.current.close();
            } catch (error) {
                showtoast.update(toastId, error.message, toastType.ERROR);
            } finally {
                reset({});
                setDisabledModal(false);
            }
        };

        fetch();
    };

    const handleCLickRow = useCallback(
        (row) => {
            reset({
                name: row.name,
                customer: row.customerId,
                users: row.users,
                status: row.status,
                date: { startDate: new Date(row.start_date), endDate: new Date(row.end_date) },
                description: row.description,
            });
            modalRef.current.open();
        },
        [reset],
    );

    const handleOpenModal = useCallback(() => {
        modalRef.current.open();
    }, []);

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
                    rows={projects}
                    columns={tableOptions.columns}
                    minWidth={600}
                    pageSizeOptions={tableOptions.pageSizeOptions}
                    onAddMore={role === 'Admin' ? handleOpenModal : false}
                    btnControl={role === 'Admin'}
                    onClickEdit={handleCLickRow}
                />
            </ContentBlock>
            <Modal
                size="md"
                title="Thêm dự án"
                modalRef={modalRef}
                staticBackDrop
                disabled={disabledModal}
                onClose={() => reset({})}
                onAcceptClick={handleSubmit(onSubmit)}
            >
                <div className={cx('modal')}>
                    <div className={cx('block-modal')}>
                        <Row>
                            <Col>
                                <p className={cx('title')}>Thông tin dự án</p>
                                <TextField
                                    register={register('name', { required: rules.required })}
                                    size="sm"
                                    label="Tên dự án"
                                    placeholder="Nhập tên..."
                                    message={errors.name?.message}
                                />
                            </Col>
                            <Col md={6}>
                                <Controller
                                    name="customer"
                                    control={control}
                                    rules={{ required: rules.required }}
                                    render={({ field: { ref, ...restField }, fieldState }) => (
                                        <Select
                                            size="sm"
                                            label="Khách hàng"
                                            placeholder="Chọn Khách hàng"
                                            options={users}
                                            message={fieldState.error?.message}
                                            inputRef={ref}
                                            formatOptionLabel={(option) => <AccountItem data={option} minimal />}
                                            {...restField}
                                        />
                                    )}
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
                                            options={users}
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
                                <Controller
                                    name="status"
                                    control={control}
                                    render={({ field: { ref, ...restField }, fieldState }) => (
                                        <Select
                                            size="sm"
                                            label="Trạng thái"
                                            placeholder="Chọn trạng thái"
                                            options={[
                                                { value: 'Progressing', label: 'Progressing' },
                                                { value: 'Done', label: 'Done' },
                                                { value: 'Cancel', label: 'Cancel' },
                                            ]}
                                            message={fieldState.error?.message}
                                            inputRef={ref}
                                            defaultValue={{ value: 'Progressing', label: 'Progressing' }}
                                            {...restField}
                                        />
                                    )}
                                />
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field: { ref, ...restField } }) => (
                                        <DatePicker
                                            size="sm"
                                            label="Thời gian thực hiện"
                                            rangeSelector
                                            inputRef={ref}
                                            {...restField}
                                        />
                                    )}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className={cx('block-modal')}>
                        <p className={cx('title')}>Mô tả</p>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field: { ref, ...restField } }) => (
                                <Editor placeholder="Thêm mô tả..." {...restField} />
                            )}
                        />
                    </div>
                </div>
            </Modal>
            <ToastComponent />
        </div>
    );
}

export default Projects;
