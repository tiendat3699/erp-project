import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../Chart.module.scss';

import { Bar } from 'react-chartjs-2';

import { Chart, CategoryScale, LinearScale, BarController, BarElement, Legend, Tooltip, Colors, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement, Legend, Tooltip, Colors, Title);

const cx = classNames.bind(styles);

function BarChart({ id, data, title, tooltipFormatter, horizontal = false, legend = true }) {
    const defaultOption = {
        borderWidth: 2,
        borderRadius: 2,
        borderSkipped: 'start',
    };

    const dataChart = {
        labels: data.labels,
        datasets: data.datasets.map((data) => ({ ...data, ...defaultOption })),
    };

    const axis = horizontal ? 'y' : 'x';

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: axis,
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
            <Bar id={id} data={dataChart} options={options} />
        </div>
    );
}

BarChart.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object.isRequired,
    title: PropTypes.string,
    tooltipFormatter: PropTypes.func,
    Horizontal: PropTypes.bool,
    length: PropTypes.bool,
};

export default BarChart;
