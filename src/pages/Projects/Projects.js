import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import { usersService } from '~/services';

import styles from './Projects.module.scss';

const cx = classNames.bind(styles);

const columns = [
    {
        id: 'name',
        headerName: 'Tên',
        width: 200,
    },
    {
        id: 'customer',
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

const rows = [
    {
        name: 'Dự án Erp',
        customer: 'Tiến Đạt Group',
        status: 'Đang xử lý',
        users: 'Tiến Đạt',
    },
    {
        name: 'Dự án Erp',
        customer: 'Tiến Đạt Group',
        status: 'Đang xử lý',
        users: 'Tiến Đạt',
    },
    {
        name: 'Dự án Erp',
        customer: 'Tiến Đạt Group',
        status: 'Đang xử lý',
        users: 'Tiến Đạt',
    },
];

function Projects() {
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
