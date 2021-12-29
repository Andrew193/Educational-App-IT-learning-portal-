import PageHeader from "./page-header/PageHeader";

function withHeader(WrappedComponent) {
    function WithHeader(props) {
        return (<PageHeader> <WrappedComponent {...props} /></PageHeader>)
    }

    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    WithHeader.displayName = `withHeader(${wrappedComponentName})`;
    return WithHeader;
}

export default {withHeader}