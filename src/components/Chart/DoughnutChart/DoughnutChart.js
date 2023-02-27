import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../Chart.module.scss';

import { Doughnut } from 'react-chartjs-2';
import { Chart, DoughnutController, ArcElement, Legend, Tooltip, Colors, Title } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Legend, Tooltip, Colors, Title);

const cx = classNames.bind(styles);

function DoughnutChart({ id, data, title, tooltipFormatter }) {
    const defaultOption = {
        borderWidth: 2,
        borderRadius: 2,
        borderSkipped: 'start',
    };

    const dataChart = {
        labels: data.labels,
        datasets: data.datasets.map((data) => ({ ...data, ...defaultOption })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: !!title,
                text: title,
                padding: {
                    top: 10,
                    bottom: 10,
                },
                color: '#005295',
                font: { size: '16px' },
            },

            tooltip: {
                callbacks: {
                    label: tooltipFormatter,
                },
            },
        },
    };
    return (
        <div className={cx('wrapper')}>
            <Doughnut id={id} data={dataChart} options={options} />
        </div>
    );
}

DoughnutChart.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object.isRequired,
    title: PropTypes.string,
    tooltipFormatter: PropTypes.func,
};

export default DoughnutChart;
