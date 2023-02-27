import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../Chart.module.scss';

import { Pie } from 'react-chartjs-2';
import { Chart, PieController, ArcElement, Legend, Tooltip, Colors, Title } from 'chart.js';

Chart.register(PieController, ArcElement, Legend, Tooltip, Colors, Title);

const cx = classNames.bind(styles);

function PieChart({ id, data, title, tooltipFormatter, legend = true }) {
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
            legend: {
                display: legend,
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
            <Pie id={id} data={dataChart} options={options} />
        </div>
    );
}

PieChart.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object.isRequired,
    title: PropTypes.string,
    tooltipFormatter: PropTypes.func,
    legend: PropTypes.bool,
};

export default PieChart;
