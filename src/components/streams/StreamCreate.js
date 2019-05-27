import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {
  render(){
    return (
      <div>
        <h2>Create a Stream</h2>
        <StreamForm onSubmit={this.onSubmit}></StreamForm>
      </div>
    );
  }

  onSubmit = (formValues)=>{
    this.props.createStream(formValues);
  }

}


export default connect(null, {createStream})(StreamCreate);