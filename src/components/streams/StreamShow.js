import React from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component{
  constructor(props){
    super(props);
    this.videoRef = React.createRef();
  }
  componentDidMount(){
    
    let {id} = this.props.match.params;
    this.props.fetchStream(id);
    this.buildPlayer();
  }
  buildPlayer(){
    console.log("Player", this.player, "Prop Stream", !this.props.stream);
    if(this.player || !this.props.stream){
      console.log("hit exit");
      return;
    }
    let {id} = this.props.match.params;
    this.player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${id}.flv`
    });
    console.log(this.videoRef.current);
    this.player.attachMediaElement(this.videoRef.current);
    this.player.load();
  }

  componentDidUpdate(){
    this.buildPlayer();
  }
  componentWillUnmount(){
    console.log("I was unmounted");
    this.player.destroy();
  }
  
  render(){
    if(!this.props.stream){
      return <div>Loading...</div>
    }
    const { title, description } = this.props.stream;
    return (
      <div>
        <video style={{width: '100%'}} controls ref={this.videoRef}/>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps)=>{
  return { stream: state.streams[ownProps.match.params.id]};
};


export default connect(mapStateToProps, {fetchStream})(StreamShow);