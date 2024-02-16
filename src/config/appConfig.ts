
const appConfig = {
    pageUrl: {
        root: '/',
        signIn: '/sign-in',
        signUp: '/sign-up',
        myPage: '/my-page',
    },
    apiUrl: {
        signIn: '/auth-api/sign-in',
        signUp: '/auth-api/sign-up',
        refreshToken: '/auth-api/refresh-token',
        checkEmail: '/auth-api/check-email',
        sendEmailCode: '/auth-api/send-code',
        verifyEmailCode: '/auth-api/verify-code',
        fetchUserInfo: '/api/user-info',
        updateDepartment: '/api/department',
        signOut: '/api/sign-out',
        unregister: '/api/unregister'
    },
    baseUrl: 'https://www.cau-noti.com:8443'
}

export default appConfig;