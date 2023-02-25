import classNames from 'classnames/bind';

import ContentBlock from '~/components/ContentBlock';
import BarChart from '~/components/Chart/BarChart';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const data = {
        labels: [1, 2, 5],
        datasets: [
            {
                label: 'Fully Rounded',
                data: [1, 10, 5],
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
            },
            {
                label: 'Small Radius',
                data: [5, 2, 15],
                borderWidth: 2,
                borderRadius: 5,
                borderSkipped: false,
            },
        ],
    };

    return (
        <div className={cx('wrapper')}>
            <ContentBlock className={cx('chart-container')}>
                <BarChart data={data} />
            </ContentBlock>
            <ContentBlock className={cx('chart-container')}>
                <BarChart data={data} />
            </ContentBlock>
            <ContentBlock className={cx('chart-container')}>
                <BarChart data={data} />
            </ContentBlock>
        </div>
    );
}

export default Home;
