import ArticleIcon from '@mui/icons-material/Article';
import React from "react";
import TabsContainer from "../tabs/TabsContainer";
import LabLectureContainer from "./LabLectureContainer";
import LabTaskContainer from "./LabTaskContainer";
import LabExampleContainer from "./LabExampleContainer";

export function makeLabsList(response) {
    return response.data.labs.map((lab) => {
        return {
            forId: lab.filename.split(".")[0],
            title: <>
                <ArticleIcon className={"margin-right-5"}/>
                {lab.filename.split(".")[0]}
            </>,
            content:
                <>
                    <TabsContainer
                        tabsCaptions={["Лекция", "Задание", "Примеры"]}
                        tabsContent={[
                            <LabLectureContainer lab={lab}/>,
                            <LabTaskContainer lab={lab}/>,
                            <LabExampleContainer lab={lab}/>
                        ]}
                    />
                </>
        }
    })
}