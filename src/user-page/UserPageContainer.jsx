import HOCs from "../HOCs";
import UserAvatarLine from "./UserAvatarLine";
import {Container} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {decryptInformation} from "../authService";
import {getValueFromLocalStorage} from "../localStorageService";
import {notify, USER_FOUND, USER_INFO, USER_NOT_FOUND} from "../vars";
import {getUserById} from "../users-page/usersPageService";


function UserPageContainer(props) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        userId
    } = props.match.params;

    const [userInformation, setUserInformation] = useState();


    useEffect(() => {
        async function loadUserData() {
            await setIsLoading(() => true)
            if (!userId) {
                const decrUserInformation = decryptInformation(getValueFromLocalStorage(USER_INFO));
                setUserInformation(() => decrUserInformation.userInfo);
            } else {
                const userOrError = await getUserById(userId);

                if (!userOrError) {
                    notify(USER_NOT_FOUND);
                } else {
                    setUserInformation(() => userOrError)
                    notify(USER_FOUND);
                }
            }
            await setIsLoading(() => false)
        }

        loadUserData();

    }, [])

    return (
        <Container>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
            <UserAvatarLine
                userInformation={userInformation}
            />
        </Container>
    )
}

export default withRouter(HOCs.withHeader(UserPageContainer));