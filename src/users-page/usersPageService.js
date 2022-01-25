import CustomizedAccordions from "../components/Accordion/Accordion";
import React from "react";
import UsersTable from "../components/UsersTable";
import StickyHeadTable from "../components/StickyTable";
import {USERS_URL} from "../vars";

export const userColumns = [
    {id: 'name', label: 'Id', minWidth: 170},
    {id: 'code', label: 'Группа', minWidth: 100},
    {
        id: 'population',
        label: 'Имя',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Фамилия',
        minWidth: 170,
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Почта',
        minWidth: 170,
        format: (value) => value.toFixed(2),
    },
];

export function getAllUsers(setUsers, setIsLoading) {
    setIsLoading(true);
    fetch(USERS_URL)
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
                        content: <StickyHeadTable
                            rows={users.map((user) => (
                                {
                                    name: user.id,
                                    code: user.data.group,
                                    population: user.data.name,
                                    size: user.data.surname,
                                    density: user.data.login
                                }
                            ))}
                            columns={userColumns}
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
                    }
                })

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