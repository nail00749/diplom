import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    InputAdornment,
    FormControl,
    OutlinedInput,
    IconButton,
    InputLabel, Collapse, Alert
} from "@mui/material";
import {AccountCircle, VisibilityOff, Visibility} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import {userAPI} from "../services/userAPI";
import {useTypedSelector} from "../hooks/redux";

type FormProps = {
    setIsLogin: () => void
}

const AuthForm: FC<FormProps> = (props) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [login, {isLoading, isError}] = userAPI.useLoginMutation()
    const {error} = useTypedSelector(state => state.userReducer)

    const handlerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //todo
        const data = new FormData()
        data.append('username', username)
        data.append('password', password)
        await login(data)
        //console.log(error)
    }

    const handlerShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handlerMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <>
            <form
                onSubmit = {sendData}
            >
                <Box
                    mt = {3}
                    mb = {3}
                >
                    <FormControl>
                        <InputLabel htmlFor = "outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            id = "outlined-adornment-email"
                            type = {'text'}
                            value = {username}
                            onChange = {handlerLogin}
                            endAdornment = {
                                <InputAdornment
                                    position = "end"
                                    sx = {{
                                        marginLeft: '13px'
                                    }}
                                >
                                    <AccountCircle/>
                                </InputAdornment>
                            }
                            label = "email"
                            autoComplete = {'username'}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <FormControl>
                        <InputLabel htmlFor = "outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id = "outlined-adornment-password"
                            type = {showPassword ? 'text' : 'password'}
                            value = {password}
                            onChange = {handlerPassword}
                            endAdornment = {
                                <InputAdornment position = "end">
                                    <IconButton
                                        aria-label = "toggle password visibility"
                                        onClick = {handlerShowPassword}
                                        onMouseDown = {handlerMouseDown}
                                        edge = "end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label = "Password"
                            autoComplete = {'current-password'}
                        />
                    </FormControl>
                </Box>
                <Box
                    mt = {3}
                    mb = {1}
                    display = 'flex'
                    justifyContent = 'center'
                >
                    <LoadingButton
                        loading = {isLoading}
                        type = 'submit'
                        variant = 'contained'
                    >
                        Auth
                    </LoadingButton>

                </Box>
            </form>
            <Box
                display = 'flex'
                justifyContent = 'center'
            >
                <Button
                    onClick = {() => {
                        props.setIsLogin()
                    }}
                    variant = 'outlined'
                >
                    {'Sign up'}
                </Button>
            </Box>
            {
                isError &&
				<Collapse
					in = {true}
					sx = {{
                        position: 'fixed',
                        bottom: 50
                    }}
				>
					<Alert
						severity = 'error'
					>
                        {error}
					</Alert>
				</Collapse>
            }
        </>

    );
};

export default AuthForm;
