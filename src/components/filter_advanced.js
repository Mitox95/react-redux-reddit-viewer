import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'react-materialize';

/* The AdvancedFilter components lets you sort existing filters,
    such as 'top', by pre-defined date ranges. */
class AdvancedFilter extends Component {
    constructor(props) {
        super(props)

        this.state = { filter: 'day' }
        this.handleChange = this.handleChange.bind(this);
    }

    // Adjusts the query parameters based on the select option
    // so the Viewer triggers a new API call.
    handleChange(event) {
        this.setState({ filter: event.target.value });
        this.context.router.push(`${this.props.location.pathname}?sort=top&t=${event.target.value}`)
    }

    render() {
        return (
            <div className="col s6">
                <Input s={12} 
                    type='select' 
                    defaultValue={this.state.filter}
                    onChange={this.handleChange}>
                    <option value="day">Past Day</option>
                    <option value="week">Past Week</option>
                    <option value="hour">Past Hour</option>
                    <option value="month">Past Month</option>
                    <option value="year">Past Year</option>
                    <option value="all">All Time</option>
                </Input>
            </div>
        )
    }

}

AdvancedFilter.contextTypes = {
    router: PropTypes.object
};

export default AdvancedFilter;