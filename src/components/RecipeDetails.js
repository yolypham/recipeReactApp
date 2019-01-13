import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        flexWrap: 'wrap',
        backgroundColor: '#80cbc4',
        height: '100%',
        padding: '5px'
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

                    <Grid container spacing={24} className="modal-dialog">
                        <Grid item xs={6}>
                            <Typography variant="subtitle1"
                                color="textSecondary"
                                gutterBottom >
                                Recipe by {recipe.user.nickname}
                            </Typography>
                            <div>&nbsp;</div>
                            <Typography variant="h6"
                                color="textPrimary"
                                gutterBottom >
                                Ingredients
                            </Typography>
                            <InputBase
                                style={{ color: '#263238' }}
                                readOnly={true}
                                multiline
                                rowsMax="20"
                                fullWidth={true}
                                defaultValue={recipe.ingredients}
                            />

                        </Grid>
                        <Grid item xs={6}>
                            <img src={recipe.imgUrl} className="recipe-img" alt={recipe.title} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6"
                                color="textPrimary"
                                gutterBottom >
                                Instructions
                            </Typography>
                            <InputBase
                                style={{ color: '#263238' }}
                                readOnly={true}
                                multiline
                                rowsMax="30"
                                fullWidth={true}
                                defaultValue={recipe.instructions}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <Typography variant="h6"
                                color="textPrimary"
                                gutterBottom >
                                Image
                            </Typography>
                            <InputBase
                                style={{ color: '#263238' }}
                                readOnly={true}
                                fullWidth={true}
                                multiline
                                rowsMax="3"
                                defaultValue={recipe.imgUrl}
                            />
                        </Grid> */}

                    </Grid>
                </div >
            </div >
        );
    }
}

RecipeDetails.propTypes = {
    classes: PropTypes.object.isRequired,
    recipe: PropTypes.object
};

export default withStyles(styles)(RecipeDetails);
