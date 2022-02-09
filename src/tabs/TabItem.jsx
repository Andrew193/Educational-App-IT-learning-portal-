import {Button} from "@mui/material";

function TabItem(props) {
    const {
        tabTitle,
        isOpened,
        setIsOpened
    } = props;

    return (
        <p
            key={tabTitle}
            onClick={() => {
                setIsOpened();
            }}
            className={"flex-1-0 back-tab border-right-1p tab"}
        >
            <Button
                className={`border-unset border-radius-unset ${isOpened ? "border-bottom-selected" : "invisible-border-bottom-3"}`}
                fullWidth
            >{tabTitle}</Button>
        </p>
    )
}

export default TabItem;