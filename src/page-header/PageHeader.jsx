import React, {useState} from "react";
import {AppBar, Box, Divider, Drawer, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BuildIcon from '@mui/icons-material/Build';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

import ContainerList from "../components/list/List";
import {useHistory} from "react-router-dom";
import {Pages, USER_INFO} from "../vars";
import {useDispatch} from "react-redux";
import {setIsAuth} from "../app/authReducer";
import {removeValueFromLocalStorage} from "../localStorageService";
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

const sidebarItems = [
    {
        text: 'Dashboard',
        path: Pages.BASE,
        icon: <HomeIcon/>
    },
    {
        text: 'Users',
        path: Pages.USERS,
        icon: <GroupIcon/>
    },
    {
        text: 'Admin Panel',
        path: Pages.ADMIN_PANEL,
        icon: <AdminPanelSettingsIcon/>
    },
    {
        text: 'Simple editor',
        path: Pages.EDITOR,
        icon: <HomeRepairServiceIcon/>
    },
    {
        text: 'IDE',
        path: Pages.IDE,
        icon: <BuildIcon/>
    }
];

function PageHeader(props) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDrawerOpen = () => setOpen(true);
    const handleMenu = (event) => {
        setAnchorEl((state) => !!state ? null : event.currentTarget);
    }
    const handleDrawerClose = () => setOpen(false);

    const {
        children
    } = props;


    const redirectToProfile = () => {
        handleMenu();
        history.push(Pages.USER)
    }

    const logOut = () => {
        handleMenu();
        removeValueFromLocalStorage(USER_INFO);
        dispatch(setIsAuth({
            isOk: false
        }));
    }

    return (
        <div className={"header_root"}>
            <AppBar
                position="fixed"
                className={clsx("header_appBar", {
                    ["header_appBarShift"]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx("header_menuButton", {
                            ["header_hide"]: open,
                        })}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Box
                        ml={3}
                    >
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle fontSize="large"/>
                            <Menu
                                id="menu-appbar"
                                MenuListProps={{
                                    'aria-labelledby': 'fade-button',
                                }}
                                anchorEl={anchorEl}
                                open={!!anchorEl}
                            >
                                <MenuItem
                                    className={"highlight"}
                                    onClick={redirectToProfile}
                                >
                                    <PersonIcon
                                        className={"margin-right-5"}
                                    />
                                    <span>Profile</span>
                                </MenuItem>
                                <MenuItem
                                    className={"highlight"}
                                    onClick={logOut}
                                >
                                    <LogoutIcon
                                        className={"margin-right-5"}
                                    />
                                    <span>Logout</span>
                                </MenuItem>
                            </Menu>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx("header_drawer", {
                    ["header_drawerOpen"]: open,
                    ["header_drawerClose"]: !open,
                })}
                classes={{
                    paper: clsx({
                        ["header_drawerOpen"]: open,
                        ["header_drawerClose"]: !open,
                    }),
                }}
            >
                <div className={"header_toolbar d-flex align-items-center justify-content-space-between"}>
                    Navbar
                    <IconButton
                        onClick={handleDrawerClose}
                        className={"border-50pr highlight"}
                    >
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <ContainerList sidebarItems={sidebarItems}/>
            </Drawer>
            <main className={"header_content"}>
                <div className={"header_toolbar"}/>
                {children}
            </main>
        </div>
    )
}

export default PageHeader;