import React, { useState } from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Userinfo.css";

const Userinfo = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        email: "",
        emailAgree: "disagree",
        nickname: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 비밀번호 및 이메일 업데이트 로직 처리
        console.log("Form submitted:", formData);
    };

    const handleDeleteAccount = () => {
        // 회원 탈퇴 로직 처리
        console.log("Account deleted");
    };

    return (
        <DiningLayout>
        <div className="userinfo_form">
            <form onSubmit={handleSubmit}>
                <p className="form_title">회원정보 수정</p>

                <div className="form_item">
                    <input
                        type="text"
                        name="nickname"
                        className="input_userinfo"
                        placeholder="닉네임"
                        value={formData.nickname}
                        onChange={handleChange}
                        required
                    />
                    <button type="button" className="btn_userinfo">
                        변경
                    </button>
                </div>

                <div className="form_item">
                    <input
                        type="password"
                        name="currentPassword"
                        className="input_userinfo"
                        placeholder="현재 비밀번호"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form_item">
                    <input
                        type="password"
                        name="newPassword"
                        className="input_userinfo"
                        placeholder="변경할 비밀번호"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form_item">
                    <input
                        type="password"
                        name="confirmNewPassword"
                        className="input_userinfo"
                        placeholder="변경할 비밀번호 확인"
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form_item">
                    {/* 비밀번호 변경 버튼은 제거 */}
                </div>

                <div className="form_item">
                    <input
                        type="email"
                        name="email"
                        className="input_userinfo"
                        placeholder="이메일"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <button type="button" className="btn_userinfo">
                        변경
                    </button>
                </div>

                <div className="form_item radio_agree">
                    <label>
                        <input
                            type="radio"
                            name="emailAgree"
                            value="agree"
                            checked={formData.emailAgree === "agree"}
                            onChange={handleChange}
                        />
                        이메일 수신 동의
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="emailAgree"
                            value="disagree"
                            checked={formData.emailAgree === "disagree"}
                            onChange={handleChange}
                        />
                        이메일 수신 거부
                    </label>
                </div>

                <div className="form_item delete_account" onClick={handleDeleteAccount}>
                    회원탈퇴
                </div>

                <div className="form_item">
                    <button type="submit" className="btn_save_button">
                        저장
                    </button>
                </div>
            </form>
        </div>
        </DiningLayout>
    );
};

export default Userinfo;
