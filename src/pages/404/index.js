import React, { Component } from 'react';
import Page from 'components/page';
import { TitleComponent } from 'components/titleComponent.js';

class Error404 extends Component {

  render () {
    return (
      <Page.Default>
        <TitleComponent title={`404 - Centhris Wiki`} />
        <section id="error404" className="article">
          <h2>404</h2>
          <h3>Sorry, That Does Not Appear to Exist</h3>
        </section>
      </Page.Default>
    )
  }
}

export { Error404 };

