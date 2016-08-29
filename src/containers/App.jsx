import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { children, test } = this.props
    return (
      <div>
        <h1>{test}</h1>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps() {
  return {
    test: 'Hello world'
  }
}

export default connect(mapStateToProps)(App)
