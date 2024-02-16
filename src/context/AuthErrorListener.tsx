// AuthErrorListener.tsx
import React from 'react';
import useAuthError from './useAuthError';

const AuthErrorListener: React.FC = () => {
    useAuthError(); // 인증 오류 처리 훅 사용
    return null; // 시각적으로 아무것도 렌더링하지 않음
};

export default AuthErrorListener;