import {Box, Button} from "@material-ui/core";
import CsvDownload from 'react-json-to-csv'
import {USERS_PAGE} from "../App";
import {useHistory} from "react-router-dom";

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
                    className={"margin-right-10"}
                >
                    Редактировать профиль
                </Button>
                : <Button
                    variant={"outlined"}
                    className={"margin-right-10"}
                    onClick={() => history.push(USERS_PAGE + `#${userInformation?.usergroup}`)}
                >
                    Назад
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