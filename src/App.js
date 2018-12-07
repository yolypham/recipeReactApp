
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser } from './actions';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import RecipeCards from './components/RecipeCards';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';



const SAMPLE_USER = 'yolypham@email.com';

class App extends Component {
  componentDidMount() {
    this.props.loadUser(SAMPLE_USER);
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Header user={user} />
        <RecipeCards user={user} />
        <Footer />

      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, { loadUser })(App);
