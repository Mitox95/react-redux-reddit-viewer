import React, { Component } from 'react';
import { Tab, TabGroup } from 'material-tabs';
import { Link } from 'react-router';
import AdvancedFilter from './filter_advanced';

/* The Filter component lets you select from multiple
    pre-defined Reddit filters such as 'hot', 'new', etc. */
class Filter extends Component {
    constructor(props) {
        super(props)

        this.state = { currentTab: 0 }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        // Sets the initial index based on what filter route the user has come in on.
        // Defaults to '0' which is 'hot', the default API call.
        if (this.props.params.filter === 'hot') {
            this.setState({ currentTab: 0 })
        }

        else if (this.props.params.filter === 'new') {
            this.setState({ currentTab: 1 })
        }

        else if (this.props.params.filter === 'top') {
            this.setState({ currentTab: 2 })
        }
    }

    handleChange(index) {
        this.setState({ currentTab: index })
    }

    render() {
        return (
            <div> 
                {this.state.currentTab === 2 &&
                    <AdvancedFilter {...this.props} />   
                }

                <div className="col s12">
                    <TabGroup onChangeTab={this.handleChange} 
                        defaultSelectedTab={this.state.currentTab}
                        style={{ indicator: { backgroundColor: '#ef8361' } }}>
                        <Link to={`/r/${this.props.params.sub}/hot/`}>
                            <Tab style={{ color: '#ff8a65' }}>Hot</Tab>
                        </Link>

                        <Link to={`/r/${this.props.params.sub}/new/`}>
                            <Tab style={{ color: '#ff8a65' }}>New</Tab>
                        </Link>

                        <Link to={`/r/${this.props.params.sub}/top/`}>
                            <Tab style={{ color: '#ff8a65' }}>Top</Tab>
                        </Link>
                    </TabGroup>
                </div>
            </div>
        )
    }
}

export default Filter;