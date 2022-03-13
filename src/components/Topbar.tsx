import React, {FC, useState} from 'react'
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography} from "@mui/material";
import NavigationMenu from "./NavigationMenu";
import {AccountCircle} from "@mui/icons-material";
import { useNavigate  } from "react-router-dom";

const Topbar: FC = () => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate ()

    const handlerOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(e.currentTarget)
    }

    const handleCloseMenu = () => {
        setAnchorElUser(null)
    }

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
                                onClick={()=> navigate('/profile')}
                            >
                                <Typography>Profile</Typography>
                            </MenuItem>
                            <MenuItem>
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
