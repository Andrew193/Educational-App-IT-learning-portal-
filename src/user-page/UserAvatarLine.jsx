import {Box, Typography} from "@material-ui/core";
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import {useHistory} from "react-router-dom";
import {USERS_PAGE} from "../App";
import UserAvatar from "./UserAvatar";
import UserInformationPart1 from "./UserInformationPart1";
import UserInformationPart2 from "./UserInformationPart2";

function UserAvatarLine(props) {
    const {
        userInformation
    } = props;


    return (
        <Box
            className={"d-flex justify-content-space-evenly"}
        >
            <UserAvatar/>
            <UserInformationPart1
                username={userInformation?.data?.username}
                surname={userInformation?.data?.surname}
                login={userInformation?.data?.login}
                usergroup={userInformation?.data?.usergroup}
                userId={userInformation?.id}
            />
            <UserInformationPart2/>
        </Box>
    )
}

export default UserAvatarLine;