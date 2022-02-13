import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_PAGE} from "../App";
import {useEffect} from "react";
import {setPathToRedirectAfterLogin} from "../app/authReducer";

function ProtectedRoute({component: Component, ...restOfProps}) {
    const {
        isAuth,
    } = useSelector((state) => state?.auth);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    function loadData() {
        if (!isAuth) {
            dispatch(setPathToRedirectAfterLogin(location.pathname + location.hash + location.search))
            history.push(LOGIN_PAGE);
        }
    }

    useEffect(() => {
        loadData();
    }, [isAuth, location.pathname])

    if (isAuth === undefined) {
        return <div className={"loading"} id={"overlay_loader"}/>;
    }

    return (
        <Route
            {...restOfProps}
            render={props => isAuth ? (<Component {...props} />) : (<Redirect to={{pathname: LOGIN_PAGE}}/>)}
        />
    )
}

export default ProtectedRoute;