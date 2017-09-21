import React, { Component } from 'react';

import Card from './card';
import Pagination from './pagination';

/* ThreadList expects an Array of data in a JSON format
    and displays a list of Reddit threads in a card format.  */
class ThreadList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstItem: '',
            lastItem: ''
        }
    }

    // Assingns the first and last item in the array and binds it to state.
    // This occurs whenever the list updates and gets handed off to pagination.
    componentWillReceiveProps(nextProps) {
        if (nextProps.threads.length) {
            let lastItem = nextProps.threads.slice(-1).pop().data.id;
            let firstItem = nextProps.threads[0].data.id;

            if (this.state.firstItem !== firstItem || this.state.lastItem !== lastItem) {
                this.setState({
                    firstItem,
                    lastItem
                })
            }
        }
    }

    // Loops over each Reddit 'thread' and maps it to the props of
    // the Card component. This allows each component to maintain its own
    // level of state.
    renderThread() {
        if (this.props.threads.length) {
            return this.props.threads.map((thread, index) => {

                return (
                    <Card key={thread.data.id} thread={thread} />
                );

            });
        } else {
            return (
                <div className="progress-container col s12">
                    {this.renderError()}
                </div>
            )
        }
    }

    // If the error 'toast' is present it is shown, otherwise it shows
    // a progress bar indicating that the content is still loading.
    renderError() {
        if (this.props.toast.length) {
            return <div><h4>{this.props.toast}</h4></div>
        } else {
            return (
                <div className="progress">
                    <div className="indeterminate"></div>
                </div> 
            )
        }
    }

    render() {
        return (
            <div>
                {this.renderThread()}

                {!this.props.toast && 
                    <Pagination 
                        lastItem={this.state.lastItem}
                        firstItem={this.state.firstItem}
                        location={this.props.location}
                        params={this.props.params} />              
                }
            </div>
        );
    }
}

export default ThreadList;