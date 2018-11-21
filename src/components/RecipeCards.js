import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadRecipes, addRecipe } from '../actions';


class RecipeCards extends Component {
  componentDidMount() {
    this.props.loadRecipes();

    //this for testing post with redux
    let json = {
      title: "some recipe",
      ingredients: "1/2 cup",
      instructions: "blah",
      picture: "somepic.jpg"
    };

    this.props.addRecipe(json);
  }

  showRecipes() {
    //console.log(this.props.recipe);
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
  return {
    recipes: state.recipeReducer.recipes,
    recipe: state.recipeReducer.recipe
  };
};

export default connect(mapStateToProps, { loadRecipes, addRecipe })(RecipeCards);

