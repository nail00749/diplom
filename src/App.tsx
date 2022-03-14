import React, {useState, useMemo} from 'react';
import AppRouter from "./components/AppRouter";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline, PaletteMode, Box} from "@mui/material";
import { amber, deepOrange, grey } from '@mui/material/colors';

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
});

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                primary: amber,
                divider: amber[200],
                text: {
                    primary: grey[900],
                    secondary: grey[800],
                },
            }
            : {
                // palette values for dark mode
                primary: deepOrange,
                divider: deepOrange[700],
                background: {
                    default: deepOrange[900],
                    paper: deepOrange[900],
                },
                text: {
                    primary: '#fff',
                    secondary: grey[500],
                },
            }),
    },
});


const App = () => {
    return (
        <Box
            sx = {{
                minHeight: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <AppRouter/>
        </Box>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme(getDesignTokens(mode)),
        [mode],
    );

    return (
        <ColorModeContext.Provider value = {colorMode}>
            <CssBaseline
                enableColorScheme
            />
            <ThemeProvider theme = {theme}>
                <App/>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}


//export default App;
