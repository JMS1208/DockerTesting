import React from 'react';
import {Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import './App.css';
import config from "./config/config";
import RootPage from "./pages/root/RootPage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import SigninPage from "./pages/signin/SigninPage";
import SignupPage from "./pages/signup/SignupPage";
import MyPage from './pages/my/MyPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0078FF'
        },
        secondary: {
            main: '#515151'
        },
        error: {
            main: '#FF3D00'
        }
    },

});

function App() {

    return (
        //React Router v6
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route path={config.pageUrl.root} element={<RootPage/>} index/>
                    <Route path={config.pageUrl.signIn} element={<SigninPage/>}/>
                    <Route path={config.pageUrl.signUp} element={<SignupPage/>}/>
                    <Route path={config.pageUrl.myPage} element={<MyPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    );
}

export default App;
