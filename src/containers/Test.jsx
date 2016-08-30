import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Test extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { test1 } = this.props;
    return (
      <div>
        <h1>{test1}</h1>
      </div>
    )
  }
}

Test.propTypes = {
  children: PropTypes.node
}

function mapStateToProps() {
  return {
    test1: 'Hello world1'
  }
}

export default connect(mapStateToProps)(Test)
