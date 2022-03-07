import React, {FC, useState} from 'react';
import {Link} from 'react-router-dom'
import {Box, SwipeableDrawer, Button, List, ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import {linksNavigationUser, linksNavigationAdmin} from "../router/router";
import SwitchToggleTheme from "./SwitchToggleTheme";

const NavigationMenu: FC = () => {
    const [state, setState] = useState<boolean>(false);
    const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setState(open);
    };

    return (
        <Box>
            <React.Fragment>
                <Button onClick = {toggleDrawer(true)}><DehazeIcon/></Button>
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
                                            onClick = {() => setSelectedLinkIndex(index)}
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
                                linksNavigationAdmin.map((item, index) =>
                                    <Link
                                        key = {item.text}
                                        to = {item.link}
                                    >
                                        <ListItemButton
                                            selected = {selectedLinkIndex === index + linksNavigationUser.length}
                                            onClick = {() => setSelectedLinkIndex(index+linksNavigationUser.length)}
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
            </React.Fragment>
        </Box>
    );
}

export default NavigationMenu;
