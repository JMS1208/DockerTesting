import {ReactElement, useEffect, useState} from "react";
import './SignupPage.css';
import {Box, Button, Checkbox, Container, FormControlLabel, Stack, TextField} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import {
    DepartmentContentSx,
    EmailAtSx,
    EmailDomainTextFieldSx,
    EmailNameTextFieldSx,
    EmailVerifyButtonSx,
    PasswordTextFieldSx, SendCodeButtonSx
} from "./SignupSx";
import {PolicyContent} from "./PolicyContent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {checkEmailAction} from "../../store/auth/signup/CheckEmailActions";
import {verifyEmailCodeAction, VerifyEmailCodeResponseDto} from "../../store/auth/signup/VerifyEmailCodeActions";
import {sendEmailCodeAction} from "../../store/auth/signup/SendEmailCodeActions";
import config from "../../config/config";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {DepartmentChip} from "./DepartmentChip";
import signUp from "../../store/auth/signup/SignUp";
import { signUpAction } from "../../store/auth/signup/SignUpActions";

const SignupPage = (): ReactElement => {

    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();


    const isLoading = useSelector((state: RootState) => state.signUp.loading);

    const emailExisted = useSelector((state: RootState) => state.signUp.emailExisted);

    const verifiedEmail = useSelector((state: RootState) => state.signUp.verifiedEmail);

    const expiredAt = useSelector((state: RootState) => state.signUp.expiredAt);

    // const codeValid = useSelector((state: RootState)=> state.signUp.codeValid);

    const [emailFront, setEmailFront] = useState('');

    const [emailBack, setEmailBack] = useState('');

    const [verifyingEmailFront, setVerifyingEmailFront] = useState('');
    const [verifyingEmailBack, setVerifyingEmailBack] = useState('');

    const [password, setPassword] = useState('');
    const [verifyingPassword, setVerifyingPassword] = useState('');

    const [error, setError] = useState<null | string>(null);

    const [passwordError, setPasswordError] = useState(false);
    const [verifyingPasswordError, setVerifyingPasswordError] = useState(false);


    //이메일 입력되고 사용이 가능할 때
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);


    //이메일 입력되고 이메일 확인까지 동일할 때
    const [compareEmail, setCompareEmail] = useState(false);


    //개인정보 처리방침 동의 체크박스
    const [agree, setAgree] = useState(false);

    const [code, setCode] = useState('');

    //남은 시간 코멘트
    const [remainingTime, setRemainingTime] = useState('');

    //이메일 인증 코드 인증 된 경우
    const [codeValid, setCodeValid] = useState(false);

    //학부들
    const [selectedDepartments, setSelectedDepartments] = useState<Set<number>>(new Set());

    //학부 목록
    const departments = new Map<number, string>([
        [1, "소프트웨어학부"]
    ]);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (departmentId: number) => {
        setSelectedDepartments(prevDepartments => {
            const newDepartments = new Set(prevDepartments);
            if (newDepartments.has(departmentId)) {
                newDepartments.delete(departmentId); // 이미 선택된 학부이면 제거
            } else {
                newDepartments.add(departmentId); // 선택되지 않은 학부이면 추가
            }
            return newDepartments;
        });
        handleClose();
    };

    const sendCodeButtonClicked = () => {
        if(!verifiedEmail) {
            return;
        }
        dispatch(sendEmailCodeAction({email: verifiedEmail}));
    }

    const checkEmailClicked = () => {
        dispatch(checkEmailAction({email: `${emailFront}@${emailBack}`}));
    };

    const verifyCodeClicked = () => {
        if(!verifiedEmail) {
            return;
        }
        dispatch(verifyEmailCodeAction({email: verifiedEmail, code: code}))
            .unwrap()
            .then((responseDto)=>{
                const result = responseDto.result;
                setCodeValid(result);

                if(!result) {
                    alert("인증코드가 올바르지 않습니다.");
                }
            });

    };

    const signUpButtonClicked = () => {
        if(!verifiedEmail) {
            return;
        }

        dispatch(signUpAction({email: verifiedEmail, password: password, departments: Array.from(selectedDepartments)}))
            .unwrap()
            .then((responseData)=> {
                if(responseData.result) {
                    navigate(config.pageUrl.signIn);
                }
            })
            .catch(()=> {
                alert("회원가입 실패");
            });
    };


    useEffect(() => {
        // 남은 시간을 계산하고 포맷팅하는 함수
        const calculateRemainingTime = () => {
            if(codeValid === true) {
                clearInterval(intervalId);
                return;
            }
            if (expiredAt) {
                const now = new Date();
                const expiryDate = new Date(expiredAt);
                const timeDiff = expiryDate.getTime() - now.getTime();

                if (timeDiff > 0) {
                    const minutes = Math.floor(timeDiff / 60000);
                    const seconds = Math.floor((timeDiff % 60000) / 1000);
                    setRemainingTime(`${minutes}분 ${seconds}초`);
                } else {
                    setRemainingTime('시간 만료');
                    clearInterval(intervalId);
                }
            }
        };

        // setInterval로 반복되는 타이머 설정
        const intervalId = setInterval(calculateRemainingTime, 1000);

        // useEffect의 cleanup 함수에서 interval을 정리합니다.
        // 컴포넌트가 언마운트되거나 expiredAt이 변할 때마다 실행됩니다.
        return () => clearInterval(intervalId);
    }, [expiredAt]);

    //이메일 중복 확인 전 검사
    useEffect(()=> {
        setCompareEmail(
            emailFront.length > 0 && emailBack.length > 0 &&
            emailFront === verifyingEmailFront &&
            emailBack === verifyingEmailBack
        );
    }, [emailFront, emailBack, verifyingEmailFront, verifyingEmailBack]);

    // 이메일 유효성 검사
    useEffect(() => {
        setIsEmailValid(
            emailFront === verifyingEmailFront &&
            emailBack === verifyingEmailBack &&
            `${emailFront}@${emailBack}` === verifiedEmail
        );
    }, [emailFront, emailBack, verifyingEmailFront, verifyingEmailBack, verifiedEmail]);

    // 비밀번호 유효성 검사
    useEffect(() => {
        setIsPasswordValid(
            password.length >= 6 &&
            password === verifyingPassword
        );
    }, [password, verifyingPassword]);

    //비밀번호 자리수 검사
    useEffect(() => {
        setPasswordError(
            password.length < 6
        );
    }, [password]);

    //비밀번호 일치 검사
    useEffect(() => {
        setVerifyingPasswordError(
            password !== verifyingPassword
        );
    }, [password, verifyingPassword]);


    return (
        <div className='container'>
            <div className='signup-title'>
                회원가입
            </div>

            <Stack direction='column' spacing={2} sx={{margin: '1em auto'}}>
                <div className='input-section'>
                    <div className='input-title'>
                        이메일
                    </div>
                    <Stack direction='row' spacing={1}>
                        <TextField disabled={codeValid} sx={EmailNameTextFieldSx} value={emailFront}
                                   onChange={(e) => setEmailFront(e.target.value)}/>

                        <Box sx={EmailAtSx}>
                            @
                        </Box>

                        <TextField disabled={codeValid} sx={EmailDomainTextFieldSx} value={emailBack}
                                   onChange={(e) => setEmailBack(e.target.value)}/>

                        <Button disabled={!compareEmail} sx={EmailVerifyButtonSx} onClick={checkEmailClicked}>
                            중복 확인
                        </Button>
                    </Stack>

                    {
                        emailExisted !== null && (
                            emailExisted
                                ? <div className='email-error-comment'>이미 가입된 이메일입니다.</div>
                                : <div className='email-correct-comment'>가입할 수 있는 이메일입니다.</div>
                        )
                    }
                </div>


                <div className='input-section'>
                    <div className='input-title'>
                        이메일 확인
                    </div>
                    <Stack direction='row' spacing={1}>
                        <Stack direction='row' spacing={1} sx={{flex: 4}}>
                            <TextField disabled={codeValid} sx={EmailNameTextFieldSx} value={verifyingEmailFront}
                                       onChange={(e) => setVerifyingEmailFront(e.target.value)}/>

                            <Box sx={EmailAtSx}>
                                @
                            </Box>

                            <TextField disabled={codeValid} sx={EmailDomainTextFieldSx} value={verifyingEmailBack}
                                       onChange={(e) => setVerifyingEmailBack(e.target.value)}/>

                        </Stack>

                        <Box sx={{flex: 1}}/>
                    </Stack>

                </div>

                <div className='input-section'>
                    <div className='input-title'>
                        비밀번호
                    </div>
                    <Stack direction='row' spacing={1}>
                        <TextField disabled={codeValid} type='password' sx={PasswordTextFieldSx} value={password} onChange={(e)=> setPassword(e.target.value)}/>

                        <Box sx={{width: '20%'}}/>
                    </Stack>
                    {
                        passwordError && <div className='password-error-comment'>
                            비밀번호는 6자리 이상 입력해주세요.
                        </div>
                    }
                </div>

                <div className='input-section'>
                    <div className='input-title'>
                        비밀번호 확인
                    </div>
                    <Stack direction='row' spacing={1}>
                        <TextField disabled={codeValid} type='password' sx={PasswordTextFieldSx} value={verifyingPassword} onChange={(e)=> setVerifyingPassword(e.target.value)}/>
                        <Box sx={{width: '20%'}}/>
                    </Stack>
                    {
                        verifyingPasswordError && <div className='password-error-comment'>
                            비밀번호가 일치하지 않습니다.
                        </div>
                    }
                </div>

                <div className='input-section'>
                    <div className='input-title'>
                        알림 받을 학과 / 학부
                    </div>
                    <Stack direction='row' spacing={1}>
                        <div style={{ flex: 1 , overflowX: 'auto', display: 'flex', justifyContent:'start', alignItems:'center' , gap: '0.6em'}}>
                            {Array.from(departments.entries()).map(([id, name]) => (
                                <DepartmentChip key={id} id={id} name={name} clicked={()=> {
                                    handleMenuItemClick(id)
                                }}/>
                            ))}
                        </div>
                        <Box sx={{width: '20%'}}/>
                    </Stack>
                </div>

                <div className='input-section'>
                    <div className='input-title-checkbox'>
                        <div className='input-title'>
                            개인정보 처리방침
                        </div>
                        <FormControlLabel
                            value="start"
                            control={<Checkbox disabled={codeValid} checked={agree} onChange={(e)=> setAgree(e.target.checked)} sx={{'& .MuiSvgIcon-root': {fontSize: '1em'}}}/>}
                            label={
                                <div className='checkbox-comment'>
                                    동의합니다
                                </div>
                            }
                            labelPlacement="start"
                        />
                    </div>
                    <PolicyContent/>
                </div>

                {
                    expiredAt !== null && !codeValid && (
                        <div className='input-section'>
                            <div className='input-title'>
                                인증 코드
                            </div>
                            <Stack direction='row' spacing={1}>
                                <TextField type='number' sx={PasswordTextFieldSx} value={code} onChange={(e)=> setCode(e.target.value)}/>
                                <Button disabled={code.length !== 6} sx={EmailVerifyButtonSx} onClick={verifyCodeClicked}>
                                    확인
                                </Button>
                            </Stack>
                            <Stack direction='row' justifyContent='space-between'>
                                <Stack direction='row' spacing={0.5}>
                                    <div className='not-yet-comment'>
                                        이메일로 인증코드가 오지 않았어요
                                    </div>
                                    <div className='resend-button' onClick={sendCodeButtonClicked}>
                                        재전송
                                    </div>
                                </Stack>
                                <div className='left-time'>
                                    {`남은 시간: ${remainingTime}`}
                                </div>
                            </Stack>
                        </div>
                    )
                }

                {
                    !codeValid && expiredAt === null && isEmailValid && isPasswordValid && agree && <Button sx={SendCodeButtonSx} variant='contained' disableElevation onClick={sendCodeButtonClicked} >
                        인증 코드 전송
                    </Button>
                }
                {
                    codeValid && isEmailValid && isPasswordValid && agree && <Button sx={SendCodeButtonSx} variant='contained' disableElevation onClick={signUpButtonClicked} >
                        회원가입
                    </Button>
                }
            </Stack>


        </div>
    );
}


export default SignupPage;