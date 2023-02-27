import classNames from 'classnames/bind';

import style from './Table.module.scss';

const cx = classNames.bind(style);

function Table() {
    return (
        <table className={cx('wrapper')}>
            <thead>
                <tr>
                    <td>Emil</td>
                    <td>Tobias</td>
                    <td>Linus</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>User</td>
                    <td>Auto Debit</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>User</td>
                    <td>14</td>
                    <td>10</td>
                </tr>
                <tr>
                    <td>User</td>
                    <td>14</td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;
