import React, {ReactElement, useState} from "react";
import './SigninPage.css';
import logo from '../../assets/cau_logo.png';
import {Button, CircularProgress, SxProps, TextField, Theme} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import appConfig from "../../config/appConfig";
import CheckIcon from '@mui/icons-material/Check';
import {EmailUtils} from "../../utils/email/EmailUtils";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../store/auth/signin/SignInActions";
import {AppDispatch, RootState} from "../../store";

const buttonSx: SxProps<Theme> = {
    borderRadius: '0.5rem',
    width: '100%',
    height: '3rem',
    fontSize: '1rem',
    fontWeight: '700',
    padding: '0px',
}

const textFieldSx: SxProps<Theme> = {
    width: '100%',
    height: '2rem',
    display: 'flex',
    input: {
        padding: '0.8em'
    }
}

const SigninPage = (): ReactElement => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();


    const isLoading = useSelector((state: RootState) => state.signIn.loading);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const loginButtonClicked = async () => {
        const isValid = EmailUtils.isValidEmail(email) && password.length > 0;

        if (!isValid) {
            setShowErrorMessage(true);
            return;
        }

        dispatch(signIn({email, password}))
            .unwrap()
            .then((response) => {
                if (response.result) {
                    navigate(appConfig.pageUrl.myPage); // 로그인 성공 후 이동할 경로
                }
            });
    }

    const emailChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const passwordChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const signupButtonClicked = () => {
        navigate(appConfig.pageUrl.signUp);
    }

    return (
        <div className='container'>
            <section className='logo-section'>
                중앙대학교 학과/학부 공지 알리미
            </section>

            <section className='input-section'>
                <div className='input-title'>
                    이메일
                </div>
                <TextField variant="outlined" type='email'
                           InputLabelProps={{shrink: false}} label=""
                           sx={{...textFieldSx}}
                           value={email}
                           onChange={emailChanged}
                />
            </section>

            <section className='input-section'>
                <div className='input-title'>
                    비밀번호
                </div>
                <TextField type='password' variant="outlined"
                           InputLabelProps={{shrink: false}} label=""
                           sx={{...textFieldSx}}
                           value={password}
                           onChange={passwordChanged}
                />

            </section>

            <section className='button-section'>
                {showErrorMessage && (
                    <div className='error-message'>
                        이메일과 비밀번호를 확인해주세요.
                    </div>
                )}
                <Button sx={{...buttonSx}} variant='contained' disableElevation startIcon={
                    isLoading ? <CircularProgress size={20} sx={{color: 'white'}}/> : <CheckIcon/>
                }
                        onClick={loginButtonClicked}>
                    로그인
                </Button>
                <div className='signup-section'>
                    <a className='signup-comment'>아직 회원이 아니신가요?</a>
                    <a className='signup-button' onClick={signupButtonClicked}>회원가입</a>
                </div>
            </section>

        </div>
    );
}


export default SigninPage;