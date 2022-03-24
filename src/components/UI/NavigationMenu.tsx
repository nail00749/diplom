import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom'
import {
    Box,
    SwipeableDrawer,
    List,
    ListItemIcon,
    ListItemText,
    ListItemButton,
    IconButton
} from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import {linksNavigationUser, linksNavigationAdmin} from "../../router/router";
import SwitchToggleTheme from "./SwitchToggleTheme";
import {useGetMeDataQuery} from "../../services/userAPI";

const NavigationMenu: FC = () => {
    const [state, setState] = useState<boolean>(false);
    const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
    const {data: user} = useGetMeDataQuery()

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState(open);
    };

    const handlerIndexActive = (index: number) => () => setSelectedLinkIndex(index)

    return (
        <Box>
            <>
                <IconButton
                    onClick = {toggleDrawer(true)}
                    color = 'default'
                >
                    <DehazeIcon/>
                </IconButton>
                <SwipeableDrawer
                    anchor = 'left'
                    open = {state}
                    onClose = {toggleDrawer(false)}
                    onOpen = {toggleDrawer(true)}
                >
                    <Box
                        sx = {{
                            width: 250,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                        role = "presentation"
                        onClick = {toggleDrawer(false)}
                        onKeyDown = {toggleDrawer(false)}
                    >
                        <List>
                            {
                                linksNavigationUser.map((item, index) =>
                                    <Link
                                        key = {item.text}
                                        to = {item.link}
                                    >
                                        <ListItemButton
                                            selected = {selectedLinkIndex === index}
                                            onClick = {handlerIndexActive(index)}
                                        >
                                            {
                                                item.icon &&
												<ListItemIcon>
													<item.icon/>
												</ListItemIcon>
                                            }
                                            <ListItemText
                                                primary = {item.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                )
                            }
                            {
                                (user && (user.role === 'teacher' || user.role === 'admin')) &&
                                linksNavigationAdmin.map((item, index) =>
                                    <Link
                                        key = {item.text}
                                        to = {item.link}
                                    >
                                        <ListItemButton
                                            selected = {selectedLinkIndex === index + linksNavigationUser.length}
                                            onClick = {handlerIndexActive(index + linksNavigationUser.length)}
                                        >
                                            {
                                                item.icon &&
												<ListItemIcon>
													<item.icon/>
												</ListItemIcon>
                                            }
                                            <ListItemText
                                                primary = {item.text}
                                            />
                                        </ListItemButton>
                                    </Link>
                                )
                            }
                        </List>
                    </Box>
                    <Box
                        sx = {{
                            height: 50
                        }}
                    >
                        <SwitchToggleTheme/>
                    </Box>
                </SwipeableDrawer>
            </>
        </Box>
    );
}

export default NavigationMenu;
