import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import { httpRequest } from '~/utils';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import { Button } from '~/components/Input';
import Search from '~/components/Search';

import styles from './Projects.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

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
            try {
                const data = {
                    name: 'dự án 1',
                    customerId: 'bab12324',
                    status: 'hoàn thành',
                    users: [1, 2, 4],
                };
                const res = await httpRequest.post('/projects/store', data);
                setProjects((prevState) => [...prevState, res.data]);
            } catch (error) {
                console.log(error);
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
                            onClick={handleSubmit}
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
                    onAddMore={role === 'Admin' ? handleSubmit : null}
                />
            </ContentBlock>
        </div>
    );
}

export default Projects;
