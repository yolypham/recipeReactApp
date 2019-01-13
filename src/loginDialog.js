import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
        flexWrap: 'wrap',
        textAlign: 'center',
        backgroundColor: '#80cbc4',
        height: '100%'
    },
    button: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
        width: 120,
        float: 'right',
        backgroundColor: '#0c5d3a',
        color: '#ffffff',
        "&:hover": {
            backgroundColor: '#128854'
        },
        [theme.breakpoints.down('sm')]: {
            float: 'none',
            textAlign: 'center'
        },
    },
});
export default function loginDialog() {


    return (
        <Dialog
            open={this.state.openLoginDialog}
            onClose={this.handleCloseLoginDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Login"}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Email"
                    value={this.state.name}
                    onChange={this.handleChange('email')} />
                <br />
                <TextField
                    label="Password"
                    type="password"
                    value={this.state.name}
                    onChange={this.handleChange('password')}
                />
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
                <Button className={classes.button}
                    onClick={this.handleSubmitLoginClick}
                >
                    Submit
  </Button>
                <Button className={classes.button}
                    onClick={this.handleCloseLoginDialog}
                >
                    Cancel
  </Button>
            </DialogActions>
        </Dialog>
    )
}



