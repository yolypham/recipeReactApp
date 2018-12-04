import React, { Component } from 'react'
import PropTypes from 'prop-types';

class RecipeDetails extends Component {
    render() {
        const { recipe } = this.props;

        return (
            <div>
                <p>{recipe.title}</p>
                <p>{recipe.ingredients}</p>
                <p>{recipe.instructions}</p>
                <p>{recipe.imgUrl}</p>
            </div>
        );
    }
}

RecipeDetails.propTypes = {
    recipe: PropTypes.object
};

export default RecipeDetails;
