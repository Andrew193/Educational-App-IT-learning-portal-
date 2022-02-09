import {Box, Button} from "@material-ui/core";
import CsvDownload from 'react-json-to-csv'
import {USERS_PAGE} from "../App";
import {useHistory} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';

function UserActions(props) {
    const history = useHistory();
    const {
        userInformation,
        userId,
    } = props;

    return (
        <Box
            className={"margin-top-10 d-flex align-items-center justify-content-right"}
        >
            {!userId
                ? <Button
                    variant={"outlined"}
                    className={"margin-right-10 highlight"}
                >
                    <EditIcon
                        className={"margin-right-10"}
                    />
                    <span>Редактировать профиль</span>
                </Button>
                : <Button
                    variant={"outlined"}
                    className={"margin-right-10 highlight"}
                    onClick={() => history.push(USERS_PAGE + `#${userInformation?.usergroup}`)}
                >
                    <ArrowBackIcon
                        className={"margin-right-10"}
                    />
                    <span>Назад</span>
                </Button>
            }

            <CsvDownload
                className={"MuiButtonBase-root MuiButton-root MuiButton-outlined MuiButton-outlinedPrimary"}
                data={[userInformation]}
                filename={`${userInformation?.username}.csv`}
            />
        </Box>
    )
}

export default UserActions;