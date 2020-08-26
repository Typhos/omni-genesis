import React, { Component } from 'react';

import "styles/loading.scss";

export default class LoadingSpinner extends Component {

  constructor(props, context) {
    super(props, context);

    if (!this.props.name) {
      throw new Error('Spinner components must have a name prop.');
    }

    if (!this.props.loadingImage && !this.props.children) {
      throw new Error('Spinner components must have either a loadingImage prop or children to display.');
    }

    if (this.props.show === undefined) {
      throw new Error('Spinner must be set to true or false');
    }
  }

  render() {
    let divStyle = { display: 'inline-block' };
    if (this.props.show) {
      const { loadingImage } = this.props;
      return (
        <div style={divStyle}>
          { loadingImage && <img alt="" src={loadingImage} /> }
          { this.props.children }
        </div>
      );
    }
    return (<div style={divStyle}></div>);
  }
}