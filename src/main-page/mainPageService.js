import ArticleIcon from '@mui/icons-material/Article';
import React from "react";
import TabsContainer from "../tabs/TabsContainer";
import LabLectureContainer from "./LabLectureContainer";
import LabTaskContainer from "./LabTaskContainer";
import LabExampleContainer from "./LabExampleContainer";

export function makeLabsList(response) {
    let sortedLabsByName;
    if (response?.data?.labs) {
        sortedLabsByName = response?.data?.labs?.sort((labA, labB) => {
            if (labA.filename < labB.filename) {
                return -1;
            }
            if (labA.filename > labB.filename) {
                return 1;
            }
            return 0;
        })
    } else {
        sortedLabsByName = [];
    }

    return sortedLabsByName.map((lab) => {
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