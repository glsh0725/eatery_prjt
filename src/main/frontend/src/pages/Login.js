import React from "react";
import { Link } from "react-router-dom";  // Link 컴포넌트를 import
import DiningLayout from "../layouts/DiningLayout";
import "../css/Login.css";

const Login = () => {
    return (
        <DiningLayout>
            <form className="login-form">
                <h1>로그인</h1>
                <input className="input-field" type="text" id="id" placeholder="아이디" />
                <input className="input-field" type="password" id="password" placeholder="비밀번호"/>
                <div className="saveIdlabel">
                    <input type="checkbox" id="confirm-password"/> 아이디 저장
                </div>
                <button className="login-button">로그인</button>
                <div className="label">
                    <Link to="/Sign_up">회원가입</Link>
                </div>

                <div className="label">
                    <Link to="/find_userinfo">아이디/비밀번호찾기</Link>
                </div>
                <div className="display">
                    <button type="submit" className="signup-button">
                        카카오 아이디로 로그인
                    </button>
                    <button type="submit" className="signup-button">
                        구글계정으로 로그인
                    </button>
                </div>
            </form>
        </DiningLayout>
    );
};
export default Login;
