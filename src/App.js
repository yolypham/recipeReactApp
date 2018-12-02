
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import RecipeCards from './components/RecipeCards';
import './App.css';

class App extends Component {
  componentDidMount() {
    //
  }

  render() {
    return (
      <div className="App">
        <Header />

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

export default App;
