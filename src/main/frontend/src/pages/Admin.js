import React, { useState } from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Admin.css";

const Admin = () => {
    const members = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        userId: `user${i}`,
        nickname: `닉네임${i}`,
        email: `user${i}@gmail.com`,
        emailSubscribed: i % 2 === 0 ? "Y" : "N",
        joinDate: `2025-01-${String(16 + (i % 14)).padStart(2, "0")}`,
        consentDate: `2025-01-${String(16 + (i % 14)).padStart(2, "0")}`,
    }));

    const reports = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        nickname: `닉네임${i + 1}`,
        reviewCount: Math.floor(Math.random() * 10),
        commentCount: Math.floor(Math.random() * 10),
        crewCount: Math.floor(Math.random() * 10),
        date: `2025-01-${String(17 + (i % 14)).padStart(2, "0")}`,
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("members");
    const [searchQuery, setSearchQuery] = useState("");
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [isCommentModalOpen, setCommentModalOpen] = useState(false);
    const [isCrewModalOpen, setCrewModalOpen] = useState(false);

    const [reviewReportData, setReviewReportData] = useState([]);
    const [commentReportData, setCommentReportData] = useState([]);
    const [crewReportData, setCrewReportData] = useState([]);

    const [isReviewHistoryModalOpen, setReviewHistoryModalOpen] = useState(false);
    const [isCommentHistoryModalOpen, setCommentHistoryModalOpen] = useState(false);
    const [isCrewHistoryModalOpen, setCrewHistoryModalOpen] = useState(false);

    const reviewList = [
        { id: 1, text: "리뷰 1", link: "#" },
        { id: 2, text: "리뷰 2", link: "#" },
    ];

    const commentList = [
        { id: 1, text: "댓글 1", link: "#" },
        { id: 2, text: "댓글 2", link: "#" },
    ];

    const crewList = [
        { id: 1, text: "크루 1", link: "#" },
        { id: 2, text: "크루 2", link: "#" },
    ];
    const itemsPerPage = 20;

    const handleControlButtonClick = (action) => {
        alert(`"${action}" 버튼이 준비중입니다.`);
    };

    const handleReviewClick = () => {
        const dummyReviewData = [
            { id: 1, nickname: "닉네임10", reason: "스팸홍보/도배입니다." },
            { id: 2, nickname: "닉네임9", reason: "부적절한 내용입니다." },
        ];
        setReviewReportData(dummyReviewData);
        setReviewModalOpen(true);
    };

    const handleCommentClick = () => {
        const dummyCommentData = [
            { id: 1, nickname: "닉네임8", reason: "욕설 및 비방입니다." },
            { id: 2, nickname: "닉네임7", reason: "부적절한 링크 포함." },
        ];
        setCommentReportData(dummyCommentData);
        setCommentModalOpen(true);
    };

    const handleCrewClick = () => {
        const dummyCrewData = [
            { id: 1, nickname: "닉네임6", reason: "스팸크루입니다." },
            { id: 2, nickname: "닉네임5", reason: "부적절한 활동." },
        ];
        setCrewReportData(dummyCrewData);
        setCrewModalOpen(true);
    };

    const handleReviewHistoryClick = () => {
        setReviewHistoryModalOpen(true);
    };

    const handleCommentHistoryClick = () => {
        setCommentHistoryModalOpen(true);
    };

    const handleCrewHistoryClick = () => {
        setCrewHistoryModalOpen(true);
    };

    const filteredData = (activeTab === "members" ? members : reports).filter((item) => {
        if (activeTab === "members") {
            return item.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.nickname.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return item.nickname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <DiningLayout>
            <div className="admin-container">
                <div className="tab-menu">
                    <button
                        className={activeTab === "members" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("members");
                            setSearchQuery("");
                            setCurrentPage(1);
                        }}
                    >
                        회원 목록
                    </button>
                    <button
                        className={activeTab === "reports" ? "active" : ""}
                        onClick={() => {
                            setActiveTab("reports");
                            setSearchQuery("");
                            setCurrentPage(1);
                        }}
                    >
                        신고 목록
                    </button>
                </div>

                <div className="table-controls">
                    <input
                        type="text"
                        placeholder={activeTab === "members" ? "아이디 또는 닉네임 검색" : "닉네임 검색"}
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="control-buttons">
                        {activeTab === "members" && (
                            <>
                                <button
                                    className="control-button"
                                    onClick={() => handleControlButtonClick("추가")}
                                >
                                    추가
                                </button>
                                <button
                                    className="control-button"
                                    onClick={() => handleControlButtonClick("저장")}
                                >
                                    저장
                                </button>
                            </>
                        )}
                        <button
                            className="control-button"
                            onClick={() => handleControlButtonClick("삭제")}
                        >
                            삭제
                        </button>
                    </div>
                </div>

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                        <tr>
                            <th>선택</th>
                            <th>번호</th>
                            <th>{activeTab === "members" ? "아이디" : "닉네임"}</th>
                            {activeTab === "members" ? (
                                <>
                                    <th>닉네임</th>
                                    <th>이메일</th>
                                    <th>이메일 수신</th>
                                    <th>가입날짜</th>
                                    <th>동의날짜</th>
                                </>
                            ) : (
                                <>
                                    <th>리뷰 관리</th>
                                    <th>댓글 관리</th>
                                    <th>크루 관리</th>
                                    <th>리뷰 신고</th>
                                    <th>댓글 신고</th>
                                    <th>크루 신고</th>
                                    <th>작성날짜</th>
                                </>
                            )}
                        </tr>
                        </thead>
                        <tbody>
                        {currentData.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>{item.id}</td>
                                {activeTab === "members" ? (
                                    <>
                                        <td>{item.userId}</td>
                                        <td>{item.nickname}</td>
                                        <td>{item.email}</td>
                                        <td>{item.emailSubscribed}</td>
                                        <td>{item.joinDate}</td>
                                        <td>{item.consentDate}</td>
                                    </>
                                ) : (
                                    <>
                                        <td>{item.nickname}</td>
                                        <td>
                                            <button
                                                className="manage-button"
                                                onClick={handleReviewHistoryClick}
                                            >
                                                리뷰 내역
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="manage-button"
                                                onClick={handleCommentHistoryClick}
                                            >
                                                댓글 내역
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="manage-button"
                                                onClick={handleCrewHistoryClick}
                                            >
                                                크루 내역
                                            </button>
                                        </td>
                                        <td onClick={handleReviewClick} style={{cursor: "pointer"}}>
                                            {item.reviewCount}건
                                        </td>
                                        <td onClick={handleCommentClick} style={{cursor: "pointer"}}>
                                            {item.commentCount}건
                                        </td>
                                        <td onClick={handleCrewClick} style={{cursor: "pointer"}}>
                                            {item.crewCount}건
                                        </td>
                                        <td>{item.date}</td>
                                    </>
                                )}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* 리뷰 작성 내역 모달 */}
                {isReviewHistoryModalOpen && (
                    <div className="modal-overlay" onClick={() => setReviewHistoryModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span>리뷰 작성 내역</span>
                            <button onClick={() => setReviewHistoryModalOpen(false)}>닫기</button>
                            <ul>
                                {reviewList.map((review) => (
                                    <li key={review.id}>
                                        {review.text}
                                        <a href={review.link} className="go-to-review">
                                            바로가기
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 댓글 작성 내역 모달 */}
                {isCommentHistoryModalOpen && (
                    <div className="modal-overlay" onClick={() => setCommentHistoryModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span>댓글 작성 내역</span>
                            <button onClick={() => setCommentHistoryModalOpen(false)}>닫기</button>
                            <ul>
                                {commentList.map((comment) => (
                                    <li key={comment.id}>
                                        {comment.text}
                                        <a href={comment.link} className="go-to-comment">
                                            바로가기
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 크루 작성 내역 모달 */}
                {isCrewHistoryModalOpen && (
                    <div className="modal-overlay" onClick={() => setCrewHistoryModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span>크루 작성 내역</span>
                            <button onClick={() => setCrewHistoryModalOpen(false)}>닫기</button>
                            <ul>
                                {crewList.map((crew) => (
                                    <li key={crew.id}>
                                        {crew.text}
                                        <a href={crew.link} className="go-to-crew">
                                            바로가기
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {/* 리뷰 신고 내역 모달 */}
                {isReviewModalOpen && (
                    <div className="modal-overlay" onClick={() => setReviewModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <span>리뷰 신고 내역</span>
                                <button onClick={() => setReviewModalOpen(false)}>X</button>
                            </div>
                            <ul>
                                {reviewReportData.map((data) => (
                                    <li key={data.id} className="modal-item">
                                        <div>
                                            <strong>닉네임</strong>: {data.nickname}
                                        </div>
                                        <div>
                                            <strong>사유</strong>: {data.reason}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 댓글 신고 내역 모달 */}
                {isCommentModalOpen && (
                    <div className="modal-overlay" onClick={() => setCommentModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <span>댓글 신고 내역</span>
                                <button onClick={() => setCommentModalOpen(false)}>X</button>
                            </div>
                            <ul>
                                {commentReportData.map((data) => (
                                    <li key={data.id} className="modal-item">
                                        <div>
                                            <strong>닉네임</strong>: {data.nickname}
                                        </div>
                                        <div>
                                            <strong>사유</strong>: {data.reason}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 크루 신고 내역 모달 */}
                {isCrewModalOpen && (
                    <div className="modal-overlay" onClick={() => setCrewModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <span>크루 신고 내역</span>
                                <button onClick={() => setCrewModalOpen(false)}>X</button>
                            </div>
                            <ul>
                                {crewReportData.map((data) => (
                                    <li key={data.id} className="modal-item">
                                        <div>
                                            <strong>닉네임</strong>: {data.nickname}
                                        </div>
                                        <div>
                                            <strong>사유</strong>: {data.reason}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </DiningLayout>
    );
};

export default Admin;