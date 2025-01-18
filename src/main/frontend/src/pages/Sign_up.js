import React, { useState } from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Sign_up.css";
import axios from "axios";

const Sign_up = () => {
    const [formData, setFormData] = useState({
        mem_id: "",
        mem_pw: "",
        mem_pw_confirm: "",
        mem_nickname: "",
        email: "",
        email_status: "",
        agree_date: false
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const contextPath = "http://localhost:18080";

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const openModal = (content, e) => {
        e.stopPropagation();
        setModalContent(content);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.mem_pw !== formData.mem_pw_confirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const { agree_date, ...dataToSend } = formData;

            const response = await axios.post(
                `${contextPath}/api/signup`,
                new URLSearchParams(dataToSend).toString(),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            if (response.status === 200) {
                alert("회원가입이 완료되었습니다!");
                window.location.href = response.data; // 백엔드에서 보낸 URL로 리다이렉트
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // 서버에서 반환된 오류 메시지를 기반으로 처리
                const errorMessage = error.response.data.toLowerCase();
                if (errorMessage.includes("중복된 아이디")) {
                    alert("회원가입 실패: 이미 사용 중인 아이디입니다.");
                } else if (errorMessage.includes("중복된 이메일")) {
                    alert("회원가입 실패: 이미 사용 중인 이메일입니다.");
                } else if (errorMessage.includes("중복된 닉네임")) {
                    alert("회원가입 실패: 이미 사용 중인 닉네임입니다.");
                } else {
                    alert(`회원가입 실패: ${error.response.data}`);
                }
            } else {
                // 네트워크 오류 등 서버 외의 문제
                alert("회원가입 실패: 서버와의 통신 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <DiningLayout>
            <form
                id="signUpForm"
                className="sign_up_form"
                onSubmit={handleSubmit}
            >
                <p className="sign_up_title">회원가입</p>

                {errorMessage && <p className="error_message">{errorMessage}</p>}

                <input
                    type="text"
                    id="mem_id"
                    name="mem_id"
                    className="input_sign_up"
                    placeholder="아이디"
                    value={formData.mem_id}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    id="mem_pw"
                    name="mem_pw"
                    className="input_sign_up"
                    placeholder="비밀번호"
                    value={formData.mem_pw}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    id="mem_pw_confirm"
                    name="mem_pw_confirm"
                    className="input_sign_up"
                    placeholder="비밀번호 확인"
                    value={formData.mem_pw_confirm}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    id="mem_nickname"
                    name="mem_nickname"
                    className="input_sign_up"
                    placeholder="닉네임"
                    value={formData.mem_nickname}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="input_sign_up"
                    placeholder="이메일"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <div className="email_agree">
                    <label>
                        <input
                            type="radio"
                            name="email_status"
                            value="Y"
                            checked={formData.email_status === "Y"}
                            onChange={handleChange}
                            required
                        />{" "}
                        이메일 수신 동의
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="email_status"
                            value="N"
                            checked={formData.email_status === "N"}
                            onChange={handleChange}
                        />{" "}
                        이메일 수신 거부
                    </label>
                </div>

                <div className="terms">
                    <label>
                        <input
                            type="checkbox"
                            name="agree_date"
                            checked={formData.agree_date}
                            onChange={handleChange}
                            required
                        />{" "}
                        <span
                            className="link"
                            onClick={(e) => openModal("terms", e)}
                        >
                            <u>이용약관</u>
                        </span>
                        및{" "}
                        <span
                            className="link"
                            onClick={(e) => openModal("privacy", e)}
                        >
                            <u>개인정보 취급방침</u>
                        </span>{" "}
                        에 동의합니다.
                    </label>
                </div>

                <button type="submit" id="signUpButton" className="btn_sign_up">
                    회원가입
                </button>
            </form>

            {isModalOpen && (
                <div className="modal" onClick={closeModal}>
                    <div
                        className="modal_content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <span className="modal_close" onClick={closeModal}>
                            &times;
                        </span>
                        {modalContent === "terms" ? (
                            <div>
                                <h2>이용약관</h2>
                                <p>
                                    제1조 (목적)<br/>
                                    1.이 약관은 서비스명을 제공하는 회사명이 제공하는 서비스의 이용조건 및 절차, 회사와 이용자의 권리·의무 및 책임사항을 규정함을 목적으로
                                    합니다.<br/><br/>

                                    제2조 (정의)<br/>
                                    1."서비스"란 회사가 제공하는 모든 온라인 서비스를 의미합니다.<br/>
                                    2."이용자"란 본 약관에 따라 서비스를 이용하는 자를 말합니다.<br/><br/>

                                    제3조 (약관의 게시 및 변경)<br/>
                                    1.회사는 본 약관의 내용을 서비스 화면에 게시합니다.<br/>
                                    2.회사는 관련 법령을 위배하지 않는 범위에서 본 약관을 변경할 수 있습니다.<br/>
                                    3.변경된 약관은 공지된 날로부터 효력이 발생합니다.<br/><br/>

                                    제4조 (서비스 이용)<br/>
                                    1.이용자는 서비스를 제공받기 위해 필요한 절차를 완료하여야 합니다.<br/>
                                    2.서비스는 연중무휴 24시간 제공을 원칙으로 합니다. 단, 회사의 사정으로 일정 기간 서비스 제공이 제한될 수 있습니다.<br/><br/>

                                    제5조 (회원의 의무)<br/>
                                    1.회원은 서비스 이용 시 법령 및 본 약관을 준수해야 합니다.<br/>
                                    2.회원은 타인의 권리를 침해하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.<br/><br/>

                                    제6조 (면책사항)<br/>
                                    1.회사는 천재지변 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.<br/>
                                    2.회사는 이용자의 귀책사유로 발생한 문제에 대해서 책임을 지지 않습니다.<br/><br/>
                                </p>
                            </div>
                        ) : (
                            <div>
                                <h2>개인정보 취급방침</h2>
                                <p>
                                    1. 수집하는 개인정보의 항목
                                    회사는 다음과 같은 개인정보를 수집할 수 있습니다.<br/>
                                    필수 항목: 아이디,비밀번호,이메일<br/>
                                    선택 항목: 이메일 수신 여부<br/><br/>

                                    2. 개인정보의 수집 및 이용 목적
                                    회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.<br/>
                                    회원 관리: 회원제 서비스 제공, 본인확인<br/>
                                    마케팅 및 광고: 이벤트 정보 전달, 맞춤형 서비스 제공<br/><br/>

                                    3. 개인정보의 보유 및 이용기간
                                    회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등으로 더 이상 필요하지 않을 경우 해당 정보를 지체 없이 파기합니다.<br/><br/>

                                    4. 개인정보 제공 및 공유<br/>
                                    회사는 이용자의 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 법령에 따른 요청이 있을 경우 예외로 합니다.<br/><br/>

                                    5. 개인정보의 안전성 확보 조치<br/>
                                    회사는 개인정보 보호를 위해 다음과 같은 조치를 취합니다.<br/>
                                    데이터 암호화<br/>
                                    접근 권한 제한<br/><br/>

                                    6. 이용자의 권리 및 행사 방법<br/>
                                    이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 개인정보 처리 정지를 요청할 수 있습니다.<br/><br/>

                                    7. 문의처
                                    개인정보 관련 문의는 아래 연락처로 가능합니다.<br/>

                                    이메일: [example@example.com]<br/>
                                    전화번호: [123-456-7890]

                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </DiningLayout>
    );
};

export default Sign_up;