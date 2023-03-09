import classNames from 'classnames/bind';

import { shallowEqual, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import ContentBlock from '~/components/ContentBlock';
import Table from '~/components/Table';
import Search from '~/components/Search';
import { Button } from '~/components/Input';

import styles from './Customers.module.scss';

const cx = classNames.bind(styles);

const columns = [
    {
        id: 'name',
        headerName: 'Tên',
        width: 200,
    },
    {
        id: 'phone',
        headerName: 'Số điện thoại',
    },
    {
        id: 'email',
        headerName: 'Email',
    },
    {
        id: 'address',
        headerName: 'Địa chỉ',
    },
];

const rows = [
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
    {
        name: 'ok',
        phone: 123124,
        email: 'mail@gmail.com',
        address: 'da nang',
    },
];

function Customers() {
    const user = useSelector((state) => state.auth.user, shallowEqual);
    const { role } = user;

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Danh sách dự án</h3>
            <ContentBlock>
                <div className={cx('control')}>
                    <Search animation={false} scaleOnFocus={false} placeholder="Tìm kiếm dự án" />
                    {role === 'Admin' && (
                        <Button primary size="sm" leftIcon={<FontAwesomeIcon icon={faPlusCircle} />}>
                            Thêm mới
                        </Button>
                    )}
                </div>
                <Table rows={rows} columns={columns} minWidth={600} pageSizeOptions={[10, 15, 20]} />
            </ContentBlock>
        </div>
    );
}

export default Customers;
