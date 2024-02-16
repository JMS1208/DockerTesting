import {ReactElement, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {fetchUserInfoAction} from "../../store/mypage/FetchUserInfoActions";
import "./MyPage.css";
import Stack from "@mui/material/Stack";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem
} from "@mui/material";
import {DepartmentKeywords} from "../../store/mypage/MyPage";
import {DepartmentChip} from "../signup/DepartmentChip";
import {updateDepartmentSelectActions} from "../../store/mypage/UpdateDepartmentSelectActions";
import {signOutActions} from "../../store/mypage/SignOutActions";
import appConfig from "../../config/appConfig";
import {unregisterActions} from "../../store/mypage/UnregisterActions";
import * as React from "react";

const MyPage = (): ReactElement => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();

    const departmentKeywordsList = useSelector((state: RootState) => state.myPage.departmentKeywordsList);

    const email = useSelector((state: RootState) => state.myPage.email);

    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchUserInfoAction());
    }, []);

    const signOutButtonClicked = () => {
        dispatch(signOutActions());
        navigate(appConfig.pageUrl.root);
    };


    const departmentClicked = (id: number, selected: boolean) => {
        dispatch(updateDepartmentSelectActions({departmentId: id, select: !selected}));
    };


    const unregisterButtonClicked = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const requestUnregister = () => {
        dispatch(unregisterActions())
            .unwrap()
            .then((response) => {
                setOpen(false);
                navigate(appConfig.pageUrl.root);
            });
    };


    return (
        <div className='container'>
            <div className='logo-title'>
                중앙대 공지 알리미
            </div>
            <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={1} sx={{margin: '3em 0'}}>
                <Stack direction='row' justifyContent='space-between' alignItems='baseline'>
                    <div className='item-title'>
                        이메일
                    </div>
                    <div className='text-button' onClick={signOutButtonClicked}>
                        로그아웃
                    </div>
                </Stack>
                <div className='item-content'>
                    {email}
                </div>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='stretch' spacing={1} sx={{margin: '3em 0'}}>
                <div className='item-title'>
                    알림 받을 학부 설정
                </div>
                <div style={{
                    flex: 1,
                    overflowX: 'auto',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    gap: '0.6em',
                    flexWrap: 'wrap',
                }}>
                    {
                        departmentKeywordsList && departmentKeywordsList.map((departmentKeywords: DepartmentKeywords) => {
                            return (<ListItem key={departmentKeywords.departmentId} sx={{padding: 0}}>
                                <DepartmentChip key={departmentKeywords.departmentId}
                                                id={departmentKeywords.departmentId}
                                                name={departmentKeywords.department}
                                                clicked={() => departmentClicked(departmentKeywords.departmentId, departmentKeywords.selected)}
                                                selected={departmentKeywords.selected}/>
                            </ListItem>);
                        })
                    }
                </div>
            </Stack>

            <div className='unregister-section'>
                <div className='text-button' onClick={unregisterButtonClicked}>
                    회원탈퇴
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle sx={{fontSize: '1.2rem', fontWeight: '800'}}>
                    {"회원 탈퇴 안내"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontSize: '0.9rem', fontWeight: '500'}}>
                        정말 회원 탈퇴를 진행하시겠습니까? 회원정보를 즉시 삭제하며, 더이상 이메일을 발송하지 않습니다.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>아니요</Button>
                    <Button onClick={requestUnregister} >
                        예
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default MyPage;