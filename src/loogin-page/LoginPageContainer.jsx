import {Container, Button, Box} from "@mui/material";
import BtnGroup from "../components/BtnGroup";
import {useState} from "react";
import LoginTab from "./LoginTab";
import RegistrationTab from "./RegistrationTab";


function LoginPageContainer() {
    const [logMode, setLogMode] = useState(true);

    return (
        <Container
            maxWidth="sm"
            className={"margin-top-10"}
        >
            <BtnGroup>
                <Button
                    className={`${logMode ? "back-green" : ""}`}
                    onClick={() => setLogMode(true)}
                >Войти</Button>
                <Button
                    className={`${!logMode ? "back-green" : ""}`}
                    onClick={() => setLogMode(false)}
                >Зарегистрироваться</Button>
            </BtnGroup>
            <Box
                className={"margin-top-10"}
            >
                {logMode ? <LoginTab/> : <RegistrationTab/>}
            </Box>
        </Container>
    )
}

export default LoginPageContainer;