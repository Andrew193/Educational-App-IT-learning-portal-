import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {useHistory} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import {v4 as uuidv4} from 'uuid';
import React from "react";
import ReactTooltip from "react-tooltip";
import {
    BASE_TOOLTIP_BACKGROUND_COLOR,
    BASE_TOOLTIP_BORDER_COLOR,
    BASE_TOOLTIP_EFFECT,
    BASE_TOOLTIP_TEXT_COLOR
} from "../../vars";

function ContainerList(props) {
    const history = useHistory();
    const {
        sidebarItems
    } = props;

    return (
        <List>
            {sidebarItems.map(element => (
                <ListItem
                    button
                    key={uuidv4()}
                    onClick={() => history.push(element.path)}
                    className={"highlight highlight-back-svg"}
                    data-for={element.dataFor}
                    data-tip={element.dataTip}
                >
                    <ListItemIcon
                        data-for={element.dataFor}
                        data-tip={element.dataTip}
                    >{element.icon}</ListItemIcon>
                    <ListItemText
                        data-for={element.dataFor}
                        data-tip={element.dataTip}
                        primary={element.text}
                    />
                </ListItem>
            ))}
            <ReactTooltip
                id="main"
                className={"tooltip-container-class"}
                border
                borderColor={BASE_TOOLTIP_BORDER_COLOR}
                effect={BASE_TOOLTIP_EFFECT}
                multiline={true}
                textColor={BASE_TOOLTIP_TEXT_COLOR}
                backgroundColor={BASE_TOOLTIP_BACKGROUND_COLOR}
            />
        </List>
    )
}

export default ContainerList;