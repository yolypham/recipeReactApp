import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index';


class RecipeNew extends Component {
    renderTextField(field) {
        return (
            <div>
                <label>{field.label}</label>
                <input
                    type="text"
                    {...field.input}>
                </input>
                {field.meta.touched ? field.meta.error : ''}
            </div>

        )
    }

    renderMultiLineField(field) {
        return (
            <div>
                <label>{field.label}</label>
                <input
                    type="textarea"
                    rows="10"
                    cols="100"
                    {...field.input}>
                </input>
                {field.meta.touched ? field.meta.error : ''}
            </div>

        )
    }

    onSubmit() {
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