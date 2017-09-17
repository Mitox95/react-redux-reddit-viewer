import React, { Component, PropTypes } from 'react';

/* The AdvancedFilter components lets you sort existing filters,
    such as 'top', by pre-defined date ranges. */
class AdvancedFilter extends Component {
    constructor(props) {
        super(props)

        this.state = { filter: 'day' }
        this.handleChange = this.handleChange.bind(this);
    }
    
    static contextTypes = {
        router: PropTypes.object
    };

    // Adjusts the query parameters based on the select option
    // so the Viewer triggers a new API call.
    handleChange(event) {
        this.setState({ filter: event.target.value });
        this.context.router.push(`${this.props.location.pathname}?sort=top&t=${event.target.value}`)
    }

    // Initializes the Materialize select components using jQuery.
    componentDidMount() {
        $(this.refs['select']).material_select();
        $(this.refs['select']).on('change', this.handleChange.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        this.forceUpdate()
    }

    render() {
        return (
            <select className="input-field col s6" 
                defaultValue={this.state.filter} 
                ref="select">
                <option value="day">Past Day</option>
                <option value="week">Past Week</option>
                <option value="hour">Past Hour</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
                <option value="all">All Time</option>
            </select>
        )
    }

}

export default AdvancedFilter;