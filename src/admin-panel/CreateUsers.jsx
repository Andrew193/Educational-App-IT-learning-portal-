import React, {useEffect, useState} from "react";
import TabsContainer from "../tabs/TabsContainer";
import CreateUsersFromFileTap from "./CreateUsersFromFileTap";


function CreateUsers() {
    const [tabsConfig, setTabsConfigObject] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getData() {
            setIsLoading(() => true);

            setTabsConfigObject(() => (
                <TabsContainer
                    tabsCaptions={["Файл с пользователями", "Ручной ввод"]}
                    tabsContent={[
                        <CreateUsersFromFileTap
                            setIsLoading={setIsLoading}
                        />,
                        <></>
                    ]}
                />
            ))
            setIsLoading(() => false);
        }

        getData();

    }, [])


    return (
        <>
            {isLoading && <div className={"loading"} id={"overlay_loader"}/>}
            {tabsConfig}
        </>
    )
}

export default CreateUsers;