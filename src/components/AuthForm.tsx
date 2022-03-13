import React, {FC, useState} from 'react';
import {
    Box,
    Button,
    InputAdornment,
    FormControl,
    OutlinedInput,
    IconButton,
    InputLabel,
} from "@mui/material";
import {AccountCircle, VisibilityOff, Visibility} from '@mui/icons-material';
import {useDispatch} from "react-redux";
import {fetchAuth} from "../store/reducers/user/ActionCreator";

type FormProps = {
    setIsLogin: () => void
}

const AuthForm: FC<FormProps> = (props) => {
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handlerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }

    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //todo
        const data = {
            login,
            password
        }
        dispatch(fetchAuth())
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
                            value = {login}
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
                        type = 'submit'
                        variant = 'contained'
                    >
                        Auth
                    </Button>

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
        </>

    );
};

export default AuthForm;
