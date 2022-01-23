import HOCs from "../HOCs";
import React, {useEffect, useState} from "react";
import {getAllUsers} from "./usersPageService";
import CustomizedAccordions from "../components/Accordion/Accordion";


function UsersPageContainer() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllUsers(setUsers, setIsLoading)
    }, [])


    return (
        <>
            <h1
                style={{
                    marginTop:"unset"
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

export default HOCs.withHeader(UsersPageContainer)