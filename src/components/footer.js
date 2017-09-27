import React from 'react';

const Footer = props => {
    return (
        <footer className="page-footer">
            <div className="footer-copyright">
                <div className="container">
                    Powered by <a className="grey-text text-lighten-4" href="http://reddit.com">Reddit</a>
                    <a className="grey-text text-lighten-4 right" href="https://github.com/JamesIves/react-redux-reddit-viewer">GitHub</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;