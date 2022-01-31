import {Table, TableContainer, TableHead, TableRow, Paper, TableBody} from "@mui/material";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import {ASC, DESC, notify, Pages, SEARCH_START} from "../vars";
import {useHistory} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import {useEffect, useMemo, useState} from "react";

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
        cursor: 'pointer',
        backgroundColor: '#7e7e7e',
    },
}));

function UsersTables(props) {
    const {
        rows
    } = props;

    const history = useHistory();
    const [users, setUsers] = useState();
    const [orders, serOrders] = useState({
        id: ASC,
        usergroup: ASC,
        username: ASC,
        surname: ASC,
        login: ASC
    })

    async function redirectToUserProfile(userId) {
        notify(SEARCH_START)
        history.push({
            pathname: Pages.USER + `/${userId}`,
        })
    }

    function sortBy(toSort) {
        const newUsers = users.sort((a, b) => {
            if (a[toSort] < b[toSort]) {
                return orders[toSort] === ASC ? -1 : 1
            }
            if (a[toSort] > b[toSort]) {
                return orders[toSort] === ASC ? 1 : -1
            }
            return 0;
        });

        serOrders((orders) => ({
            ...orders,
            [toSort]: orders[toSort] === ASC ? DESC : ASC
        }))

        setUsers(() => [...newUsers])
    }

    const usersList = useMemo(() => users?.map((row) => (
        <StyledTableRow
            key={uuidv4()}
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
    )), [users])

    useEffect(() => {
        if (!users && !!rows) {
            setUsers(() => rows)
        }
    }, [rows])


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell
                            align="center"
                            className={"border-bottom-unset"}
                            onClick={() => {
                                sortBy("id")
                            }}
                        >
                            <span className={"d-flex align-items-center justify-content-center"}>
                                <Grid3x3Icon fontSize={"small"}/>
                                <span className={"margin-left-5"}>Id</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell
                            align="center"
                            className={"border-bottom-unset"}
                            onClick={() => {
                                sortBy("usergroup")
                            }}
                        >
                            <span className={"d-flex align-items-center justify-content-center"}>
                                <GroupIcon fontSize={"small"}/>
                                <span className={"margin-left-5"}>Группа</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell
                            align="center"
                            className={"border-bottom-unset"}
                            onClick={() => {
                                sortBy("username")
                            }}
                        >
                            <span
                                className={"d-flex align-items-center justify-content-center"}>
                                <DriveFileRenameOutlineIcon/>
                                <span className={"margin-left-5"}>Имя</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell
                            align="center"
                            className={"border-bottom-unset"}
                            onClick={() => {
                                sortBy("surname")
                            }}
                        >
                            <span
                                className={"d-flex align-items-center justify-content-center"}>
                                <DriveFileRenameOutlineIcon/>
                                <span className={"margin-left-5"}>Фамилия</span>
                            </span>
                        </StyledTableCell>
                        <StyledTableCell
                            align="center"
                            className={"border-bottom-unset"}
                            onClick={() => {
                                sortBy("login")
                            }}
                        >
                            <span className={"d-flex align-items-center justify-content-center"}>
                                <EmailIcon fontSize={"small"}/>
                                <span className={"margin-left-5"}>Почта</span>
                            </span>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersList}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UsersTables;