import React, { Component } from 'react';
import Footer from './footer';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <main className="row">
          {this.props.children}
        </main>
        <Footer className="row" />
      </div>
    );
  }
}