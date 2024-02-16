// useAuthError.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authEvents } from './events';
import appConfig from "../config/appConfig";

const useAuthError = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleAuthError = (error: string) => {
            console.error(error);
            navigate(appConfig.pageUrl.signIn);
        };

        authEvents.on('authError', handleAuthError);

        return () => {
            authEvents.off('authError', handleAuthError);
        };
    }, [navigate]);
};

export default useAuthError;
