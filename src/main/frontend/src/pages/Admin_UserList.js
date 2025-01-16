import React, { useState } from "react";
import "../css/Admin_UserList.css";
import DiningLayout from "../layouts/DiningLayout";

const Admin_UserList = () => {
    // 샘플 데이터 생성
    const members = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        userId: `user${i}`,
        nickname: `닉네임${i}`,
        email: `user${i}@gmail.com`,
        emailSubscribed: i % 2 === 0 ? "Y" : "N",
        joinDate: `2024-12-${String(16 + (i % 14)).padStart(2, "0")}`,
        consentDate: `2024-12-${String(16 + (i % 14)).padStart(2, "0")}`,
    }));

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // 현재 페이지의 데이터 계산
    const currentData = members.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // 페이지 수 계산
    const totalPages = Math.ceil(members.length / itemsPerPage);

    return (
        <DiningLayout>
        <div className="adminUserlist-table-container">
            <h1>회원 목록</h1>
            <div className="table-controls">
                <input type="text" placeholder="아이디" className="search-input" />
                <button className="control-button">검색</button>
                <button className="control-button">추가</button>
                <button className="control-button">저장</button>
                <button className="control-button">삭제</button>
            </div>
            <table className="member-table">
                <thead>
                <tr>
                    <th>선택</th>
                    <th>번호</th>
                    <th>아이디</th>
                    <th>닉네임</th>
                    <th>이메일</th>
                    <th>이메일 수신</th>
                    <th>가입날짜</th>
                    <th>동의날짜</th>
                </tr>
                </thead>
                <tbody>
                {currentData.map((member) => (
                    <tr key={member.id}>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td>{member.id}</td>
                        <td>{member.userId}</td>
                        <td>{member.nickname}</td>
                        <td>{member.email}</td>
                        <td>{member.emailSubscribed}</td>
                        <td>{member.joinDate}</td>
                        <td>{member.consentDate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    &gt;
                </button>
            </div>
        </div>
        </DiningLayout>
    );
};

export default Admin_UserList;
