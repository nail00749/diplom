import React, {FC, useEffect} from 'react'
import {Avatar, Box, Button, Typography} from "@mui/material";
import {useTypedSelector} from "../hooks/redux";
import {useGetMeDataQuery} from "../services/userAPI";


const Profile: FC = () => {
    const {user} = useTypedSelector(state => state.userReducer)
    useGetMeDataQuery('')
    useEffect(() => {

    }, [])


    return (
        <Box
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Avatar
                alt = 'Remy Sharp'
                src = 'https://avatars.githubusercontent.com/u/71979155?v=4'
                sx = {{
                    width: 250,
                    height: 250
                }}
            />
            {
                user &&
				<Box
					sx = {{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%'
                    }}
                >
					<Box
						ml = {4}
                        my={2}
                        alignSelf = 'flex-start'
					>
						<Typography
							variant = 'h6'
						>
                            {user.email}
						</Typography>
					</Box>
                    <Box>
                        <Button
                            fullWidth
                            variant = 'outlined'
                        >
                            Edit profile
                        </Button>
                    </Box>
				</Box>

            }
        </Box>
    )
}

export default Profile
