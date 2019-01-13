
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findCurrentUser, submitLogin, submitNewRegistration, logout } from './actions';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import RecipeCards from './components/RecipeCards';
import { getToken, removeToken } from './services/tokenService'
import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9c786c',
      main: '#4d394b',
      dark: '#40241a',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#8f9bff',
      main: '#536dfe',
      dark: '#0043ca',
      contrastText: '#000000',
    },
    text: {
      primary: '#4b2c20',
      secondary: '#424242',
    }
    // error: will use the default color
  },
});

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      nickname: '',
      openLoginDialog: false,
      openSignUpDialog: false
    }
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  handleOpenLoginDialog = () => {
    this.setState({ openLoginDialog: true });
  };

  handleCloseLoginDialog = () => {
    this.setState({
      openLoginDialog: false
    });
  };

  handleOpenSignUpDialog = () => {
    this.setState({ openSignUpDialog: true });
  };

  handleCloseSignUpDialog = () => {
    this.setState({
      openSignUpDialog: false
    });
  };

  handleChange = (name) => ({ target: { value } }) => {
    this.setState({
      [name]: value
    })
  }

  handleSignUpClick = async () => {
    const { email, password, nickname } = this.state;
    try {
      await this.props.submitNewRegistration({ email, password, nickname });
      this.handleCloseSignUpDialog();
    } catch (error) {
      console.log(error)
    }
  }

  handleSubmitLoginClick = async () => {
    const { email, password } = this.state;
    try {
      await this.props.submitLogin({ email, password });
      await this.getCurrentUser();
      this.handleCloseLoginDialog();
    } catch (error) {
      console.log(error)
    }
  }

  getCurrentUser = async () => {
    // 1. Try and retrieve the user's token
    const token = getToken()
    // 2. If they have a token, make a request to /user/current for their user details
    if (token) {
      this.props.findCurrentUser(token);
    }
  };

  handleSignOutClick = async () => {
    try {
      await removeToken();
      this.setState({
        email: '',
        password: '',
        nickname: ''
      })
        ;
      await this.props.logout();
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { classes, currentUser } = this.props

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Header
            currentUser={currentUser}
            onLoginClick={this.handleOpenLoginDialog}
            onSignOutClick={this.handleSignOutClick}
            onRegisterClick={this.handleOpenSignUpDialog}
            isDialogOpen={(this.state.openLoginDialog || this.state.openSignUpDialog)}
          />
          <RecipeCards currentUser={currentUser} />
          <Footer />

          {/* Dialog for Login */}
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

          {/* Dialog for Registration */}
          <Dialog
            open={this.state.openSignUpDialog}
            onClose={this.handleCloseSignUpDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"New user - Sign Up"}</DialogTitle>
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
              <br />
              <TextField
                label="Nickname"
                value={this.state.name}
                onChange={this.handleChange('nickname')} />
              <br />
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button className={classes.button}
                onClick={this.handleSignUpClick}
              >
                Submit
              </Button>
              <Button className={classes.button}
                onClick={this.handleCloseSignUpDialog}
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </MuiThemeProvider>

    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentUser: state.userReducer.currentUser
  };
};

export default connect(mapStateToProps, { findCurrentUser, submitLogin, submitNewRegistration, logout })(withStyles(styles)(App));
