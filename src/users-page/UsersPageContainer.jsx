import HOCs from "../HOCs";
import React, {useEffect, useState} from "react";
import {getAllUsers} from "./usersPageService";
import CustomizedAccordions from "../components/Accordion/Accordion";
import {useLocation, withRouter} from "react-router-dom";


function UsersPageContainer(props) {
    const location = useLocation();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPreOpened, setIsPreOpened] = useState(false);

    useEffect(() => {
        getAllUsers(setUsers, setIsLoading)
    }, [])

    useEffect(() => {
        if (location.hash) {
            const item = document.body.querySelector(location.hash);
            if (item && !isPreOpened) {
                setIsPreOpened(true);
                item?.parentNode?.click()
                item.scrollIntoView()
            }
        }
    })

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