import {Typography} from "@material-ui/core";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import EmailIcon from "@mui/icons-material/Email";
import {USERS_PAGE} from "../App";
import GroupIcon from "@mui/icons-material/Group";
import {useHistory} from "react-router-dom";
import {notify, SEARCH_START} from "../vars";


function UserInformationPart1(props) {
    const {
        username,
        surname,
        login,
        usergroup,
        userId
    } = props;
    const history = useHistory();

    const redirectToSelectedGroup = () => {
        history.push(USERS_PAGE + `#${usergroup}`)
    }

    return (
        <div
            className={"text-left margin-left-20"}
        >
            <div>
                <Typography
                    className={"text-bold"}
                >{surname} {username}</Typography>
            </div>
            <div
                className={"margin-top-10"}
            >
                <Typography
                    className={"d-flex align-items-center"}
                >
                        <span
                            className={"margin-right-10 text-bold"}
                        >ID:</span>
                    <Grid3x3Icon
                        className={"margin-right-5"}
                    />{userId}
                </Typography>
            </div>
            <div
                className={"margin-top-10"}
            >
                <Typography
                    className={"d-flex align-items-center cursor-pointer"}
                >
                        <span
                            className={"margin-right-10 text-bold"}
                        >Email:</span>
                    <EmailIcon
                        className={"margin-right-5"}
                    />
                    <a
                        className={"highlight"}
                        href={`mailto:${login}`}
                    >
                        {login}
                    </a>
                </Typography>
            </div>
            <div
                className={"margin-top-10"}
            >
                <Typography
                    className={"d-flex align-items-center cursor-pointer"}
                    onClick={redirectToSelectedGroup}
                >
                        <span
                            className={"margin-right-10 text-bold"}
                        >Group:</span>
                    <GroupIcon
                        className={"margin-right-5"}
                    />
                    <span
                        className={"highlight"}
                    >
                        {usergroup}
                    </span>
                </Typography>
            </div>
        </div>
    )
}

export default UserInformationPart1;