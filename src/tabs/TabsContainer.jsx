import {Box} from "@material-ui/core";
import TabItem from "./TabItem";
import {useEffect, useMemo, useState} from "react";
import {createArrayWithPresetLengthAndValues, createDeepCopy} from "../utils";
import {v4 as uuidv4} from 'uuid';


function TabsContainer(props) {
    const {
        tabsCaptions,
        tabsContent
    } = props;

    const [isOpened, setIsOpened] = useState(createArrayWithPresetLengthAndValues(tabsCaptions.length, false))

    useEffect(() => {
        setIsOpened((state) => {
            const stateCopy = createDeepCopy(state)
            stateCopy[0] = true;
            return stateCopy
        })
    }, [])

    const tabsContentList = useMemo(() => tabsContent?.map((content, index) =>
        <p
            key={uuidv4()}
            className={`${!isOpened[index] ? "d-none" : ""}`}
        >{content}</p>
    ), [JSON.stringify(isOpened)])

    return (
        <Box
            className={"d-flex f-direction"}
        >
            <Box
                className={"d-flex w-100 p-unset list-style-type-unset"}
            >
                {
                    tabsCaptions?.map((caption, index) => <TabItem
                        key={index}
                        setIsOpened={() => setIsOpened(() => {
                            const stateCopy = createArrayWithPresetLengthAndValues(tabsCaptions.length, false);
                            stateCopy[index] = true;
                            return stateCopy;
                        })}
                        tabTitle={caption}
                        isOpened={isOpened[index]}
                    />)
                }
            </Box>

            {tabsContentList}
        </Box>
    )
}

export default TabsContainer;