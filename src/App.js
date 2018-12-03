
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from './actions';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import RecipeCards from './components/RecipeCards';
import './App.css';

const SAMPLE_USER = 'yolypham@email.com';

class App extends Component {
  componentDidMount() {
    this.props.loadUser(SAMPLE_USER);
  }

  render() {
    const { user } = this.props;

    return (
      <div className="App">
        <Header user={user} />

        <BrowserRouter>
          <Switch>
            <Route path="/" component={RecipeCards} />
          </Switch>
        </BrowserRouter>

        <Footer />

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps, { loadUser })(App);
