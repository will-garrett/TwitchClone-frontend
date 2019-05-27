import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut} from '../actions';


class GoogleAuth extends React.Component{
  componentDidMount() {
    window.gapi.load('client:auth2', ()=>{
      window.gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: 'email'
      }).then(()=>{
        
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get()); // initializes the state call for Google oAuth
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }
  onAuthChange = (isSignedIn) => {
    if(isSignedIn){
      console.log("USER", this.auth.currentUser.get().getBasicProfile());
      this.props.signIn(this.auth.currentUser.get().getId());
    }
    else{
      this.props.signOut();
    }
    
  }
  
  onSignInClick = () => {
    this.auth.signIn();
  }
  
  onSignOutClick = ()=>{
    this.auth.signOut();
  }
  
   
  renderAuthButton(){
    if(this.props.isSignedIn === null){
      return <p></p>;
    }
    else if(this.props.isSignedIn){
      return (
        <button onClick={this.onSignOutClick} className="ui red google button">
          <i className="google icon"></i>
          Sign Out
        </button>
      )
    }
    return (
      <button onClick={this.onSignInClick} className="ui blue google button">
        <i className="google icon"></i>
        Sign In w/Google
      </button>
    )
  }
  render(){
    return (
      <div>{this.renderAuthButton()}</div>
    )
  }

}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn};
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);