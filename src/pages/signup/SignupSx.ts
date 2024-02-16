import {SxProps, Theme} from "@mui/material";

export const EmailNameTextFieldSx: SxProps<Theme> = {
    flex: 3.5, height: '3rem', input: {
        padding: '0.8em'
    }
}

export const EmailDomainTextFieldSx: SxProps<Theme> = {
    flex: 4.5, height: '3rem', input: {
        padding: '0.8em'
    }
}

export const EmailAtSx: SxProps<Theme> = {
    margin: '0 1em',
    padding: '0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
}

export const EmailVerifyButtonSx: SxProps<Theme> = {
    width: '20%',
    minWidth: '6em',
    height: '3rem',
    color: 'white',
    background: '#515151',
    '&:hover': {
        background: '#9B9B9B'
    },
    '&.Mui-disabled': {
        backgroundColor: 'lightgrey', // 비활성화 상태의 배경색
        color: 'white', // 비활성화 상태의 텍스트 색상
    },
    fontWeight: '700'
}

export const PasswordTextFieldSx: SxProps<Theme> = {
    width: '80%', height: '3rem', input: {
        padding: '0.8em'
    }
}


export const PolicyContentSx: SxProps<Theme> = {
    border: '1px solid #CCC',
    borderRadius: '0.2em',
    padding: '1em',
    maxHeight: '25vh',
    overflowY: 'scroll',
    fontWeight: '600',
    fontSize: '0.9rem',
}

export const DepartmentContentSx: SxProps<Theme> = {
    border: '1px solid #CCC',
    borderRadius: '0.2em',
    padding: '1em',
    fontWeight: '500',
    fontSize: '0.8rem',
    height: '3rem',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    cursor: 'pointer',
    color: 'grey'
}


export const SendCodeButtonSx: SxProps<Theme> = {
    borderRadius: '0.5rem',
    width: '100%',
    height: '3rem',
    fontSize: '1rem',
    fontWeight: '700',
    margin: '0.5em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}