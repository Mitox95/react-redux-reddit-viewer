import React, { Component } from 'react';
import Timestamp from 'react-timestamp'

/* The Card component expects a JSON object representing
    a Reddit thread and renders it in a MUI 'card' */
class Card extends Component {
    constructor(props) {
        super(props)

        this.state = { expanded: false }
        this.handleExpand = this.handleExpand.bind(this);
    }

    // Certain threads contain rich media content that can be inlined
    // on the page. If the thread contains one of these this helper
    // function returns the controls to expand it. Otherwise it
    // renders a view button to view the threads permalink.
    renderExpandControls() {
        const { thread } = this.props;
        if (thread.data.post_hint === 'image' || thread.data.post_hint === 'rich:video') {
            if (this.state.expanded) {
                return (
                    <a className="waves-effect waves-light" onClick={this.handleExpand}>
                        <i className="material-icons right">expand_less</i>Compress
                    </a>
                )
            } else {
                return (
                    <a className="waves-effect waves-light" onClick={this.handleExpand}>
                        <i className="material-icons right">expand_more</i>Expand
                    </a>    
                )      
            }
        } else {
            return (
                <a className="waves-effect waves-light" href={thread.data.url} target="_blank">
                    <i className="material-icons right">visibility</i>View
                </a>
            )
        }
    }

    // Handles each expandable content type differently. If it's an image 
    // it returns an image tag, for a rich:video embed type we render the iFrame inline.
    renderExpandContent() {
        const { thread } = this.props;

        if (thread.data.post_hint === 'image') {
            return <img src={thread.data.url} className="img-responsive" alt={thread.data.title} />;
            
        } else if (thread.data.post_hint === 'rich:video') {
            return <div className="iframe-responsive" 
                dangerouslySetInnerHTML={ {__html: this.htmlDecode(thread.data.secure_media_embed.content) } } />;
        }
    };

    // Helper function that converts a string into a HTML node.
    // Used for iFrame embeds that come from the Reddit API.
    htmlDecode(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }
      
    handleExpand() {
        this.setState({ expanded: !this.state.expanded });
    };

    render() {
        const { thread } = this.props;

        // Certain thumbnail paths from the Reddit API's indicate a content type and not
        // an image. For these we re-assign their values to some placeholders so they
        // can be rendered in an image tag.
        if (thread.data.thumbnail === 'self') {
            thread.data.thumbnail = './assets/placeholder_self.png'
        } else if (thread.data.thumbnail === 'nsfw') {
            thread.data.thumbnail = './assets/placeholder_nsfw.png'
        } else if (thread.data.thumbnail === 'spoiler') {
            thread.data.thumbnail = './assets/placeholder_spoiler.png'
        } else if (thread.data.thumbnail === '' || thread.data.thumbnail === 'default') {
            thread.data.thumbnail = './assets/placeholder.png'
        }

        return (
            <div key={thread.data.id} className="col s12">
                <div className="card hoverable horizontal">
                    <div className="card-image">
                        <img src={thread.data.thumbnail} alt={thread.data.title} />
                    </div>

                    <div className="card-stacked">
                        <div className="card-content">
                            <span className="card-title-text">
                                <a href={`http://reddit.com${thread.data.permalink}`} target="_blank" rel="noopener">
                                    {thread.data.title}
                                </a>
                            </span>

                            <div className="card-meta">
                                Posted by <a className="card-author" 
                                    href={`https://www.reddit.com/user/${thread.data.author}`} 
                                    target="_blank"
                                    rel="noopener">
                                    {thread.data.author}
                                </a> <Timestamp time={thread.data.created_utc} />
                            </div>

                            <div className="chip-list">
                                {thread.data.over_18 && 
                                    <div className="chip">
                                        nsfw
                                    </div>
                                }
                                {thread.data.post_hint &&
                                    <div className="chip">
                                        {thread.data.post_hint}
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="card-action">
                            <div className="action-list">
                                <span>
                                    {this.renderExpandControls()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {this.state.expanded &&
                        <div className="card-expand">
                            {this.renderExpandContent()}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Card;