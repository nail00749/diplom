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
import {useRegisterMutation} from "../services/userAPI";
import LoadingButton from "@mui/lab/LoadingButton";
import RegisterSuccess from "./modals/RegisterSuccess";

interface FormProps {
    setIsLogin: () => void
}

const RegisterForm: FC<FormProps> = ({setIsLogin}) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isOpenSuccess, setIsOpenSuccess] = useState(false);

    const [register, {isLoading, isError}] = useRegisterMutation()

    const handlerLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handlerPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            email: username,
            password
        }
        await register(data)
        setIsOpenSuccess(true)
        //todo data error
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
                    <LoadingButton
                        loading = {isLoading}
                        variant = {'contained'}
                        type = 'submit'
                    >
                        Register
                    </LoadingButton>
                </Box>
            </form>
            <Box
                display = 'flex'
                justifyContent = 'center'
            >
                <Button
                    variant = 'outlined'
                    onClick = {() => {
                        setIsLogin()
                    }}
                >
                    {'Log in'}
                </Button>
            </Box>
            <RegisterSuccess
                open = {isOpenSuccess}
                setClose = {setIsOpenSuccess}
                setPageLogin = {setIsLogin}
            />
        </>
    );
};

export default RegisterForm;
