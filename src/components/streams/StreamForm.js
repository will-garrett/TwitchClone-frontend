import React from 'react';
import {Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
  render(){
    return (
      <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field label="Enter Title" name="title" component={this.renderInput}/>
        <Field label="Enter Description" name="description" component={this.renderInput}/>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }

  onSubmit = (formValues)=>{
    this.props.onSubmit(formValues);
    
  }

  renderInput = ({input, label, meta})=>{
    const className  = `field ${(meta.error && meta.touched) ? 'error' : ''}`;
    return (
      <div className={className}>
      <label>{ label }</label>
      <input {...input} autoComplete="off"/>
      {this.renderError(meta)}
      </div>
    );
  }

  renderError = ({ error, touched })=>{
    if(touched && error){
      return (
        <div className="ui error message">
            {error}
        </div>
      );
    }
  }

}

const validate = (formValues) => {
  let errs = {};
  if(!formValues.title){
    errs.title = "Invalid Title - you must enter a `Title`";
  }
  if(!formValues.description){
    errs.description = "Invalid Description - you must enter a `Description`";
  }
  return errs;
}

export default reduxForm({
  form: 'streamForm',
  //initialValues: ,
  validate
})(StreamForm); 


