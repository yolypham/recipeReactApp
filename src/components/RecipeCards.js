//external imports
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storage } from '../firebase'

//project imports
import { loadRecipes, addRecipe, removeRecipe as deleteRecipe, updateRecipe } from '../actions';
import RecipeDetails from './RecipeDetails';
import ImgDrop from './ImgDrop';
import Spinner from './Spinner';

//material UI
import { withStyles } from '@material-ui/core/styles';
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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

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
    marginTop: theme.spacing.unit * 6,
    padding: `${theme.spacing.unit * 3}px 0 0 0`,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  fab: {
    margin: theme.spacing.unit,
    backgroundColor: '#0c5d3a',
    color: '#ffffff',
    "&:hover": {
      backgroundColor: '#128854'
    }
  },
  cardGrid: {
    backgroundColor: '#ffffff',
    padding: '10px'
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%',
    "&:hover": {
      backgroundColor: '#128854'
    }
  },
  cardContent: {
    flexGrow: 1,
    backgroundColor: '#80cbc4',
    padding: '5px',
    "&:last-child": {
      paddingBottom: '5px'
    }
  },
  container: {
    flexWrap: 'wrap',
    textAlign: 'center',
    backgroundColor: '#80cbc4',
    height: '100%'
  },
  typography: {
    height: '55px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    width: 120,
    float: 'right',
    backgroundColor: '#0c5d3a',
    color: '#ffffff',
    "&:hover": {
      backgroundColor: '#128854'
    },
    [theme.breakpoints.down('sm')]: {
      float: 'none',
      textAlign: 'center'
    },
  },
  formControl: {
    width: '80%',
    backgroundColor: '#ffffff',
    margin: theme.spacing.unit * 2,
    padding: '20px',
    borderRadius: '1%'
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
    openConfirmDeleteDialog: false,
    selectedRecipe: null,
    imgFileUpload: null,
    processing: false
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
    this.setState({
      openAddDialog: false,
      form: null,
      imgFileUpload: null
    });
  };

  handleOpenEditDialog = () => {
    this.setState({ openEditDialog: true });
  };

  handleCloseEditDialog = () => {
    this.setState({ openEditDialog: false });
  };

  handleConfirmDeleteOpen = (selectedRecipe) => {
    this.setState({
      openConfirmDeleteDialog: true,
      selectedRecipe: selectedRecipe
    });
  };

  handleConfirmDeleteClose = () => {
    this.setState({ openConfirmDeleteDialog: false });
  };

  clickRecipeHandler(recipe) {
    this.setState({
      openDetailDialog: true,
      selectedRecipe: recipe,
    })
  }

  clickDeleteHandler = async () => {
    try {
      this.handleConfirmDeleteClose();
      await this.props.deleteRecipe(this.state.selectedRecipe._id);
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
    //console.log(`name is ${name} and value is ${value}`);
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

  handleAddSubmit = (e) => {
    //disable auto submit form
    e.preventDefault();

    const { currentUser } = this.props;
    const newRecipe = this.state.form;

    //set the loged user
    newRecipe.user = currentUser._id;

    try {
      this.setState({ processing: true });

      const { imgFileUpload } = this.state;

      const uploadTask = storage.ref(`images/${imgFileUpload.name}`).put(imgFileUpload);

      uploadTask.on('state_changed',
        (snapshot) => {
          // on Progress...
        },
        (error) => {
          console.log(error);
          this.setState({ processing: false });
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

          this.setState({
            form: null,
            imgFileUpload: null,
            processing: false
          });
        })
    } catch (e) {
      this.setState({
        form: null,
        imgFileUpload: null,
        processing: false
      });
      console.log(e);
    }
  }

  handleUpdate = async (e) => {
    //disable auto submit form
    e.preventDefault();

    this.setState({ processing: true });

    let id = this.state.selectedRecipe._id;
    let { selectedRecipe } = this.state;
    let { imgFileUpload } = this.state;

    try {
      if (imgFileUpload) {
        //if image file need to be uploaded
        let uploadTask = storage.ref(`images/${imgFileUpload.name}`).put(imgFileUpload);

        uploadTask.on('state_changed',
          (snapshot) => {
            // on Progress...
          },
          (error) => {
            console.log(error);
            this.setState({ processing: false });
          },
          // Upload complete ....
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log('File available at', downloadURL);

            selectedRecipe.imgUrl = downloadURL;

            await this.props.updateRecipe(id, selectedRecipe);
            await this.handleCloseEditDialog();
            await this.props.loadRecipes();
            this.setState({ imgFileUpload: null, processing: false });
          })
      } else {
        await this.props.updateRecipe(id, selectedRecipe);
        await this.handleCloseEditDialog();
        await this.props.loadRecipes();
        this.setState({ imgFileUpload: null, processing: false });
      }
    } catch (e) {
      console.log(e)
      this.setState({ imgFileUpload: null, processing: false });
    }
  }

  imageUpdate = (imgFileUpload) => {
    this.setState({ imgFileUpload })
  }

  render() {
    const { classes, recipes, currentUser } = this.props;
    const { selectedRecipe, form, processing, imgFileUpload } = this.state;

    const hasValue = (selectedRecipe ? true : false)

    const addNewRecipe = (currentUser && currentUser.nickname ?
      (<div className="add-icon">
        Add Recipe
        <Fab
          aria-label="Add"
          size="small"
          className={classes.fab}>
          <AddIcon onClick={this.clickAddRecipeHandler} />
        </Fab>
      </div>)
      :
      ''
    );

    //Update Button
    const enableUpdButton = selectedRecipe &&
      (selectedRecipe.title.length > 0) &&
      (selectedRecipe.ingredients.length > 0) &&
      (selectedRecipe.instructions.length > 0) &&
      (selectedRecipe.imgUrl.length > 0);

    const updateButton = (enableUpdButton ?
      (<Button
        variant="contained"
        onClick={this.handleUpdate}
        className={classes.button}
      >
        Update
      </Button>)
      :
      (<Button
        disabled
        variant="contained"
        className={classes.button}
      >
        Update
        </Button>)
    );

    // Add button
    const enableAddButton = form &&
      (form.title != null &&
        form.ingredients != null &&
        form.instructions != null &&
        imgFileUpload != null);

    const addButton = (enableAddButton ?
      (<Button
        variant="contained"
        onClick={this.handleAddSubmit}
        className={classes.button}
      >Add </Button>) :
      (<Button
        disabled
        variant="contained"
        className={classes.button}
      >Add </Button>)
    );

    // Spinner
    const ovelaySpinner = processing ? <Spinner /> : '';

    // Build recipe thumbnail cards
    const showRecipes = recipes.map(recipe => {
      // allow edit or delete only if recipe belongs to current user
      const allowUpdate = (currentUser && currentUser.email === recipe.user.email ? true : false)
      const editDeleteBtns = allowUpdate ? (
        <div className="action-icons">
          <Tooltip title="Update">
            <Fab
              aria-label="Edit"
              size="small"
              className={classes.fab}>
              <EditIcon onClick={() => this.clickEditHandler(recipe)} />
            </Fab>
          </Tooltip>
          <Tooltip title="Delete">
            <Fab
              aria-label="Delete"
              size="small"
              className={classes.fab}>
              <DeleteIcon onClick={() => this.handleConfirmDeleteOpen(recipe)} />
            </Fab>
          </Tooltip>
        </div>)
        :
        (<div className="recipeBy"> Recipe by {recipe.user.nickname} </div>);


      return (
        <Grid item key={recipe._id} xs={12} sm={6} md={3} lg={3} xl={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={recipe.imgUrl}
              alt="Click to view"
              onClick={() => this.clickRecipeHandler(recipe)}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                className={classes.typography}
                align="center"
                variant="h6"
                color="textPrimary">
                {recipe.title}
              </Typography>

              {editDeleteBtns}

            </CardContent>
          </Card>
        </Grid>
      )
    })

    return (
      <main>
        <div className={classes.layout}>
          <div className="recipeListHeader">Recipes:</div>
          {addNewRecipe}

          <Grid container spacing={8}>
            {showRecipes}
          </Grid>
        </div>

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

          <div className="modal-dialog">
            <RecipeDetails recipe={selectedRecipe} />
          </div>

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

          <div className="modal-dialog">

            <form
              className={classes.container}
              noValidate
              autoComplete="off" >

              <FormControl className={classes.formControl}>
                <TextField
                  id="title_add"
                  label="Title"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('title')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="ingredients_add"
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
                  id="instructions_add"
                  label="Instructions"
                  placeholder="Placeholder"
                  multiline
                  rows="8"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('instructions')}
                  margin="normal"
                  variant="outlined"
                />
                <ImgDrop imageUpdate={this.imageUpdate} />
                <div className="button-div">
                  {addButton}
                </div>
              </FormControl>

            </form>
            {ovelaySpinner}
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

          <div className="modal-dialog">
            <form
              className={classes.container}
              noValidate
              autoComplete="off">
              <FormControl className={classes.formControl}>
                <TextField
                  id="title-upd"
                  label="Title"
                  className={classes.textField}
                  value={hasValue ? selectedRecipe.title : ''}
                  onChange={this.handleEditChange('title')}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  id="ingredients-upd"
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
                  id="instructions-upd"
                  label="Instructions"
                  placeholder="Placeholder"
                  multiline
                  rows="8"
                  className={classes.textField}
                  value={hasValue ? selectedRecipe.instructions : ''}
                  onChange={this.handleEditChange('instructions')}
                  margin="normal"
                  variant="outlined"
                />
                <ImgDrop
                  imageUpdate={this.imageUpdate}
                  oldImg={hasValue ? selectedRecipe.imgUrl : ''}
                />
                <div className="button-div">
                  {updateButton}
                </div>

              </FormControl>
            </form>
            {ovelaySpinner}
          </div>
        </Dialog>

        {/* Delete confirm dialog */}
        <Dialog
          open={this.state.openConfirmDeleteDialog}
          onClose={this.handleConfirmDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete confirm"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this recipe?
            </DialogContentText>
          </DialogContent>
          <DialogActions style={{ justifyContent: 'center' }}>
            <Button className={classes.button} onClick={this.handleConfirmDeleteClose} >
              Cancel
            </Button>
            <Button className={classes.button} onClick={this.clickDeleteHandler} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

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
  currentUser: PropTypes.object
};

export default connect(
  mapStateToProps,
  { loadRecipes, addRecipe, deleteRecipe, updateRecipe }
)(withStyles(styles)(RecipeCards));


