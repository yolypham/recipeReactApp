import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Facebook from 'material-ui-next-community-icons/icons/facebook-box';
import Instagram from 'material-ui-next-community-icons/icons/instagram';
import Twitter from 'material-ui-next-community-icons/icons/twitter';
import Google from 'material-ui-next-community-icons/icons/google';



const styles = theme => ({
    footer: {
        marginTop: theme.spacing.unit * 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: `${theme.spacing.unit * 6}px 0`,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    }
});

const footers = [
    {
        title: 'EAT KETO Inc.',
        description: ['123 Main St', 'Toronto ON L2E 2G5', '(t) 302-123-4567', '(e) eatketo@email.com'],
    },
    {
        title: '',
        description: [],
    },
    {
        title: 'Resources',
        description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

class Footer extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <footer className={classNames(classes.footer, classes.layout)}>
                <Grid container spacing={32} justify="space-evenly">
                    <Grid item md >
                        <Typography variant="h6" color="textPrimary" gutterBottom>
                            EAT KETO Inc.
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            123 Main St<br />
                            Toronto ON L2E 2G5<br />
                            (t) 302-123-4567<br />
                            (e) eatketo@email.com
                        </Typography>
                    </Grid>

                    <Grid item md>
                        <p className="foot-link">Blog</p>
                        <p className="foot-link">Articles</p>
                        <p className="foot-link">Videos</p>
                    </Grid>

                    <Grid item md>
                        <div style={{ float: 'right' }}>
                            <ul className="social-icons">
                                <li><Facebook style={{ color: '#3b5999' }} /></li>
                                <li><Instagram style={{ color: '#e4405f' }} /></li>
                                <li><Twitter style={{ color: '#55acee' }} /></li>                            <li><Google style={{ color: '#dd4b39' }} /></li>
                            </ul>
                        </div>

                    </Grid>
                </Grid>

                <div><br /></div>

                <Grid container justify="space-evenly">
                    <Grid item xl>
                        <Typography
                            variant="caption"
                            color="textSecondary"
                            align="center">
                            Copyright &copy; 2018 by Yoly Pham. All rights reserved.
                        </Typography>
                    </Grid>
                </Grid>
            </footer>
        )
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.array
};

export default withStyles(styles)(Footer)