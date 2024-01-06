import React from 'react';
import Link from 'next/link'; // Import Link from Next.js

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        // Custom fallback UI
        return (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>An error occurred</h1>
            <p>Sorry, something went wrong.</p>
            <Link href="/">
              <a style={{ color: 'blue', textDecoration: 'underline' }}>Go back home</a>
            </Link>
          </div>
        );
      }

      return this.props.children; 
    }
}
