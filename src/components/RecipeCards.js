import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadRecipes, addRecipe, removeRecipe as deleteRecipe, updateRecipe } from '../actions';
import RecipeDetails from './RecipeDetails';
import ImgDrop from './ImgDrop';

import { storage } from '../firebase'


import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Input } from '@material-ui/core';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  fab: {
    margin: theme.spacing.unit,
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0 0 0`,
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
    //display: 'flex',
    flexWrap: 'wrap',
    textAlign: 'center'
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
    width: 900
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
    imgFile: null,
    url: ''
  };

  componentDidMount() {
    this.props.loadRecipes();
  }

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

  handleSubmit = (e) => {
    //disable auto submit form
    e.preventDefault();

    console.log(this.state);

    const { user } = this.props;
    const newRecipe = this.state.form;

    //set the loged user
    newRecipe.user = user[0]._id;

    //this.handleUpload();

    const { imgFile } = this.state;
    const uploadTask = storage.ref(`images/${imgFile.name}`).put(imgFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        // on Progress...
      },
      (error) => {
        console.log(error);
      },
      // Upload complete ....
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log('File available at', downloadURL);

        let newRecipe = this.state.form;
        newRecipe.imgUrl = downloadURL;
        await this.props.addRecipe(newRecipe);
        await this.handleCloseAddDialog();
        await this.props.loadRecipes();
      });
  }

  handleSave = async (e) => {
    //disable auto submit form
    e.preventDefault();
    let id = this.state.selectedRecipe._id;
    let { selectedRecipe } = this.state;
    await this.props.updateRecipe(id, selectedRecipe);
    await this.handleCloseEditDialog();
    await this.props.loadRecipes();
  }

  handleUpload = () => {
    console.log(this.state);
    const { imgFile } = this.state;
    const uploadTask = storage.ref(`images/${imgFile.name}`).put(imgFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        // on Progress...
      },
      (error) => {
        console.log(error);
      },
      // Upload complete ....
      async () => {
        const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
        console.log('File available at', downloadURL);

        let newRecipe = this.state.form;
        newRecipe.imgUrl = downloadURL;
        await this.props.addRecipe(newRecipe);
        await this.handleCloseAddDialog();
        await this.props.loadRecipes();
      });
  }

  imageUpdate = (imgFileName) => {
    this.setState({ imgFile: imgFileName })
  }

  render() {
    const { classes, recipes } = this.props;
    const { selectedRecipe } = this.state;

    const hasValue = (selectedRecipe ? true : false)

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
              <Typography
                gutterBottom
                variant="h6">
                {recipe.title}
              </Typography>

              <div className="action-icons">
                <Fab
                  style={{ backgroundColor: 'green', color: 'white' }}
                  color="secondary"
                  aria-label="Edit"
                  size="small"
                  className={classes.fab}>
                  <EditIcon onClick={() => this.clickEditHandler(recipe)} />
                </Fab>
                <Fab
                  aria-label="Delete"
                  size="small"
                  className={classes.fab}>
                  <DeleteIcon onClick={() => this.clickDeleteHandler(recipe)} />
                </Fab>
              </div>
            </CardContent>
          </Card>
        </Grid>
      )
    })

    return (
      <main>
        <div className={classNames(classes.layout, classes.cardGrid)}>
          <div className="add-icon">
            Add Recipe
            <Fab
              color="primary"
              aria-label="Add"
              size="small"
              className={classes.fab}>
              <AddIcon onClick={this.clickAddRecipeHandler} />
            </Fab>
          </div>

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
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.flex}>
                  Recipe Details
              </Typography>
                <IconButton
                  color="inherit"
                  onClick={this.handleCloseDetailDialog}
                  aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Typography
              gutterBottom
              variant="h5"
              component="h2">
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
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.flex}>
                  Add New Recipe
              </Typography>
                <IconButton
                  color="inherit"
                  onClick={this.handleCloseAddDialog}
                  aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <div className={classes.layout}>
              <form
                className={classes.container}
                noValidate
                autoComplete="off" >
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

                  <ImgDrop imageUpdate={this.imageUpdate} />

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
            </div>
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

                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.flex}>
                  Edit Recipe
              </Typography>
                <IconButton
                  color="inherit"
                  onClick={this.handleCloseEditDialog}
                  aria-label="Close">
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <form
              className={classes.container}
              noValidate
              autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  id="title"
                  label="Title"
                  className={classes.textField}
                  value={hasValue ? selectedRecipe.title : ''}
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
                  value={hasValue ? selectedRecipe.ingredients : ''}
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
                  value={hasValue ? selectedRecipe.instructions : ''}
                  onChange={this.handleEditChange('instructions')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="outlined-name"
                  label="Image"
                  className={classes.textField}
                  value={hasValue ? selectedRecipe.imgUrl : ''}
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

      </main>
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


