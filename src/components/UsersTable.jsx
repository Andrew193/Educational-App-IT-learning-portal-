import {Table, TableContainer, TableHead, TableRow, Paper, TableBody} from "@mui/material";
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import {styled} from '@mui/material/styles';

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
}));

function UsersTables(props) {
    const {
        rows
    } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Id</StyledTableCell>
                        <StyledTableCell align="center">Группа</StyledTableCell>
                        <StyledTableCell align="center">Имя</StyledTableCell>
                        <StyledTableCell align="center">Фамилия</StyledTableCell>
                        <StyledTableCell align="center">Почта</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell
                                component="th"
                                scope="row"
                                align="center"
                            >
                                {row.id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.data.group}</StyledTableCell>
                            <StyledTableCell align="center">{row.data.name}</StyledTableCell>
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