import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    InputAdornment,
    FormControl,
    OutlinedInput,
    IconButton,
    InputLabel
} from "@mui/material";
import {AccountCircle, VisibilityOff, Visibility} from '@mui/icons-material';

type FormProps = {
    setIsLogin: () => void
}

const RegisterForm: FC<FormProps> = (props) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }

    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const sendData = async () => {
        const data = {
            login,
            password
        }
    }

    const handlerShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    const handlerMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    return (
        <>
            <Box
                mt = {3}
                mb = {3}
            >
                <FormControl>
                    <InputLabel htmlFor = "outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput
                        id = "outlined-adornment-email"
                        type = {'text'}
                        value = {login}
                        onChange = {handlerLogin}
                        endAdornment = {
                            <InputAdornment
                                position = "end"
                                sx={{
                                    marginLeft: '13px'
                                }}
                            >
                                <AccountCircle/>
                            </InputAdornment>
                        }
                        label = "email"
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
                    />
                </FormControl>
            </Box>
            <Box
                mt = {3}
                mb = {1}
                display = 'flex'
                justifyContent = 'center'
            >
                <Button
                    variant = {'contained'}
                >
                    Auth
                </Button>
            </Box>
            <Box
                display = 'flex'
                justifyContent = 'center'
            >
                <Button
                    onClick = {() => {
                        props.setIsLogin()
                    }}
                >
                    {'Log in'}
                </Button>
            </Box>
        </>
    );
};

export default RegisterForm;
