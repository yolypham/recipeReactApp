import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

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

    onSubmit(values) {
        // this === component
        console.log(values);
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        name="title"
                        label="Title:"
                        component={this.renderTextField}>

                    </Field>
                    <Field
                        name="ingredients"
                        label="Ingredients:"
                        component={this.renderMultiLineField}>

                    </Field>
                    <Field
                        name="instructions"
                        label="Instructions:"
                        component={this.renderMultiLineField}>

                    </Field>
                    <Field
                        name="img"
                        label="Image:"
                        component={this.renderTextField}>

                    </Field>
                    <button type="submit">Add</button>
                    <Link to="/">Cancel</Link>

                </form>

            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = "! Please enter a title";
    }
    if (!values.ingredients) {
        errors.ingredients = "! Please enter ingredients";
    }
    if (!values.instructions) {
        errors.instructions = "! Please enter instructions";
    }
    if (!values.img) {
        errors.img = "! Please enter img location and name";
    }
    return errors;
}


export default reduxForm({
    form: 'recipeNewForm',
    validate
})(RecipeNew);