import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import { usersService } from '~/services';

import styles from './Projects.module.scss';

const cx = classNames.bind(styles);

const columns = [
    {
        id: 'fullname',
        headerName: 'Tên',
    },
    {
        id: 'email',
        headerName: 'Email',
    },
    {
        id: 'role',
        headerName: 'Role',
        width: 100,
    },
];

function Projects() {
    const [users, setUser] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await usersService.getAll();
                const data = res.map((el) => {
                    const result = {};
                    columns.forEach((column) => {
                        const key = column.id;
                        result[key] = el[key];
                    });
                    return result;
                });
                setUser(res);
                setRows(data);
            } catch (e) {
                console.log(e);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Danh sách dự án</h3>
            <ContentBlock>
                <Table rows={rows} columns={columns} minWidth={600} />
            </ContentBlock>
        </div>
    );
}

export default Projects;
