import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import eatketoLogo2 from '../../assets/images/keto-eat2.png';

const styles = theme => ({
    root: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
});

class Header extends React.Component {

    state = {
        anchorEl: null,
        mobileMoreAnchorEl: null
    };

    handleProfileMenuOpen = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuClose = () => {
        this.setState({ anchorEl: null });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    render() {
        const { anchorEl, mobileMoreAnchorEl } = this.state;
        const { classes, currentUser, isDialogOpen, onLoginClick, onSignOutClick, onRegisterClick } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

        if (isMenuOpen || isMobileMenuOpen) {
            if (isDialogOpen) {
                this.handleMenuClose()
                this.handleMobileMenuClose()
            }
        }

        const userString = (currentUser && currentUser !== null && currentUser.nickname ? `Welcome ${currentUser.nickname}` : null);

        const renderLoggedInMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={onSignOutClick}><div style={{ width: "200px" }}>Sign Out</div></MenuItem>
            </Menu>
        );

        const renderNotLoggedInMenu = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={onLoginClick}>
                    <b>Login</b>&nbsp;-&nbsp;to add and edit Recipes </MenuItem>
                <MenuItem onClick={onRegisterClick}><b>Not Register?</b>&nbsp;Sign Up</MenuItem>
            </Menu>
        );

        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose} >
                <MenuItem onClick={onLoginClick}>
                    <b>Login</b>&nbsp;-&nbsp;to add and edit Recipes </MenuItem>
                <MenuItem onClick={onRegisterClick}><b>Not Register?</b>&nbsp;Sign Up</MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                        <img src={eatketoLogo2} alt="eat keto logo" className="logo" />

                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <div className="welcome">{userString}</div>
                            <IconButton
                                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenuOpen}
                                color="inherit" >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <div className="welcome">{userString}</div>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                {userString ? renderLoggedInMenu : renderNotLoggedInMenu}
                {renderMobileMenu}
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.object,
    onLoginClick: PropTypes.func,
    onSignOutClick: PropTypes.func,
    onRegisterClick: PropTypes.func
};

export default withStyles(styles)(Header);
