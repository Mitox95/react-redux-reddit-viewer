import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchList } from '../actions/index';

import Search from './search';
import Filter from './filter';
import ThreadList from './thread_list';

/* The Viewer component is the brains of the application
  and handles all of the API calls whenever the location 
  props have changed. */
class Viewer extends Component {
  constructor(props) {
    super(props)

    this.fetchContent = this.fetchContent.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  };

  // Before the component mounts if the use hasn't selected a filter
  // we automatically re-direct them to the default, 'hot'.

  // Because the Reddit API lets you query dummy data which returns nothing
  // we strip out any search params here as it can cause problems when our
  // application doesn't know what page 1 is.
  componentWillMount() {
    if (!this.props.params.filter) {
      this.context.router.push(`/r/${this.props.params.sub}/hot`);
    } else if (this.props.params.filter && this.props.location.search != '') {
      this.context.router.push(`/r/${this.props.params.sub}/${this.props.params.filter}/`);
    }
  }
  
  // When the component mounts we make an API call based on the filter.
  // If the filter doesn't exist we default to 'hot', the reddit standard.
  componentDidMount() {
    if (this.props.params.filter) {
      this.fetchContent(this.props.params.sub, this.props.params.filter, '');
    } else {
      this.fetchContent(this.props.params.sub, 'hot', '');
    }
  }

  // Make sure that when the route props update that we're not updating content
  // for no reason. Here we check between three criteras.
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.filter != this.props.params.filter || 
      nextProps.params.sub != this.props.params.sub ||
      nextProps.location.search != this.props.location.search) {

      this.fetchContent(nextProps.params.sub, 
        nextProps.params.filter, nextProps.location.search);
    }
  }

  // Fires off a Redux action creator that queries the data.
  fetchContent(sub, filter, search) {
    this.props.fetchList(
      `${sub}/${filter}`, 
      search);
  }

  render() {
    return (
      <div>
        <Search className="col s6"
          params={this.props.params}
          location={this.props.location} />
        <Filter className="col s6"
          params={this.props.params} 
          location={this.props.location} />
        <ThreadList {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
      threads: state.threads.list,
      toast: state.threads.toast
    };
}

export default connect(mapStateToProps, { fetchList })(Viewer);
