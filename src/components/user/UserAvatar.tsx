import React, {FC, useState} from 'react'
import {Avatar, Box, IconButton} from "@mui/material";
import {PhotoCamera} from "@mui/icons-material";
import {styled} from '@mui/material/styles';
import {useUpdateAvatarMutation} from "../../services/userAPI";
import {useAppSelector} from "../../hooks/redux";
import {BaseURL} from "../../config";

const Input = styled('input')({
    display: 'none',
});

const UserAvatar: FC = () => {
    const [focus, setFocus] = useState(false);
    const [update] = useUpdateAvatarMutation()
    const {user} = useAppSelector(state => state.userReducer)

    const handlerFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const data = new FormData()
            data.append('file', e.target.files[0])
            await update(data)
        }
    }


    return (
        <Box
            onMouseEnter = {() => setFocus(true)}
            onMouseLeave = {() => setFocus(false)}
            position = 'relative'
        >
            <Avatar
                alt = 'Remy Sharp'
                src = {BaseURL + user!.avatar_path}
                sx = {{
                    width: 200,
                    height: 200,
                    filter: focus ? 'grayscale(0.9) blur(1px)' : null
                }}
            />
            {
                focus &&
				<label
					htmlFor = "icon-button-file"
					style = {{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
				>
					<Input
						accept = "image/*"
						id = "icon-button-file"
						type = "file"
						onChange = {handlerFile}
					/>
					<IconButton
						color = "primary"
						aria-label = "upload picture"
						component = "span"
					>
						<PhotoCamera/>
					</IconButton>
				</label>
            }

        </Box>
    )
}

export default UserAvatar
