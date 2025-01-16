import React, { useState } from "react";
import DiningLayout from '../layouts/DiningLayout'
import "../css/Admin_Report.css";

const Admin_Report = () => {
    // 샘플 데이터 생성
    const members = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        nickname: `닉네임${i + 1}`,
        reviewCount: Math.floor(Math.random() * 10),
        commentCount: Math.floor(Math.random() * 10),
        crewCount: Math.floor(Math.random() * 10),
        date: `2024-12-${String(17 + (i % 14)).padStart(2, "0")}`,
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
            <div className="adminReport-table-container">
                <h1>신고 목록</h1>
                <div className="table-controls">
                    <input type="text" placeholder="아이디" className="search-input"/>
                    <button className="control-button">검색</button>
                    <button className="control-button">삭제</button>
                </div>
                <table className="member-table">
                    <thead>
                    <tr>
                        <th>선택</th>
                        <th>번호</th>
                        <th>닉네임</th>
                        <th>리뷰 관리</th>
                        <th>댓글 관리</th>
                        <th>크루 관리</th>
                        <th>리뷰 신고</th>
                        <th>댓글 신고</th>
                        <th>크루 신고</th>
                        <th>작성날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentData.map((member) => (
                        <tr key={member.id}>
                            <td>
                                <input type="checkbox"/>
                            </td>
                            <td>{member.id}</td>
                            <td>{member.nickname}</td>
                            <td>
                                <button>리뷰 내역</button>
                            </td>
                            <td>
                                <button>댓글 내역</button>
                            </td>
                            <td>
                                <button>크루 내역</button>
                            </td>
                            <td>{member.reviewCount}건</td>
                            <td>{member.commentCount}건</td>
                            <td>{member.crewCount}건</td>
                            <td>{member.date}</td>
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
                    {Array.from({length: totalPages}, (_, i) => (
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

export default Admin_Report;
