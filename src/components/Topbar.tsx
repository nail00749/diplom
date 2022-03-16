import React, {FC, useState} from 'react'
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import NavigationMenu from "./NavigationMenu";
import {AccountCircle} from "@mui/icons-material";
import {useAppDispatch} from "../hooks/redux";
import {logOut} from "../store/reducers/user/UserSlice";

const Topbar: FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const dispatch = useAppDispatch()

    const handlerOpenMenu = (e: React.MouseEvent<HTMLElement>) => setAnchorElUser(e.currentTarget)


    const handleCloseMenu = () => setAnchorElUser(null)


    const handlerLogOut = () => dispatch(logOut())


    return (
        <AppBar
            position = 'static'
        >
            <Toolbar>
                <NavigationMenu/>
                {
                    //todo
                    <Box
                        sx = {{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%'
                        }}

                    >
                        <Tooltip title = {'open'}>
                            <IconButton
                                onClick = {handlerOpenMenu}
                            >
                                <AccountCircle/>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx = {{
                                mt: '30px'
                            }}
                            anchorEl = {anchorElUser}
                            anchorOrigin = {{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin = {{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open = {Boolean(anchorElUser)}
                            onClose = {handleCloseMenu}
                        >
                            <MenuItem
                                onClick = {handlerLogOut}
                            >
                                <Typography>Log out</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                }
            </Toolbar>
        </AppBar>

    )
}

export default Topbar
