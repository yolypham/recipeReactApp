import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadRecipes } from '../actions';


class RecipeCards extends Component {
  componentDidMount() {
    this.props.loadRecipes();
  }

  showRecipes() {
    return _.map(this.props.recipes.payload, recipe => {
      return (
        <li key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.ingredients}</p>
          <p>{recipe.instructions}</p>
          <p>{recipe.img}</p>
        </li>
      )
    })
  }

  render() {
    //console.log(this.props.recipes.payload);
    return (
      <div>
        <Link to="/recipes/new">
          Add new recipe
        </Link>

        <h3>Recipes:</h3>
        <ul>
          {this.showRecipes()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { recipes: state.recipes };
};

export default connect(mapStateToProps, { loadRecipes })(RecipeCards);

