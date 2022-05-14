import {Box} from "@material-ui/core";
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
            <UserInformationPart2
                role={userInformation?.data?.role}
            />
        </Box>
    )
}

export default UserAvatarLine;