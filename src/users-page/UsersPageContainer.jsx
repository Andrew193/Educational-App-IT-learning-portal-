import HOCs from "../HOCs";
import React, {useEffect, useState} from "react";
import {getAllUsers} from "./usersPageService";
import CustomizedAccordions from "../components/Accordion/Accordion";
import {useLocation, withRouter} from "react-router-dom";
import {notify, SEARCH_NOT_OK, SEARCH_OK, SEARCH_START} from "../vars";


function UsersPageContainer(props) {
    const location = useLocation();
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isPreOpened, setIsPreOpened] = useState(false);

    useEffect(() => {
        getAllUsers(setUsers, setIsLoading)
    }, [])

    useEffect(() => {
        function searchUserGroup() {
            if (location.hash) {
                notify(SEARCH_START)
                const item = document.body.querySelector(location.hash);
                if (item && !isPreOpened && !!users) {
                    setIsPreOpened(true);
                    item?.parentNode?.click();
                    item.scrollIntoView();
                    notify(SEARCH_OK)
                } else {
                    notify(SEARCH_NOT_OK)
                }
            }
        }

        if (users) {
            searchUserGroup();
        }

    }, [location.hash, users])

    return (
        <>
            <h1
                style={{
                    marginTop: "unset"
                }}
            >Пользователи</h1>

            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}

            {users && <CustomizedAccordions
                accordionConfigObject={users}
            />
            }
        </>
    )
}

export default withRouter(HOCs.withHeader(UsersPageContainer))