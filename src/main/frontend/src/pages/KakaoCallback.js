import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DiningLayout from "../layouts/DiningLayout";

const KakaoCallback = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const authorizationCode = searchParams.get('code');

        if (authorizationCode) {
            // 백엔드로 인가 코드 전달
            fetch('/api/authkakao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: authorizationCode }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // 로그인 성공 처리
                        navigate('/kakaosucc');
                    } else {
                        // 로그인 실패 처리
                        navigate('/login');
                    }
                })
                .catch(error => {
                    console.error('Error during authentication:', error);
                    navigate('/login');
                });
        }
    }, [location.search, navigate]);

    return (
        <DiningLayout>
            <div>
                로그인 중...
            </div>
        </DiningLayout>
    );
};

export default KakaoCallback;
