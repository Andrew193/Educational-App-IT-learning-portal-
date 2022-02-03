import {Redirect, Route, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_PAGE} from "../App";
import {useEffect, useMemo, useState} from "react";
import {getValueFromLocalStorage} from "../localStorageService";
import {USER_INFO} from "../vars";
import {decryptInformation, redirectAfterLogin} from "../authService";
import {authorizeUser, setPathToRedirectAfterLogin} from "../app/authReducer";
import {withDelay} from "../utils";

function ProtectedRoute({component: Component, ...restOfProps}) {
    const {
        isAuth,
    } = useSelector((state) => state?.auth);

    const [isCompleted, setIsCompleted] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    async function loadData() {
        console.log("sdsdsds")
        if (!isAuth) {
            await dispatch(setPathToRedirectAfterLogin(location.pathname + location.hash + location.search))

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

    const onLoadDataHandler = useMemo(() => withDelay(500,
        () => loadData()), [loadData])

    useEffect( () => {
        if (!isCompleted) {
            setIsCompleted(() => true)
            onLoadDataHandler();
        }

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