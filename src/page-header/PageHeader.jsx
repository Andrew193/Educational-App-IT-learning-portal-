import React, {useState} from "react";
import {AppBar, Box, Divider, Drawer, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from "clsx";
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import ContainerList from "../components/list/List";

const sidebarItems = [
    {
        text: 'Dashboard',
        path: "/",
        icon: <HomeIcon/>
    },
    {
        text: 'Users',
        path: "/users",
        icon: <GroupIcon/>
    },
    {
        text: 'Admin Panel',
        path: "/admin_panel",
        icon:<AdminPanelSettingsIcon />
    }
];

function PageHeader(props) {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerOpen = () => setOpen(true);
    const handleMenu = (event) => {
        setAnchorEl((state) => !!state ? null : event.currentTarget);
    }
    const handleDrawerClose = () => setOpen(false);

    const {
        children
    } = props;

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
                                <MenuItem onClick={handleMenu}>Profile</MenuItem>
                                <MenuItem onClick={handleMenu}>Logout</MenuItem>
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
                <div className={"header_toolbar"}>
                    <IconButton onClick={handleDrawerClose}>
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