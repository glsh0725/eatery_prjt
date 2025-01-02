import React, { useState } from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/MyPage.css";

function MyPage() {
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [isCommentModalOpen, setCommentModalOpen] = useState(false);

    // 샘플 데이터
    const reviewList = [
        { id: 1, text: "리뷰 1", link: "/review/1" },
        { id: 2, text: "리뷰 2", link: "/review/2" },
        { id: 3, text: "리뷰 3", link: "/review/3" },
    ];
    const commentList = [
        { id: 1, text: "댓글 1", link: "/comment/1" },
        { id: 2, text: "댓글 2", link: "/comment/2" },
        { id: 3, text: "댓글 3", link: "/comment/3" },
    ];

    return (
        <DiningLayout>
            <div className="mypage-container">
                <h1 className="mypage-title">마이페이지</h1>
                <div className="profile-section">
                    <div className="profile-left">
                        <div className="profile-picture">
                            <span>프로필 사진</span>
                        </div>
                        <div className="profile-tier">실버</div>
                    </div>
                    <div className="profile-right">
                        <p>팔로워: <span>XX명</span></p>
                        <p>
                            지역:
                            <select>
                                <option>선택</option>
                                <option>지역 1</option>
                                <option>지역 2</option>
                            </select>
                        </p>
                        <p>리뷰 작성: <span>XX개</span></p>
                        <p>댓글 작성: <span>XX개</span></p>
                        <p>좋아요: <span>XX개</span></p>
                    </div>
                </div>
                <div className="action-buttons">
                    <button
                        className="action-btn"
                        onClick={() => setReviewModalOpen(true)}
                    >
                        리뷰 작성 내역
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => setCommentModalOpen(true)}
                    >
                        댓글 작성 내역
                    </button>
                </div>

                {/* 리뷰 작성 내역 모달 */}
                {isReviewModalOpen && (
                    <div className="modal-overlay" onClick={() => setReviewModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>리뷰 작성 내역</h2>
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
                            <button onClick={() => setReviewModalOpen(false)}>닫기</button>
                        </div>
                    </div>
                )}

                {/* 댓글 작성 내역 모달 */}
                {isCommentModalOpen && (
                    <div className="modal-overlay" onClick={() => setCommentModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <h2>댓글 작성 내역</h2>
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
                            <button onClick={() => setCommentModalOpen(false)}>닫기</button>
                        </div>
                    </div>
                )}
            </div>
        </DiningLayout>
    );
}

export default MyPage;
