import React, { useState } from "react";
import axios from "axios";
import { saveToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Link 컴포넌트를 import
import DiningLayout from "../layouts/DiningLayout";
import "../css/Login.css";

const Login = () => {
    const [mem_id, setMem_id] = useState("");
    const [mem_pw, setMem_pw] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:18080/api/login", {
                mem_id: mem_id,
                mem_pw: mem_pw,
            });

            if (response.data) {
                saveToken(response.headers["authorization"]);
                alert("로그인 성공!");
                navigate("/"); // 메인 페이지로 이동
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert("로그인 실패: 아이디 또는 비밀번호가 잘못되었습니다.");
            } else {
                alert("로그인 실패: 서버와의 통신 중 오류가 발생했습니다.");
            }
            console.error("백엔드 연결 에러", err);
        }
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
                    <button type="button" className="signup-button">
                        카카오 아이디로 로그인
                    </button>
                    <button type="button" className="signup-button">
                        구글계정으로 로그인
                    </button>
                </div>
            </form>
        </DiningLayout>
    );
};

export default Login;