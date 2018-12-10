import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
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
    input: {
        //margin: theme.spacing.unit
    }
});

class RecipeDetails extends Component {
    render() {
        const { classes, recipe } = this.props;

        return (
            <div className={classes.layout}>
                <Typography variant="h5" align="center" color="textPrimary" gutterBottom className="recipe-hr">
                    {recipe.title}
                </Typography>

                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <div>Ingredients</div>
                        <Input
                            readOnly="true"
                            multiline
                            rowsMax="20"
                            fullWidth="true"
                            disableUnderline="true"
                            defaultValue={recipe.ingredients}
                            className={classes.input}
                        />

                    </Grid>
                    <Grid item xs={6}>
                        <img src={recipe.imgUrl} className="recipe-img" />
                    </Grid>
                    <Grid item xs={12}>
                        <div>Image</div>
                        <Input
                            readOnly="true"
                            fullWidth="true"
                            disableUnderline="true"
                            defaultValue={recipe.imgUrl}
                            className={classes.input}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div>Instructions</div>
                        <Input
                            readOnly="true"
                            multiline
                            rowsMax="30"
                            fullWidth="true"
                            disableUnderline="true"
                            defaultValue={recipe.instructions}
                            className={classes.input}
                        />

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
