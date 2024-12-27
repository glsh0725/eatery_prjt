import React from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/login.css";

const About = () => {
  return (
    <DiningLayout>
      <form
        id="loginForm"
        className="login_form"
        action={`${contextPath}/login`}
        method="post"
      >
        <p className="login_title">DINING</p>
        <input
          type="text"
          name="member_id"
          className="input_login"
          placeholder="아이디"
        />
        <input
          type="password"
          name="member_pw"
          className="input_login"
          placeholder="비밀번호"
        />
        <button type="submit" id="loginButton" className="btn_login">
          로그인
        </button>
      </form>
    </DiningLayout>
  );
};

export default About;