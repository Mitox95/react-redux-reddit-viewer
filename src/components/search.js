import React, { Component, PropTypes } from 'react';

/* The Search component lets you type in and submit
    a subreddit name to adjust the viewers content. */
class Search extends Component {
    constructor(props) {
        super(props)

        this.state = { term: '' }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    static contextTypes = {
        router: PropTypes.object
    };

    handleChange(event) {
        this.setState({ term: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault();
        // Here we determine if the user is browsing this within the 
        // viewer or on the homepage.
        let location = this.props.location;

        if (this.props.params.filter && !location.query.sort && !location.query.t) {
            this.context.router.push(`/r/${this.state.term}/${this.props.params.filter}`);
        } else if (location.query.sort && location.query.t) {
            this.context.router.push(`/r/${this.state.term}/${this.props.params.filter}/?sort=${location.query.sort}&t=${location.query.t}`)
        } else {
            this.context.router.push(`/r/${this.state.term}/hot`)
        }

        this.setState({ term: '' })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="input-field col s6">
                    <input value={this.state.term} 
                        onChange={this.handleChange}
                        id="term_search" 
                        type="text" 
                        className="validate" />
                    {this.props.params.sub &&
                        <label className="active" htmlFor="term_search">Currently viewing /r/{this.props.params.sub}</label>
                    }
                    {!this.props.params.sub && 
                        <label className="active" htmlFor="term_search">Enter a Subreddit Name...</label>
                    }
                </div>
            </form>

        )
    }
}

export default Search;