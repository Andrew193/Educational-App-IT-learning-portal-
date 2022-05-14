import {Typography} from "@material-ui/core";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import {useMemo} from "react";

function getUserRoleConfig(role) {
    return {
        guest: {
            image: <PersonIcon className={"margin-right-5"}/>,
        },
        admin: {
            image: <WorkspacePremiumIcon className={"margin-right-5"} style={{color: "rgb(251 137 36)"}}/>,
            color: "rgb(251 137 36)"
        },
        student: {
            image: <SchoolIcon className={"margin-right-5"} style={{color: "#3f51b5"}}/>,
            color: "#3f51b5"
        }
    }[role]
}

function UserInformationPart2(props) {
    const {
        role
    } = props;


    const userRoleConfig = useMemo(() => getUserRoleConfig(role), [role]);

    return (
        <div
            className={"text-left margin-left-20"}
        >
            <div
                className={"margin-top-10"}
            >
                <Typography
                    className={"d-flex align-items-center"}
                >
                        <span
                            className={"margin-right-10 text-bold"}
                        >Role:</span>
                    {userRoleConfig?.image}
                    <span style={{color: userRoleConfig?.color}}>{role}</span>
                </Typography>
            </div>
        </div>
    )
}

export default UserInformationPart2;