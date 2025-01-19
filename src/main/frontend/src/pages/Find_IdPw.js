import React, { useState, useEffect } from "react";
import alert from "sweetalert2";
import DiningLayout from "../layouts/DiningLayout";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/Find_IdPw.css";

const Find_IdPw = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem("timeLeft");
        return savedTime ? parseInt(savedTime, 10) : 300;
    });
    const [code, setCode] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const query = new URLSearchParams(location.search);
    const actionType = query.get("action"); // "find-id" or "reset-password"
    const email = query.get("email"); // email passed from the previous page

    useEffect(() => {
        localStorage.setItem("timeLeft", timeLeft);
        if (timeLeft <= 0) {
            setIsDisabled(true);
            localStorage.removeItem("timeLeft");
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleVerify = async () => {
        if (!code) {
            await alert.fire({
                title: "입력란 빈칸",
                text: "인증코드를 입력하지 않았습니다.",
                icon: "warning",
                confirmButtonText: "확인",
            });
            return;
        }
        if (!/^\d{6}$/.test(code)) {
            await alert.fire({
                title: "입력 오류",
                text: "6자리 숫자 인증코드를 입력해야합니다.",
                icon: "warning",
                confirmButtonText: "확인",
            });
            return;
        }

        try {
            const response = await fetch(`/api/check-id`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, resetCode: code }),
            });

            if (response.ok) {
                const result = await response.json();
                if (actionType === "find-id") {
                    alert.fire({
                        title: "성공",
                        text: `아이디는 ${result.email}입니다.`,
                        icon: "success",
                        confirmButtonText: "확인",
                    }).then(() => navigate("/login"));
                } else if (actionType === "reset-password") {
                    alert.fire({
                        title: "비밀번호 변경",
                        html: `
                            <input type="password" id="new-password" class="alert_input" placeholder="새 비밀번호">
                            <input type="password" id="confirm-password" class="alert_input" placeholder="비밀번호 확인">
                        `,
                        confirmButtonText: "변경",
                        preConfirm: () => {
                            const newPassword = alert.getPopup().querySelector("#new-password").value;
                            const confirmPassword = alert.getPopup().querySelector("#confirm-password").value;
                            if (!newPassword || !confirmPassword) {
                                alert.showValidationMessage("모든 필드를 입력해주세요.");
                            }
                            if (newPassword !== confirmPassword) {
                                alert.showValidationMessage("비밀번호가 일치하지 않습니다.");
                            }
                            return newPassword;
                        },
                    }).then(async (result) => {
                        const newPassword = result.value;
                        const passwordResponse = await fetch(`/api/change-pw`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ email, newPassword }),
                        });

                        if (passwordResponse.ok) {
                            alert.fire({
                                title: "성공",
                                text: "비밀번호가 성공적으로 변경되었습니다.",
                                icon: "success",
                                confirmButtonText: "확인",
                            }).then(() => navigate("/login"));
                        } else {
                            await alert.fire({
                                title: "변경 실패",
                                text: "비밀번호 변경 중 오류가 발생했습니다.",
                                icon: "error",
                                confirmButtonText: "확인",
                            });
                        }
                    });
                }
            } else {
                await alert.fire({
                    title: "실패",
                    text: "인증코드가 유효하지 않습니다.",
                    icon: "error",
                    confirmButtonText: "확인",
                });
            }
        } catch (error) {
            await alert.fire({
                title: "실패",
                text: "서버와의 통신 중 문제가 발생했습니다.",
                icon: "error",
                confirmButtonText: "확인",
            });
        }
    };

    return (
        <DiningLayout>
            <div className="email-test-content">
                <h2>{actionType === "find-id" ? "아이디 찾기" : "비밀번호 찾기"}</h2>
                <div className="input-section">
                    <div className="input-with-button">
                        <input
                            type="text"
                            className="input-box"
                            placeholder={isFocused ? "" : isDisabled ? "인증시간 종료" : "인증코드를 입력하세요"}
                            value={code}
                            onChange={handleCodeChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            disabled={isDisabled}
                        />
                        <button
                            className="action-btn"
                            onClick={isDisabled ? () => navigate("/find_userinfo") : handleVerify}
                        >
                            {isDisabled ? "뒤로가기" : "확인"}
                        </button>
                    </div>
                </div>
                <div className="time-set">
                    <p className="timer-txt">인증시간</p>
                    <p className="timer">{formatTime(timeLeft)}</p>
                </div>
            </div>
        </DiningLayout>
    );
};

export default Find_IdPw;