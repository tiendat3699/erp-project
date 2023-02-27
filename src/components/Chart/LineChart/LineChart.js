import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../Chart.module.scss';

import { Line } from 'react-chartjs-2';
import {
    Chart,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Legend,
    Tooltip,
    Colors,
    Title,
    Filler,
} from 'chart.js';

Chart.register(
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    PointElement,
    Legend,
    Tooltip,
    Colors,
    Title,
    Filler,
);

const cx = classNames.bind(styles);

function LineChart({ id, data, title, tooltipFormatter, legend }) {
    const defaultOption = {
        borderWidth: 2,
        borderRadius: 2,
        borderSkipped: 'start',
        cubicInterpolationMode: 'monotone',
    };

    const dataChart = {
        labels: data.labels,
        datasets: data.datasets.map((data) => ({ ...data, ...defaultOption })),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: legend,
                align: 'end',
            },
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
            <Line id={id} data={dataChart} options={options} />
        </div>
    );
}

LineChart.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object.isRequired,
    title: PropTypes.string,
    tooltipFormatter: PropTypes.func,
    legend: PropTypes.bool,
};

export default LineChart;
