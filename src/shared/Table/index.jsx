import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import MoreIcon from '../../assets/icons/moreIcon.svg'


export default function MuiTable({ columns, data, actionMenu = [] }) {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState({})
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleMoreMenu = (event, currentRow) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(currentRow)
    }

    const handleMenuEvent = (clickEvent) => {
        clickEvent && clickEvent(selectedRow)
        setAnchorEl(null);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const visibleRows = React.useMemo(
        () =>
            stableSort(data, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage],
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };

    const MoreMenu = () => {
        return (
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    actionMenu.map((menu, index) => <MenuItem key={index} onClick={() => handleMenuEvent(menu.onClickEvent)}>{menu.name}</MenuItem>)
                }

            </Menu>
        )
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => (
                                <TableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, background: 'rgba(217, 228, 242, 1)' }}
                                    sortDirection={orderBy === column.id ? order : false}
                                >
                                    {/* {column.label} */}
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={orderBy === column.id ? order : 'asc'}
                                        onClick={createSortHandler(column.id)}
                                    >
                                        {column.label}
                                        {orderBy === column.id ? (
                                            <Box component="span" sx={visuallyHidden}>
                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                            </Box>
                                        ) : null}
                                    </TableSortLabel>
                                </TableCell>
                            ))}
                            {
                                actionMenu.length ?
                                    <TableCell

                                        style={{ minWidth: 0, background: 'rgba(217, 228, 242, 1)' }}
                                    >
                                        Action
                                    </TableCell>
                                    : null
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visibleRows.map((row, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                    {columns.map((column) => {
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {row[column.id]}
                                            </TableCell>
                                        );
                                    })}
                                    {
                                        actionMenu.length ?
                                            <>
                                                <TableCell minWidth={10} >
                                                    <div className="pt-1 cursor-pointer" style={{ marginLeft: 0 }} onClick={(event) => handleMoreMenu(event, row)}>
                                                        <img src={MoreIcon} alt="MoreIcon" />
                                                    </div>
                                                </TableCell>
                                                <MoreMenu />
                                            </>
                                            : null
                                    }
                                </TableRow>

                            );
                        })}

                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}