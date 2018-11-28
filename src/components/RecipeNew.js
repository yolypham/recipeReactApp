import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index';


class RecipeNew extends Component {

    onSubmit() {
        console.log('clicked to Submit...')
        //this.addRecipe();
    }


    render() {

        return (
            <div>
                <form onSubmit={this.onSubmit()}>
                    <input
                        type="text"
                        name="title" />
                    <input
                        type="text"
                        name="ingredients" />
                    <input
                        type="text"
                        name="instructions" />

                    <input
                        type="text"
                        name="picture" />

                    <button type="submit">Add</button>
                    <Link to="/">Cancel</Link>

                </form>

            </div>
        )
    }
}

export default connect(null, { addRecipe })(RecipeNew);