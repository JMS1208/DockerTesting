import React from 'react';
import {Navigate, Route, Routes, BrowserRouter} from 'react-router-dom';
import './App.css';
import appConfig from "./config/appConfig";
import RootPage from "./pages/root/RootPage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import SigninPage from "./pages/signin/SigninPage";
import SignupPage from "./pages/signup/SignupPage";
import MyPage from './pages/my/MyPage';
import AuthErrorListener from './context/AuthErrorListener';

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
                <AuthErrorListener />
                <Routes>
                    <Route path={appConfig.pageUrl.root} element={<RootPage/>} index/>
                    <Route path={appConfig.pageUrl.signIn} element={<SigninPage/>}/>
                    <Route path={appConfig.pageUrl.signUp} element={<SignupPage/>}/>
                    <Route path={appConfig.pageUrl.myPage} element={<MyPage/>}/>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>

    );
}

export default App;
