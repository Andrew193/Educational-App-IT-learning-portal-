import HOCs from "../HOCs";
import UserAvatarLine from "./UserAvatarLine";
import {Container} from "@material-ui/core";


function UserPageContainer() {


    return (
        <Container>
            <UserAvatarLine />
        </Container>
    )
}

export default HOCs.withHeader(UserPageContainer);