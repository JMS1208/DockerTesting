
const config = {
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
        fetchUserInfo: '/api/user-info'
    },
    baseUrl: 'http://localhost:8080',
    refreshTokenDuration: 1, //1일
    accessTokenDuration: 1000 * 60 * 60, //1시간
}

export default config;