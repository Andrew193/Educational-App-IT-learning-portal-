import {ButtonGroup} from "@mui/material";


function BtnGroup(props) {
    const {
        children
    } = props;

    return (
        <ButtonGroup disableElevation variant="outlined">
            {children}
        </ButtonGroup>
    )
}

export default BtnGroup;