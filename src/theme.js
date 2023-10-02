import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#fdb813',
        },
        secondary: {
            main: '#d9dbdb',
        },
        warning: {
            main: '#0470a6',
        },
        background: {
            default: '#fafafa',
            paper: '#d9d7d7',
        },
        error: {
            main: '#f44336',
        },
        info: {
            main: 'rgba(162, 250, 163, 0.5)',
        }
    },
});

export default theme;

