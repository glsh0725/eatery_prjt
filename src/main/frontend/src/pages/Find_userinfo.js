import React from "react";
import alert from "sweetalert2";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Find_userinfo.css";

const Find_userinfo = () => {
    const sendCode = async (email, actionType) => {
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                await alert.fire({
                    icon: "success",
                    title: "인증 코드 발송 성공",
                    text: "인증 코드가 발송되었습니다. 이메일을 확인해주세요.",
                    confirmButtonText: "확인",
                });
                window.location.href = `/find_idpw?action=${actionType}`;
            } else {
                const errorData = await response.json();
                await alert.fire({
                    icon: "error",
                    title: "오류",
                    text: errorData.error,
                    confirmButtonText: "확인",
                });
            }
        } catch (error) {
            await alert.fire({
                icon: "error",
                title: "서버 오류",
                text: "서버와의 통신 중 오류가 발생했습니다.",
                confirmButtonText: "확인",
            });
        }
    };

    const handleFindIdClick = async (e) => {
        const email = document.getElementById("id-email").value.trim();
        if (!email) {
            await alert.fire({
                icon: "warning",
                title: "입력 오류",
                text: "이메일을 입력하세요.",
                confirmButtonText: "확인",
            });
            return;
        }
        await sendCode(email, "find-id");
    };

    const handleFindPwClick = async (e) => {
        const email = document.getElementById("password-email").value.trim();
        if (!email) {
            await alert.fire({
                icon: "warning",
                title: "입력 오류",
                text: "이메일을 입력하세요.",
                confirmButtonText: "확인",
            });
            return;
        }
        await sendCode(email, "find-pw");
    };

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
                            <button
                                className="action-btn"
                                id="find-id-btn"
                                onClick={handleFindIdClick}
                            >
                                아이디 인증코드 발송
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
                            <button
                                className="action-btn"
                                id="find-pw-btn"
                                onClick={handleFindPwClick}
                            >
                                비밀번호 인증코드 발송
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
