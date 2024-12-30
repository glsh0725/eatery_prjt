import React from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Login.css";

const login = () => {
    const contextPath = "";
  return (
    <DiningLayout>
        <form class="signup-form">
          <h1>로그인</h1>
          <div class="form-group">
            아이디
            <input type="text" id="id" placeholder="아이디를 입력하세요" />
            비밀번호
            <input
              type="text"
              id="password"
              placeholder="비밀번호를 입력하세요"
            />
            <input type="checkbox" id="confirm-password" /> 아이디 기억
          </div>
          <button class="login-button">로그인</button>
          <div class="form-group">회원가입</div>
          <div class="label">아아디/비밀번호찾기</div>
          <div class="display">
            <button type="submit" class="signup-button">
              카카오 아이디로 로그인
            </button>
            <button type="submit" class="signup-button">
              구글계정으로 로그인
            </button>
          </div>
        </form>
    </DiningLayout>
  );
}

export default Login;
