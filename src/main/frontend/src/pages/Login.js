import React, { useState } from "react";
import axios from "axios";
import {saveToken} from "../utils/auth";
import {Link, useNavigate} from "react-router-dom";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Login.css";
import alert from 'sweetalert2';
import {jwtDecode} from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const [mem_id, setMem_id] = useState("");
    const [mem_pw, setMem_pw] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:18080/api/login", {
                mem_id,
                mem_pw,
            });

            const token = response.headers["authorization"];
            if (token) {
                const cleanToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
                saveToken(cleanToken); // 토큰 저장

                const decoded = jwtDecode(cleanToken); // 토큰 디코딩
                console.log("Decoded JWT:", decoded); // 디버깅용

                window.dispatchEvent(new Event("login")); // 로그인 이벤트
                await alert.fire({
                    icon: "success",
                    title: "로그인 성공!",
                    text: "다이닝픽 회원님 환영합니다.",
                    confirmButtonText: '확인',
                });
                navigate("/");
            }
        } catch (err) {
            console.error(err);
            const errorMessage =
                err.response?.status === 401
                    ? "아이디 또는 비밀번호가 잘못되었습니다."
                    : "서버와의 통신 중 오류가 발생했습니다.";
            await alert.fire({
                icon: "error",
                title: "로그인 실패",
                text: errorMessage,
            });
        }
    };

    const kakaoLogin = () => {
        const REST_API_KEY = '키값 필요함';
        const REDIRECT_URI = 'http://localhost:18080/kakao';
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    };

    return (
        <DiningLayout>
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>로그인</h1>
                <input
                    className="input-field"
                    type="text"
                    id="id"
                    value={mem_id}
                    onChange={(e) => setMem_id(e.target.value)}
                    placeholder="아이디"
                />
                <input
                    className="input-field"
                    type="password"
                    value={mem_pw}
                    onChange={(e) => setMem_pw(e.target.value)}
                    placeholder="비밀번호"
                />
                <div className="saveIdlabel">
                    <input type="checkbox" id="confirm-password" /> 아이디 저장
                </div>
                <button className="login-button">로그인</button>
                <div className="label">
                    <Link to="/Sign_up">회원가입</Link>
                </div>
                <div className="label">
                    <Link to="/find_userinfo">아이디/비밀번호찾기</Link>
                </div>
                <div className="display">
                    <button type="button" className="kakao_btn" onClick={kakaoLogin}>
                        <img src={'/images/login/kakao_login.png'} className="kakao_auth" />
                    </button>
                </div>
            </form>
        </DiningLayout>
    );
};

export default Login;