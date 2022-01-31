import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {useHistory} from "react-router-dom";
import ListItemText from "@material-ui/core/ListItemText";
import {v4 as uuidv4} from 'uuid';
import React from "react";

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
                >
                    <ListItemIcon>{element.icon}</ListItemIcon>
                    <ListItemText primary={element.text}/>
                </ListItem>
            ))}
        </List>
    )
}

export default ContainerList;