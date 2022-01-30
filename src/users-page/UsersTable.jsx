import {Table, TableContainer, TableHead, TableRow, Paper, TableBody} from "@mui/material";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {getUserById} from "./usersPageService";
import {notify, Pages, USER_NOT_FOUND} from "../vars";
import {useHistory} from "react-router-dom";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: '#7e7e7e',
    },
}));

function UsersTables(props) {
    const {
        rows
    } = props;

    const history = useHistory();

    async function redirectToUserProfile(userId) {
        history.push({
            pathname: Pages.USER + `/${userId}`,
        })
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            <span className={"d-flex align-items-center justify-content-center"}>
                                <Grid3x3Icon fontSize={"small"}/>
                                <span className={"margin-left-5"}>Id</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <span className={"d-flex align-items-center justify-content-center"}>
                                <GroupIcon fontSize={"small"}/>
                                <span className={"margin-left-5"}>Группа</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <span
                                className={"d-flex align-items-center justify-content-center"}>
                                <DriveFileRenameOutlineIcon/>
                                <span className={"margin-left-5"}>Имя</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <span
                                className={"d-flex align-items-center justify-content-center"}>
                                <DriveFileRenameOutlineIcon/>
                                <span className={"margin-left-5"}>Фамилия</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                            <span className={"d-flex align-items-center justify-content-center"}>
                                <EmailIcon fontSize={"small"}/>
                                <span className={"margin-left-5"}>Почта</span>
                            </span>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <StyledTableRow
                            key={row.id}
                            onClick={() => {
                                redirectToUserProfile(row.id)
                            }}
                        >
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.data.usergroup}</StyledTableCell>
                            <StyledTableCell align="center">{row.data.username}</StyledTableCell>
                            <StyledTableCell align="center">{row.data.surname}</StyledTableCell>
                            <StyledTableCell align="center">{row.data.login}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersTables;