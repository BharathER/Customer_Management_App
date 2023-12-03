import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project import
import Logo from './Logo';
import config from 'config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = ({ to }) => (
    <ButtonBase disableRipple component={Link} to={!to ? config.defaultPath : to}>
        {/* <Logo /> */}
        <h2>Management App</h2>
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string
};

export default LogoSection;
