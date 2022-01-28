import {Typography} from "@material-ui/core";
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';

function UserInformationPart2() {

    return(
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
                    <PersonIcon
                        className={"margin-right-5"}
                    />Admin
                </Typography>
            </div>
        </div>
    )
}

export default UserInformationPart2;