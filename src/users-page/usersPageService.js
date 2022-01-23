import CustomizedAccordions from "../components/Accordion/Accordion";
import Typography from "@mui/material/Typography";
import {Button} from "@material-ui/core";
import React from "react";
import UsersTable from "../components/UsersTable";

export function getAllUsers(setUsers, setIsLoading) {
    setIsLoading(true);
    fetch("https://qwertyblut.herokuapp.com/api/users/")
        .then((response) => response.json())
        .then(({users}) => {
                const usersByGroup = {};

                users.forEach((user) => {
                    const userGroup = user.data.group;
                    if (userGroup in usersByGroup) {
                        usersByGroup[userGroup].content.push(user)
                    } else {
                        usersByGroup[userGroup] = {
                            title: userGroup,
                            content: [user]
                        }
                    }
                })

                const result = {
                    0: {
                        title: "Все пользователи",
                        content: <UsersTable
                            rows={users}
                        />
                    }
                }

                Object.entries(usersByGroup).forEach((userConfig) => {
                    console.log(users, userConfig[1].content)
                    result[userConfig[0]] = {
                        title: `Группа ${userConfig[0]}`,
                        content: <UsersTable
                            rows={userConfig[1].content}
                        />
                    }})

                setUsers({
                    data: {
                        title: "Пользователи ( студенты )",
                        content: <CustomizedAccordions
                            accordionConfigObject={result}
                        />
                    }
                })

                console.log(users)
            }
        )
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false))
}