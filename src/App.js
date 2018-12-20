
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser } from './actions';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import RecipeCards from './components/RecipeCards';
import './App.css';

import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


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

const SAMPLE_USER = 'yolypham@email.com';

class App extends Component {
  componentDidMount() {
    this.props.loadUser(SAMPLE_USER);
  }

  render() {
    const { user } = this.props;

    return (

      <MuiThemeProvider theme={theme}>
        <div>
          <Header user={user} />
          <RecipeCards user={user} />
          <Footer />
        </div>
      </MuiThemeProvider>

    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, { loadUser })(App);
