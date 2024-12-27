import React from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Sign_up.css";

const Sign_up = () => {
    const contextPath = "";
    return (
        <DiningLayout>
            <form
                id="signUpForm"
                className="sign_up_form"
                action={`${contextPath}/sign_up`}
                method="post"
            >
                <p className="sign_up_title">회원가입</p>

                <input
                    type="text"
                    name="member_id"
                    className="input_sign_up"
                    placeholder="아이디"
                    required
                />
                <input
                    type="password"
                    name="member_pw"
                    className="input_sign_up"
                    placeholder="비밀번호"
                    required
                />
                <input
                    type="password"
                    name="member_pw_confirm"
                    className="input_sign_up"
                    placeholder="비밀번호 확인"
                    required
                />
                <input
                    type="text"
                    name="nickname"
                    className="input_sign_up"
                    placeholder="닉네임"
                    required
                />
                <input
                    type="email"
                    name="email"
                    className="input_sign_up"
                    placeholder="이메일"
                    required
                />

                <div className="email_agree">
                    <label>
                        <input
                            type="radio"
                            name="email_agree"
                            value="agree"
                            required
                        />{" "}
                        이메일 수신 동의
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="email_agree"
                            value="disagree"
                        />{" "}
                        이메일 수신 거부
                    </label>
                </div>

                <div className="terms">
                    <label>
                        <input type="checkbox" name="terms_agree" required />{" "}
                        이용약관 및 개인정보 취급방침에 동의합니다.
                    </label>
                </div>

                <button type="submit" id="signUpButton" className="btn_sign_up">
                    회원가입
                </button>
            </form>
        </DiningLayout>
    );
};

export default Sign_up;
