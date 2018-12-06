import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadRecipes, addRecipe, removeRecipe as deleteRecipe, updateRecipe } from '../actions';
import RecipeDetails from './RecipeDetails';


import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    width: 200
  },
  formControl: {
    width: 800
    //margin: theme.spacing.unit * 5,
    //minWidth: 300
  },

});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class RecipeCards extends Component {
  state = {
    openDetailDialog: false,
    openAddDialog: false,
    openEditDialog: false,
    selectedRecipe: null,
    // form: {
    //   title: null,
    //   ingredients: null,
    //   instructions: null,
    //   imgUrl: null,
    //   user: null
    // },

  };

  componentDidMount() {
    this.props.loadRecipes();
  }

  // componentWillUpdate(prevProps, prevState) {
  //   if (prevProps.recipes.length !== this.props.recipes.length) {
  //     console.log(this.props.recipes);
  //   }
  // }

  handleOpenDetailDialog = () => {
    this.setState({ openDetailDialog: true });
  };

  handleCloseDetailDialog = () => {
    this.setState({ openDetailDialog: false });
  };

  handleOpenAddDialog = () => {
    this.setState({ openAddDialog: true });
  };

  handleCloseAddDialog = () => {
    this.setState({ openAddDialog: false });
  };

  handleOpenEditDialog = () => {
    this.setState({ openEditDialog: true });
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };

  clickRecipeHandler(recipe) {
    this.setState({
      openDetailDialog: true,
      selectedRecipe: recipe,
    })
  }

  clickDeleteHandler = async (recipe) => {
    const { _id } = recipe
    try {
      await this.props.deleteRecipe(_id);
      await this.props.loadRecipes();
    } catch (error) {
      console.log(error)
    }
  }

  clickAddRecipeHandler = () => {
    this.setState({
      openAddDialog: true
    })
  }

  clickEditHandler = (recipe) => {
    // const form = {
    //   title: recipe.title,
    //   ingredients: recipe.ingredients,
    //   instructions: recipe.instructions,
    //   imgUrl: recipe.imgUrl
    // }
    this.setState({
      openEditDialog: true,
      selectedRecipe: recipe
    })
  }

  handleChange = (name) => ({ target: { value } }) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: value
      }
    })
  }

  handleEditChange = name => event => {
    let recipe = this.state.selectedRecipe;
    recipe[name] = event.target.value;
    this.setState({
      selectedRecipe: recipe,
    });
  };

  handleSubmit = async () => {
    const { user } = this.props;
    const newRecipe = this.state.form;
    newRecipe.user = user[0]._id;

    await this.props.addRecipe(newRecipe);
    await this.handleCloseAddDialog();
    await this.props.loadRecipes();
  }

  handleSave = async () => {
    console.log('save clicked');
    let id = this.state.selectedRecipe._id;
    let { selectedRecipe } = this.state;
    await this.props.updateRecipe(id, selectedRecipe);
    await this.handleCloseEditDialog();
    await this.props.loadRecipes();
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
    const { classes, recipes } = this.props;
    const { selectedRecipe } = this.state;

    const rec = (selectedRecipe ? true : false)
    console.log(selectedRecipe)

    const showRecipes = recipes.map(recipe => {
      return (
        <Grid item key={recipe._id} sm={6} md={4} lg={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={recipe.imgUrl}
              title={recipe.title}
              onClick={() => this.clickRecipeHandler(recipe)}
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {recipe.title}
              </Typography>
              <EditIcon
                onClick={() => this.clickEditHandler(recipe)} />
              <DeleteIcon
                onClick={() => this.clickDeleteHandler(recipe)} />
            </CardContent>
          </Card>
        </Grid>
      )
    })

    return (
      <div>
        <button onClick={this.clickAddRecipeHandler}>Add Recipe</button>
        <h3>Recipes:</h3>
        <div className="recipe-grid">
          <Grid container spacing={8}>
            {showRecipes}
          </Grid>

          {/* Dialog for Details */}
          <Dialog
            fullScreen
            open={this.state.openDetailDialog}
            onClose={this.handleCloseDetailDialog}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>

                <Typography variant="h6" color="inherit" className={classes.flex}>
                  Recipe Details
              </Typography>
                <IconButton color="inherit" onClick={this.handleCloseDetailDialog} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Typography gutterBottom variant="h5" component="h2">
              <RecipeDetails recipe={selectedRecipe} />
            </Typography>
          </Dialog>

          {/* Dialog for Add Recipe */}
          <Dialog
            fullScreen
            open={this.state.openAddDialog}
            onClose={this.handleCloseAddDialog}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>

                <Typography variant="h6" color="inherit" className={classes.flex}>
                  Add New Recipe
              </Typography>
                <IconButton color="inherit" onClick={this.handleCloseAddDialog} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <form className={classes.container} noValidate autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="ingredients"
                  label="Ingredients"
                  placeholder="Placeholder"
                  multiline
                  rows="4"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('ingredients')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="instructions"
                  label="Instructions"
                  placeholder="Placeholder"
                  multiline
                  rows="10"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('instructions')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="Image"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('imgUrl')}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSubmit}
                  className={classes.button}
                >
                  Save
                </Button>
              </FormControl>
            </form>
          </Dialog>

          {/* Dialog for Update Recipe */}
          <Dialog
            fullScreen
            open={this.state.openEditDialog}
            onClose={this.handleCloseEditDialog}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar}>
              <Toolbar>

                <Typography variant="h6" color="inherit" className={classes.flex}>
                  Edit Recipe
              </Typography>
                <IconButton color="inherit" onClick={this.handleCloseEditDialog} aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <form className={classes.container} noValidate autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  value={rec ? selectedRecipe.title : ''}
                  onChange={this.handleEditChange('title')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="ingredients"
                  label="Ingredients"
                  placeholder="Placeholder"
                  multiline
                  rows="4"
                  className={classes.textField}
                  value={rec ? selectedRecipe.ingredients : ''}
                  onChange={this.handleEditChange('ingredients')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="instructions"
                  label="Instructions"
                  placeholder="Placeholder"
                  multiline
                  rows="10"
                  className={classes.textField}
                  value={rec ? selectedRecipe.instructions : ''}
                  onChange={this.handleEditChange('instructions')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="Image"
                  className={classes.textField}
                  value={rec ? selectedRecipe.imgUrl : ''}
                  onChange={this.handleEditChange('imgUrl')}
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleSave}
                  className={classes.button}
                >
                  Save
                </Button>
              </FormControl>
            </form>
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
  user: PropTypes.array
};

export default connect(
  mapStateToProps,
  { loadRecipes, addRecipe, deleteRecipe, updateRecipe }
)(withStyles(styles)(RecipeCards));


