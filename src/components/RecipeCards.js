import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { loadRecipes, addRecipe, removeRecipe, updateRecipe } from '../actions';
import RecipeDetails from './RecipeDetails';


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RecipeCards extends Component {
  state = {
    open: false,
    selectedRecipe: null
  };

  componentDidMount() {
    this.props.loadRecipes();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  clickRecipeHandler(recipe) {
    this.setState({
      open: true,
      selectedRecipe: recipe,
    })
    console.log('State is...');
    console.log(this.state);
  }


  showRecipes() {
    const { classes, recipes } = this.props;

    return _.map(recipes, recipe => {

      return (
        <Grid item key={recipe._id} sm={6} md={4} lg={3}>
          <Card className={classes.card}
            onClick={() => this.clickRecipeHandler(recipe)}>
            <CardMedia
              className={classes.cardMedia}
              image={recipe.imgUrl}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {recipe.title}
              </Typography>

            </CardContent>
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
  }

  render() {
    const { classes } = this.props;
    const { selectedRecipe } = this.state;
    console.log(selectedRecipe);

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
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>

                <Typography variant="h6" color="inherit" className={classes.flex}>
                  Recipe Details
              </Typography>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                {/* <Button color="inherit" onClick={this.handleClose}>
                  Close
              </Button> */}
              </Toolbar>
            </AppBar>
            <Typography gutterBottom variant="h5" component="h2">
              <RecipeDetails recipe={selectedRecipe} />
            </Typography>
          </Dialog>
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


