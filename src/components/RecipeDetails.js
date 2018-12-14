import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        flexWrap: 'wrap',
        backgroundColor: '#FBE9E7',
        height: '100%'
    },
})

class RecipeDetails extends Component {
    render() {
        const { classes, recipe } = this.props;

        return (
            <div className={classes.container}>
                <div className="details">
                    <Typography
                        variant="h5"
                        align="center"
                        color="textPrimary"
                        gutterBottom
                        className="recipe-hr">
                        {recipe.title}
                    </Typography>

                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            <Typography variant="h6"
                                color="textPrimary"
                                gutterBottom >
                                Ingredients
                            </Typography>
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
                            <Typography variant="h6"
                                color="textPrimary"
                                gutterBottom >
                                Instructions
                            </Typography>
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

                        <Grid item xs={12}>
                            <Typography variant="h6"
                                color="textPrimary"
                                gutterBottom >
                                Image
                            </Typography>
                            <Input
                                readOnly="true"
                                fullWidth="true"
                                disableUnderline="true"
                                defaultValue={recipe.imgUrl}
                                className={classes.input}
                            />
                        </Grid>

                    </Grid>
                </div>
            </div>
        );
    }
}

RecipeDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    recipe: PropTypes.object
};

export default withStyles(styles)(RecipeDetails);
