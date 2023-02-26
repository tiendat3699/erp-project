import classNames from 'classnames/bind';

import ContentBlock from '~/components/ContentBlock';
import BarChart from '~/components/Chart/BarChart';

import styles from './Home.module.scss';
import DataCard from '~/components/DataCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faHandshake, faUsers, faUserTie } from '@fortawesome/free-solid-svg-icons';

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
                    <BarChart data={data} horizontal />
                </ContentBlock>
            </div>
        </div>
    );
}

export default Home;
