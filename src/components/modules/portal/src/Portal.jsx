import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

class Portal extends Component {
  
  static propTypes = {
  	node: PropTypes.any,
  	className: PropTypes.string
  };
  
  constructor(props) {
    super(props);

    if (props.node){
    	this.node = props.node;
    }
    else {
    	this.node = document.createElement('div');
    	document.body.appendChild(this.node);
    }
  }
  
  render() {
    return <div />;
  }
  
  componentDidUpdate() {
  	let newObj = { children: this.props.children, className: this.props.className }
    ReactDOM.render(
      <div
        {...newObj}
        />,
      this.node
    );
  }
  
  componentWillUnmout() {
    document.body.removeChild(this.node);
  }
}


export default Portal;