import React, {FC} from 'react'
import {Transition} from "./Transition";
import {Box, Dialog, IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {LoadingButton} from "@mui/lab";
import SendIcon from '@mui/icons-material/Send';


interface PassTestProps {
    open: boolean
    onClose: () => void
}

const PassTest: FC<PassTestProps> = ({open, onClose}) => {
    return (
        <Dialog
            open = {open}
            TransitionComponent = {Transition}
            onClose = {onClose}
        >
            <Box
                p = {3}
                px = {5}
            >
                <Box
                    sx = {{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    mb = {2}
                >
                    <IconButton
                        onClick = {onClose}
                        //disabled = {isLoadingCreate || isLoadingUpdate}
                    >
                        <CloseIcon/>
                    </IconButton>
                    <Typography variant = 'h5' component = 'span'>
                        {`Test pass`}
                    </Typography>
                </Box>

                <LoadingButton
                    //loading = {isLoadingCreate || isLoadingUpdate}
                    variant = 'outlined'
                    color = 'success'
                    endIcon = {<SendIcon/>}
                    //onClick = {saveCourse}
                >
                    Send
                </LoadingButton>
            </Box>
        </Dialog>
    )
}

export default PassTest
