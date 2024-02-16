import {ReactElement} from "react";
import './RootPage.css';
import logo from '../../assets/cau_logo.png';
import {Button, Stack, SxProps, Theme} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import appConfig from "../../config/appConfig";

const buttonSx: SxProps<Theme> = {
    borderRadius: '0.5rem',
    width: '100%',
    maxWidth: '50vw',
    height: '3em',
    fontSize: '1rem',
    fontWeight: '700',
    margin: '0.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const RootPage = (): ReactElement => {

    const navigate = useNavigate();

    const loginButtonClicked = () => {
        navigate(appConfig.pageUrl.signIn);
    }

    const signUpButtonClicked = () => {
        navigate(appConfig.pageUrl.signUp);
    }

    return (
        <div className='container'>
            <section className='logo-section' >
                중앙대학교 학과/학부 공지 알리미
            </section>

            <section className='description-section'>
                <div>
                    <p>[ 서비스 안내 ]</p>
                </div>
                <div>
                    1. 이 서비스는 중앙대학교 학과 또는 학부의 공식 홈페이지의 공지사항 게시글이 올라온 경우 이메일로 알림을 보내주는 서비스 입니다.
                    <br/>- 현재 이용 가능: 소프트웨어학부, 경영학부, 간호학과, 기계공학부, 건축학부, 융합공학부, 첨단소재공학과, 화학신소재공학부, 공공인재학부
                </div>
                <div>
                    2. 이메일 등록 후 누구나 이용 가능한 서비스 입니다.
                </div>
                <div>
                    3. 구독 기간동안 인증이 완료된 이메일을 보관하게 됩니다. 회원탈퇴시 이메일을 영구 삭제합니다.
                </div>
                <div>
                    4. 무료 서비스이며 학교의 공식 서비스가 아닙니다.
                </div>
            </section>

            <Stack direction='row'>
                <Button sx={{...buttonSx}} variant='contained' disableElevation onClick={loginButtonClicked}>
                    로그인
                </Button>
                <Button sx={{...buttonSx}} variant='outlined' onClick={signUpButtonClicked}>
                    회원가입
                </Button>
            </Stack>

        </div>
    );
}



export default RootPage;