import React, { Component, PropTypes } from 'react';
import Test from '../components/Test';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    const { children, fetching, error } = this.props;
    if (fetching) {
      return <h2>Loading...</h2>
    }

    return (
      <div>
        {error ? <h2>{error}</h2> : 
          <h2>ada</h2>
        }
        <Test />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    fetching: state.get('fetching'),
    error: state.get('error')
  }
}

export default connect(mapStateToProps)(App)
