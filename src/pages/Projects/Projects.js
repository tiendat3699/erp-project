import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import { httpRequest } from '~/utils';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import Search from '~/components/Search';
import Modal from '~/components/Modal';
import { Button, TextField } from '~/components/Input';
import ToastComponent, { showtoast } from '~/components/Toast/Toast';

import styles from './Projects.module.scss';
import { Col, Row } from '~/components/GridSystem';

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
    const [projects, setProjects] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [openModal, setOpenModal] = useState(false);
    const [disabledModal, setDisabledModal] = useState(false);

    const { role } = user;

    useEffect(() => {
        const fetch = async () => {
            const res = await httpRequest.get('/projects/all');
            setProjects(res.data);
        };

        fetch();
    }, []);

    const handleSubmit = () => {
        const fetch = async () => {
            const toastId = showtoast.loading('Đang xử lý...');
            try {
                setDisabledModal(true);
                const data = {
                    name: 'dự án 1',
                    customerId: 'bab12324',
                    status: 'hoàn thành',
                    users: [1, 2, 4],
                };
                const res = await httpRequest.post('/projects/store', data);
                showtoast.update(toastId, res.data.message, 'success');
                setProjects((prevState) => [...prevState, res.data.project]);
                setOpenModal(false);
            } catch (error) {
                showtoast.update(toastId, error.message, 'error');
                console.log(error);
            } finally {
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
                    rows={projects}
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
                onAcceptClick={handleSubmit}
            >
                <div className={cx('modal')}>
                    <div className={cx('block-modal')}>
                        <Row>
                            <Col>
                                <p className={cx('title')}>Thông tin dự án</p>
                            </Col>
                            <Col md={6}>
                                <TextField size="sm" label="Tên dự án" placeholder="Nhập tên" />
                                <TextField size="sm" label="Tên dự án" placeholder="Nhập tên" />
                            </Col>
                            <Col md={6}>
                                <TextField size="sm" label="Tên dự án" placeholder="Nhập tên" />
                                <TextField size="sm" label="Tên dự án" placeholder="Nhập tên" />
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
