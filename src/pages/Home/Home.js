import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHandshake, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';

import ContentBlock from '~/components/ContentBlock';
import { BarChart, DoughnutChart, LineChart, PieChart } from '~/components/Chart';
import DataCard from '~/components/DataCard';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const data = {
        labels: [1, 2, 5],
        datasets: [
            {
                label: 'Fully Rounded',
                data: [1, 10, 5],
            },
            {
                label: 'Small Radius',
                data: [5, 2, 15],
            },
        ],
    };

    const dataPie = {
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [1, 5, 6, 7, 8],
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <DataCard icon={<FontAwesomeIcon icon={faUsers} />} title="Khách hàng" value="12" />
                <DataCard icon={<FontAwesomeIcon icon={faUserTie} />} title="Nhân viên" value="50" />
                <DataCard icon={<FontAwesomeIcon icon={faBriefcase} />} title="Dự án" value="12" />
                <DataCard icon={<FontAwesomeIcon icon={faHandshake} />} title="Đối tác" value="12" />
            </div>
            <div className={cx('container')}>
                <ContentBlock className={cx('chart-block')}>
                    <BarChart data={data} title="Chart1" />
                </ContentBlock>
                <ContentBlock className={cx('chart-block')}>
                    <BarChart data={data} title="Chart2" />
                </ContentBlock>
                <ContentBlock className={cx('chart-block')}>
                    <BarChart data={data} title="Chart3" />
                </ContentBlock>
                <ContentBlock className={cx('chart-block')}>
                    <LineChart data={data} title="line chart" />
                </ContentBlock>
                <ContentBlock className={cx('chart-block')}>
                    <PieChart data={dataPie} title="Pie chart" />
                </ContentBlock>
                <ContentBlock className={cx('chart-block')}>
                    <DoughnutChart data={dataPie} title="DoughnutChart" />
                </ContentBlock>
            </div>
        </div>
    );
}

export default Home;
