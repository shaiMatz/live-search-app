import React from 'react';

export class ErrorThrowingComponent extends React.Component {
    render() {
      // Deliberately throwing an error
      if (this.props.shouldThrow) {
        throw new Error('Deliberate error');
      }
  
      return <div>Everything is fine!</div>;
    }
  }