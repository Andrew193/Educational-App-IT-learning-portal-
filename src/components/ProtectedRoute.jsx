import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_PAGE} from "../App";
import {useEffect} from "react";
import {getValueFromLocalStorage} from "../localStorageService";
import {USER_INFO} from "../vars";
import {decryptInformation, redirectAfterLogin} from "../authService";
import {authorizeUser, setPathToRedirectAfterLogin} from "../app/authReducer";

function ProtectedRoute({component: Component, ...restOfProps}) {
    const {
        isAuth,
    } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        async function loadData() {
            if (!isAuth) {
                console.log(location.pathname)
                await dispatch(setPathToRedirectAfterLogin(location.pathname))

                const storedUserInformation = getValueFromLocalStorage(USER_INFO);
                if (storedUserInformation) {
                    const decryptedUserInformation = decryptInformation(storedUserInformation)?.userInfo;

                    const authInformation = {
                        login: decryptedUserInformation?.data?.login,
                        password: decryptedUserInformation?.data?.password
                    }

                    await dispatch(authorizeUser({
                        values: authInformation,
                        redirectAfterLogin: redirectAfterLogin(history)
                    }));
                }
            }
        }


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