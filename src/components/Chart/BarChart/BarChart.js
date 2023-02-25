import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from '../Chart.module.scss';

import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Legend, Tooltip, Colors, Title } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Legend, Tooltip, Colors, Title);

const cx = classNames.bind(styles);

function BarChart({ id, data }) {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Custom Chart Title',
                padding: {
                    top: 10,
                    bottom: 30,
                },
            },
        },
    };
    return (
        <div className={cx('wrapper')}>
            <Bar id={id} data={data} options={options} />
        </div>
    );
}

BarChart.propTypes = {
    id: PropTypes.string,
    data: PropTypes.object.isRequired,
};

export default BarChart;
