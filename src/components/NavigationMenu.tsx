import React, {FC, useState} from 'react';
import {
    Box,
    SwipeableDrawer,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DehazeIcon from '@mui/icons-material/Dehaze';

const NavigationMenu: FC = () => {
    const [state, setState] = useState<boolean>(false);

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event && event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }

        setState(open);
    };


    return (
        <div>
            <React.Fragment>
                <Button onClick = {toggleDrawer(true)}><DehazeIcon/></Button>
                <SwipeableDrawer
                    anchor = 'left'
                    open = {state}
                    onClose = {toggleDrawer(false)}
                    onOpen = {toggleDrawer(true)}
                >
                    <Box
                        sx = {{width: 250}}
                        role = "presentation"
                        onClick = {toggleDrawer(false)}
                        onKeyDown = {toggleDrawer(false)}
                    >
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key = {text}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary = {text}/>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}

export default NavigationMenu;
