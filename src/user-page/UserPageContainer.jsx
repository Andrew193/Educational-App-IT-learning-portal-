import HOCs from "../HOCs";
import UserAvatar from "./UserAvatar";
import {Container} from "@material-ui/core";


function UserPageContainer() {


    return (
        <Container>
            <UserAvatar />
        </Container>
    )
}

export default HOCs.withHeader(UserPageContainer);