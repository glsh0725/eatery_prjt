import React from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Find_userinfo.css";


const Find_userinfo = () => {
    return (
        <DiningLayout>
            <main>
                <div className="find-account-container">
                    <div className="find-section" id="id-section">
                        <h2 className="section-title">아이디 찾기</h2>
                        <div className="section-content">
                            <input
                                type="email"
                                id="id-email"
                                placeholder="이메일을 입력하세요"
                                className="input-field"
                            />
                            <button className="action-btn" id="find-id-btn">
                                아이디 확인
                            </button>
                            <p className="message" id="id-message"></p>
                        </div>
                    </div>
                    <div className="find-section" id="password-section">
                        <h2 className="section-title">비밀번호 찾기</h2>
                        <div className="section-content">
                            <input
                                type="email"
                                id="password-email"
                                placeholder="이메일을 입력하세요"
                                className="input-field"
                            />
                            <button className="action-btn" id="send-email-btn">
                                메일 발송
                            </button>
                            <p className="message" id="password-message"></p>
                        </div>
                    </div>
                </div>
            </main>
        </DiningLayout>
    );
};

export default Find_userinfo;