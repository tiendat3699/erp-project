import PropTypes from 'prop-types';
import { usePageTitle } from '~/hooks';

function Page({ children, title = 'Erp Project' }) {
    usePageTitle(title);
    return children;
}

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

export default Page;
