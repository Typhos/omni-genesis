import React, { Component } from 'react';

class Default extends Component {

  render () {
    return (
      <div className="App">
        <main className="content">
          {this.props.children}
        </main>
      </div>
    )
  }
}

export { Default };

