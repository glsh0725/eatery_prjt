import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Userinfo.css";
import alert from "sweetalert2";

const Userinfo = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        email: "",
        emailAgree: "",
        nickname: "",
    });

    useEffect(() => {
        // JWT에서 email_status 값을 추출해 초기값 설정
        const token = localStorage.getItem("token"); // JWT 토큰 가져오기
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: decoded.email || "",
                    emailAgree: decoded.email_status === "y" ? "y" : "n",
                    nickname: decoded.mem_nickname || "",
                }));
            } catch (error) {
                console.error("Invalid token:", error);
                alert.fire("오류", "유효하지 않은 토큰입니다. 다시 로그인해주세요.", "error");
                localStorage.removeItem("token");
                window.location.href = "/login"; // 로그인 페이지로 리다이렉트
            }
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 비밀번호 검증
        if (formData.newPassword !== formData.confirmNewPassword) {
            await alert.fire("오류", "변경할 비밀번호가 일치하지 않습니다.", "error");
            return;
        }

        try {
            const response = await fetch("/api/userupdate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (result.success) {
                await alert.fire("성공", "회원정보가 성공적으로 업데이트되었습니다.", "success");
            } else {
                await alert.fire("오류", result.message || "업데이트에 실패했습니다.", "error");
            }
        } catch (error) {
            await alert.fire("오류", "서버와의 통신에 실패했습니다.", "error");
        }
    };

    const handleDeleteAccount = () => {
        alert.fire({
            title: "정말 탈퇴하시겠습니까?",
            text: "탈퇴 시 계정이 삭제됩니다.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch("/api/userdelete", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const result = await response.json();
                    if (result.success) {
                        await alert.fire("탈퇴 완료", "계정이 삭제되었습니다.", "success");
                        localStorage.removeItem("token"); // 토큰 삭제
                        window.location.href = "/login"; // 로그아웃 후 리다이렉트
                    } else {
                        await alert.fire("오류", result.message || "탈퇴에 실패했습니다.", "error");
                    }
                } catch (error) {
                    await alert.fire("오류", "서버와의 통신에 실패했습니다.", "error");
                }
            }
        });
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
                        />
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
                    </div>

                    <div className="form_item radio_agree">
                        <label>
                            <input
                                type="radio"
                                name="emailAgree"
                                value="y"
                                checked={formData.emailAgree === "y"}
                                onChange={handleChange}
                            />
                            이메일 수신 동의
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="emailAgree"
                                value="n"
                                checked={formData.emailAgree === "n"}
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
