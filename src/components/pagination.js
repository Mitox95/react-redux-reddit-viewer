import React, { Component } from 'react';
import { Link } from 'react-router';

/* The Pagination component allows a user to switch 
    between the next and previous pages. */
class Pagination extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentPage: 1
        }

        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    // The Reddit API will let you query empty data so we only care if 
    // the user can go back or not. We use this state to determine this.
    nextPage() {
        this.setState({ currentPage: this.state.currentPage + 1 })
    }

    prevPage() {
        this.setState({ currentPage: this.state.currentPage - 1 })
    }

    // Formats the next and previous paths. If the user has previously
    // selected a 'sort' option we maintain it within the if statement.
    formatPath() {
        let location = this.props.location;

        if (location.query.sort && location.query.t) {
            return `${location.pathname}?sort=${location.query.sort}&t=${location.query.t}&limit=25&after=t3_`
        } else {
            return `${location.pathname}?limit=25&after=t3_`
        }
    }

    // Resets the page number when the user changes route.
    componentWillReceiveProps(nextProps) {
        if (nextProps.params.sub !== this.props.params.sub ||
            nextProps.params.filter !== this.props.params.filter) {
            this.setState({ currentPage: 1 })
        }
    }

    render() {
        return (
            <ul className="pagination col s12">
                {this.state.currentPage > 1 && 
                    <li className="previous">
                        <Link to={`${this.formatPath()}${this.props.firstItem}`} onClick={this.prevPage}>  
                            <i className="material-icons">chevron_left</i>
                        </Link>
                    </li>
                }

                <li className="middle">
                    Page {this.state.currentPage}
                </li>

                <li className="next">
                    <Link to={`${this.formatPath()}${this.props.lastItem}`} onClick={this.nextPage}>  
                        <i className="material-icons">chevron_right</i>
                    </Link>
                </li>
            </ul>
                  
        )
    }
};

export default Pagination;