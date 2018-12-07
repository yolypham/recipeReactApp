import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
    textField: {
        width: 300,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    textFieldLarge: {
        width: 900,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
});

class RecipeDetails extends Component {
    render() {
        const { classes, recipe } = this.props;

        const formatIngredients = (recipe.ingredients).replace(/\n/g, '<br />');

        return (
            // <div className={classes.layout}>
            //     <p>{recipe.title}</p>
            //     <p>{recipe.ingredients}</p>
            //     <p>{recipe.instructions}</p>
            //     <p>{recipe.imgUrl}</p>
            // </div>

            <div className={classes.layout}>
                <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
                    {recipe.title}
                </Typography>

                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <div>Ingredients</div>
                        <TextField
                            id="standard-read-only-input"
                            label=""
                            multiline
                            rowsMax="15"
                            value={recipe.ingredients}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <img src={recipe.imgUrl} className="recipe-img" />
                        <div>
                            <TextField
                                id="standard-read-only-input"
                                label=""
                                value={recipe.imgUrl}
                                className={classes.textFieldLarge}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </div>


                    </Grid>
                    <Grid item xs={12}>
                        <div>Instructions</div>
                        <TextField
                            id="standard-read-only-input"
                            label=""
                            multiline
                            rowsMax="15"
                            value={recipe.instructions}
                            className={classes.textFieldLarge}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        {/* <Paper className={classes.paper}>xs=12</Paper> */}
                    </Grid>

                </Grid>
            </div>
        );
    }
}

RecipeDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    recipe: PropTypes.object
};

export default withStyles(styles)(RecipeDetails);
