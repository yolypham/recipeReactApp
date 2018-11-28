import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadRecipes, addRecipe, removeRecipe, updateRecipe } from '../actions';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  }

});

class RecipeCards extends Component {
  componentDidMount() {
    this.props.loadRecipes();

    //this for testing post with redux
    // let json = {
    //   title: "New record !",
    //   ingredients: "1/2 cup...",
    //   instructions: "blah...",
    //   imgUrl: "somepic.jpg"
    // };

    //this.props.addRecipe(json);
    //this.props.loadRecipes();
  }

  showRecipes() {
    const { classes, recipes } = this.props;

    return _.map(recipes, recipe => {
      return (

        <Grid item key={recipe._id} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={recipe.imgUrl} // eslint-disable-line max-len
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {recipe.title}
              </Typography>
              <Typography>
                <button onClick={() => this.modifyRecipeHandler(recipe._id)}>Update</button>
                <button onClick={() => this.removeRecipeHandler(recipe._id)}>Delete</button>
              </Typography>
            </CardContent>
            {/* <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions> */}
          </Card>
        </Grid>
      )
    })
  }

  async removeRecipeHandler(id) {
    try {
      await this.props.removeRecipe(id);
      await this.props.loadRecipes();
    } catch (error) {
      console.log(error)
    }

  }

  async modifyRecipeHandler(id) {
    // test Update
    let json = {
      title: "Updated !",
      ingredients: "1/4 cup...",
      instructions: "blah...",
      imgUrl: "somepic.jpg"
    };
    await this.props.updateRecipe(id, json);
    await this.props.loadRecipes();
  }

  render() {

    return (
      <div>
        <Link to="/recipes/new">
          Add new recipe
        </Link>
        <h3>Recipes:</h3>

        <div className="recipe-grid">
          <Grid container spacing={8}>
            {this.showRecipes()}
          </Grid>
        </div>
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

RecipeCards.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { loadRecipes, addRecipe, removeRecipe, updateRecipe }
)(withStyles(styles)(RecipeCards));


