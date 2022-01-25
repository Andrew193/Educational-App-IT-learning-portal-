import {Redirect, Route} from "react-router-dom";
import { useSelector} from "react-redux";
import {LOGIN_PAGE} from "../App";

function ProtectedRoute({component: Component, ...restOfProps}) {
    const isAuth = useSelector((state) => state.auth.isAuth);

    if (isAuth === undefined)
        return <div className={"loading"} />;

    return (
        <Route
            {...restOfProps}
            render={props => isAuth ? (<Component {...props} />) : (<Redirect to={{pathname: LOGIN_PAGE}}/>)}
        />
    )
}

export default ProtectedRoute;