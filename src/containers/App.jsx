import React, { Component, PropTypes } from 'react';
import SideBar from '../components/side-bar/SideBar';
import * as actionCreators from '../actions/actionCreators';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props){
    super(props);
    this.location = props.location.pathname;
  }

  componentWillReceiveProps(nextProps){
    const nextLocation = nextProps.location.pathname;
    const {selectTab} = this.props;
    if (nextLocation !== this.location){
      this.location = nextLocation;
      selectTab(nextLocation);
    }
  }

  render(){

    const { selectedTab, fetching, error, children } = this.props;
    return (
      <div className="boss-panel">
        <SideBar selectedTab={selectedTab}/>
        <div className="boss-panel__container">
          {fetching ? <h2>Loading...</h2> : 
            error ? <h2>{error}</h2> : children
          }
        </div>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

function mapStateToProps(state) {
  return {
    selectedTab: state.selectedTab,
    fetching: state.fetching,
    error: state.error
  }
}

export default connect(mapStateToProps, actionCreators)(App)
