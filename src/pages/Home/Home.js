import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHandshake, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';

import ContentBlock from '~/components/ContentBlock';
import DataCard from '~/components/DataCard';
import Table from '~/components/Table';
import { BarChart, DoughnutChart, LineChart, PieChart } from '~/components/Chart';
import { Row, Col } from '~/components/GridSystem';
import { usersService } from '~/services';

import styles from './Home.module.scss';

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

const data = {
    labels: ['tháng 1', 'tháng 2', 'tháng 3'],
    datasets: [
        {
            label: 'Fully Rounded',
            data: [1, 10, 5],
            fill: true,
        },
        {
            label: 'Small Radius',
            data: [5, 2, 15],
            fill: true,
        },
    ],
};

const dataLine = {
    labels: ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6'],
    datasets: [
        {
            label: 'Fully Rounded',
            data: [1, 10, 5, 1, 5, 16],
            fill: true,
        },
        {
            label: 'Small Radius',
            data: [5, 2, 15, 5, 6, 1],
            fill: true,
        },
    ],
};

const dataDoughnut = {
    labels: ['Mục 1', 'Mục 2'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [10, 5],
        },
        {
            label: 'Dataset 2',
            data: [4, 10],
        },
    ],
};

const dataPie = {
    labels: ['Mục 1', 'Mục 2', 'Mục 3'],
    datasets: [
        {
            label: 'Dataset 1',
            data: [10, 5, 6],
        },
    ],
};

function Home() {
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
            <Row space={2} className={cx('section')}>
                <Col md={6} xl={3}>
                    <DataCard icon={<FontAwesomeIcon icon={faUsers} />} title="Khách hàng" value="12" />
                </Col>
                <Col md={6} xl={3}>
                    <DataCard icon={<FontAwesomeIcon icon={faUserTie} />} title="Nhân viên" value={users.length} />
                </Col>
                <Col md={6} xl={3}>
                    <DataCard icon={<FontAwesomeIcon icon={faBriefcase} />} title="Dự án" value="12" />
                </Col>
                <Col md={6} xl={3}>
                    <DataCard icon={<FontAwesomeIcon icon={faHandshake} />} title="Đối tác" value="12" />
                </Col>
            </Row>
            <Row space={2} className={cx('section')}>
                <Col xl={8}>
                    <ContentBlock className={cx('chart-block')}>
                        <BarChart data={data} title="BarChart 1" />
                    </ContentBlock>
                </Col>
                <Col xl={4}>
                    <ContentBlock className={cx('chart-block', 'sm')}>
                        <BarChart data={data} title="BarChart 2" horizontal legend={false} />
                    </ContentBlock>
                    <ContentBlock className={cx('chart-block', 'sm')}>
                        <BarChart data={data} title="BarChart 3" horizontal legend={false} />
                    </ContentBlock>
                </Col>
            </Row>
            <Row space={2} className={cx('section')}>
                <Col xl={8}>
                    <ContentBlock className={cx('chart-block')}>
                        <LineChart data={dataLine} title="LineChart" />
                    </ContentBlock>
                </Col>
                <Col xl={4}>
                    <ContentBlock className={cx('chart-block')}>
                        <PieChart data={dataPie} title="PieChart" />
                    </ContentBlock>
                </Col>
            </Row>
            <Row space={2} className={cx('section')}>
                <Col xl={8}>
                    <ContentBlock className={cx('table-block')}>
                        <Table title="Bảng" rows={rows} columns={columns} />
                    </ContentBlock>
                </Col>
                <Col xl={4}>
                    <ContentBlock className={cx('chart-block')}>
                        <DoughnutChart data={dataDoughnut} title="DoughnutChart" />
                    </ContentBlock>
                </Col>
            </Row>
        </div>
    );
}

export default Home;
