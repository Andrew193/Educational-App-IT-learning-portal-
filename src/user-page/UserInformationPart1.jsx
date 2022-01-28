import {Typography} from "@material-ui/core";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import EmailIcon from "@mui/icons-material/Email";
import {USERS_PAGE} from "../App";
import GroupIcon from "@mui/icons-material/Group";
import {useHistory} from "react-router-dom";


function UserInformationPart1() {
    const history = useHistory();

    return(
        <div
            className={"text-left margin-left-20"}
        >
            <div>
                <Typography
                    className={"text-bold"}
                >User surname here User name here</Typography>
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
                    />432432 4324 32432432423 432 4234 324 343
                </Typography>
            </div>
            <div
                className={"margin-top-10"}
            >
                <Typography
                    className={"d-flex align-items-center"}
                >
                        <span
                            className={"margin-right-10 text-bold"}
                        >Email:</span>
                    <EmailIcon
                        className={"margin-right-5"}
                    /> testemail@gmail.com
                </Typography>
            </div>
            <div
                className={"margin-top-10"}
            >
                <Typography
                    className={"d-flex align-items-center"}
                    onClick={() => {
                        history.push(USERS_PAGE + `#I-219a`)
                    }}
                >
                        <span
                            className={"margin-right-10 text-bold"}
                        >Group:</span>
                    <GroupIcon
                        className={"margin-right-5"}
                    /> i-219a
                </Typography>
            </div>
        </div>
    )
}

export default UserInformationPart1;