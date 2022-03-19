import React, {FC, useState} from 'react'
import {Box, Button, TextField, Typography} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";
import {useGetMeDataQuery, useUpdateMutation} from "../../services/userAPI";
import {LoadingButton} from "@mui/lab";
import UserAvatar from "./UserAvatar";

interface IUserEdit {
    name: string
    surname: string
    telegram: string
}

const Profile: FC = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const [isEdit, setIsEdit] = useState(false);
    const [userData, setUserData] = useState<IUserEdit>({
        name: '',
        surname: '',
        telegram: ''
    });
    useGetMeDataQuery('')
    const [update, {isSuccess, isError, isLoading}] = useUpdateMutation()

    const handlerIsEdit = () => {
        setIsEdit(prev => !prev)
        const data = {
            name: (user && user.name) || '',
            surname: (user && user.surname) || '',
            telegram: (user && user.telegram) || '',
        }
        setUserData(data)
    }

    const handlerData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData(prev => {
            const copy = {...prev}
            copy[e.target.name as keyof IUserEdit] = e.target.value
            return copy
        })
    }

    const handlerUpdate = async () => {
        await update(userData)
        setIsEdit(false)
    };

    const handlerCancel = () => {
        setUserData({
            name: '',
            surname: '',
            telegram: ''
        })
        setIsEdit(false)
    };

    return (
        <Box
            sx = {{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            {
                user &&
				<>
					<UserAvatar/>
					<Box
						sx = {{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%'
                        }}
					>
                        {
                            !isEdit &&
							<>
								<Box
									ml = {4}
									my = {2}
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
										onClick = {handlerIsEdit}
									>
										Edit profile
									</Button>
								</Box>
							</>
                        }
                        {
                            isEdit &&
							<>
								<Box
									my = {3}
								>
									<TextField
										label = 'Name'
										name = 'name'
										onChange = {handlerData}
										value = {userData.name}
									/>
								</Box>
								<Box>
									<TextField
										label = 'Surname'
										name = 'surname'
										onChange = {handlerData}
										value = {userData.surname}
									/>
								</Box>
								<Box
									my = {3}
								>
									<TextField
										label = 'Telegram'
										name = 'telegram'
										onChange = {handlerData}
										value = {userData.telegram}
									/>
								</Box>
								<Box>
									<LoadingButton
										loading = {isLoading}
										color = 'success'
										variant = 'contained'
										sx = {{
                                            mr: 1
                                        }}
										onClick = {handlerUpdate}
									>
										Save
									</LoadingButton>
									<Button
										variant = 'contained'
										onClick = {handlerCancel}
									>
										Cancel
									</Button>
								</Box>
							</>
                        }
					</Box>
				</>
            }
        </Box>
    )
}

export default Profile
