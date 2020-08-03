import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        console.log(info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <div className="col">
                    <h3>Ha ocurrido un error y este componente no se ha podido renderizar</h3>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;