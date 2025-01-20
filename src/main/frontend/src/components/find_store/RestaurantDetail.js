import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/RestaurantDetail.css";

const RestaurantDetail = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState("spam");
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restaurantResponse = await axios.get(`http://localhost:18080/api/restaurants/${name}`);
                setRestaurant(restaurantResponse.data);

                const restaurantName = name;

                const reviewsResponse = await axios.get(`http://localhost:18080/api/reviews/${restaurantName}`);
                setReviews(reviewsResponse.data);

                const usersResponse = await axios.get(`http://localhost:18080/api/users`);
                setUsers(usersResponse.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [name]);

    const handleMoreReviewsClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openReportModal = () => {
        setShowReportModal(true);
    };

    const closeReportModal = () => {
        setShowReportModal(false);
    };

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const openWriteReviewModal = () => {
        setShowWriteReviewModal(true);
    };

    const closeWriteReviewModal = () => {
        setShowWriteReviewModal(false);
    };

    const startIndex = (currentPage - 1) * reviewsPerPage;
    const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(reviews.length / reviewsPerPage)) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (error) {
        return <div>오류: {error}</div>;
    }

    if (!restaurant) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="restaurant-detail">
            <div className="top-section">
                <div className="image-box">
                    <img
                        src={
                            restaurant.menuName === "default.jpg"
                                ? "/images/default.jpg"
                                : `/images/menu/${restaurant.menuName}`
                        }
                        alt={restaurant.name}
                    />
                </div>
                <div
                    className="map-box"
                    style={{height: "320px", overflow: "hidden", position: "relative"}}
                >
                    <iframe
                        src={`https://map.naver.com/v5/search/${encodeURIComponent(restaurant.address)}`}
                        width="230%"
                        height="100%"
                        style={{
                            border: "none",
                            position: "absolute",
                            top: 0,
                            left: "-130%",
                        }}
                        allowFullScreen
                        title="Naver Map"
                    ></iframe>
                </div>
            </div>
            <div className="title-and-actions">
                <h2>
                    {restaurant.name}{" "}
                    <span className="rating">
                        {reviews.length > 0 && reviews.reduce((sum, review) => sum + review.reviewScore, 0) > 0
                            ? (reviews.reduce((sum, review) => sum + review.reviewScore, 0) / reviews.length).toFixed(1)
                            : restaurant.scoreNumber}
                        </span>
                </h2>
                <div className="actions">
                    <span>⭐ 즐겨찾기</span>
                    <span>❤️ 좋아요 {restaurant.likeCount || 0}</span>
                    <span>👀 조회수 {restaurant.viewCount || 0}</span>
                </div>
            </div>
            <div className="main-section">
                <div className="details">
                    <p>영업시간: {restaurant.openTime || "정보 없음"}</p>
                    <p>휴게시간: {restaurant.breakTime || "정보 없음"}</p>
                    <p>휴무일: {restaurant.offDays || "정보 없음"}</p>
                    <p>
                        주소: {restaurant.address || "정보 없음"} (지번: {restaurant.oldAddress || "정보 없음"})
                    </p>
                    <p>전화번호: {restaurant.phoneNumber || "정보 없음"}</p>
                    {restaurant.homepage && restaurant.homepage !== "홈페이지 정보 없음" ? (
                        <p>
                            홈페이지:{" "}
                            <a
                                href={
                                    restaurant.homepage.startsWith("http")
                                        ? restaurant.homepage
                                        : `https://${restaurant.homepage}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {restaurant.homepage}
                            </a>
                        </p>
                    ) : (
                        <p>홈페이지: 정보 없음</p>
                    )}
                    <p>주차: {restaurant.parkingInfo || "정보 없음"}</p>
                    <p>관련 태그: {restaurant.tags || "정보 없음"}</p>
                </div>
                <div className="reviews-section">
                    <div className="reviews-header">
                        <h3>리뷰 ({reviews.length})</h3>
                        <button className="review-button" onClick={openWriteReviewModal}>리뷰 작성 ∨</button>
                    </div>
                    <div className="review-list">
                        {reviews
                            .sort((a, b) => b.reviewNumber - a.reviewNumber)
                            .slice(0, 2)
                            .map((review, index) => {
                                const user = users.find((user) => user.mem_id === review.memberId);

                                return (
                                    <div key={index} className="review-item">
                                        <p>
                                            {user ? user.mem_nickname : "알 수 없음"}{" "}
                                            <span className="rating">{review.reviewScore.toFixed(1)}</span>
                                        </p>
                                        <div className="review-content">{review.reviewContent}</div>
                                        {review.reviewPhotoName && (
                                            <div className="review-image">
                                                <img
                                                    src={`/images/reviews/${review.reviewPhotoName}`}
                                                    alt="리뷰 이미지"
                                                />
                                            </div>
                                        )}
                                        <div className="review-actions">
                                            ❤️ 좋아요 {review.reviewLikes || 0}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                    <button className="more-reviews" onClick={handleMoreReviewsClick}>
                        리뷰 더보기 +
                    </button>
                </div>
            </div>

            {
                showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2>리뷰 목록 ({reviews.length})</h2>
                                <button className="write-review-btn" onClick={openWriteReviewModal}>리뷰 작성 ∨</button>
                                <button className="close-modal" onClick={closeModal}>
                                    X
                                </button>
                            </div>
                            <div className="modal-body">
                                {reviews.length > 0 ? (
                                    <div className="review-container">
                                        <div className="review-list">
                                            {currentReviews.map((review, index) => {
                                                const user = users.find((user) => user.mem_id === review.memberId);

                                                return (
                                                    <div key={index} className="review-item">
                                                        <div className="review-header">
                                                            <div className="review-info">
                                                                <strong>{user ? user.mem_nickname : "알 수 없음"}</strong>{" "}
                                                                <span className="rating">{parseFloat(review.reviewScore).toFixed(1)}</span>
                                                                <span className="report" onClick={openReportModal}>🚨 신고</span>
                                                            </div>
                                                            <div className="review-actions">
                                                                <button className="edit-btn">수정</button>
                                                                <button className="delete-btn">삭제</button>
                                                            </div>
                                                        </div>
                                                        <div className="review-content">{review.reviewContent}</div>
                                                        <div className="review-container">
                                                            {review.reviewPhotoName && (
                                                                <div className="review-image">
                                                                    <a
                                                                        href={`/images/reviews/${review.reviewPhotoName}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img
                                                                            src={`/images/reviews/${review.reviewPhotoName}`}
                                                                            alt="리뷰 이미지"
                                                                        />
                                                                    </a>
                                                                </div>
                                                            )}
                                                            <div className="review-footer">
                                                                <span>❤️ 좋아요 {review.reviewLikes || 0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <div className="pagination-controls">
                                            <button onClick={handlePrevPage} disabled={currentPage === 1}>
                                                ∧
                                            </button>
                                            <button
                                                onClick={handleNextPage}
                                                disabled={currentPage === Math.ceil(reviews.length / reviewsPerPage)}
                                            >
                                                ∨
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <p>리뷰가 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
            {showReportModal && (
                <div className="report-modal-overlay">
                    <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="report-modal-header">
                            <h2>신고하기</h2>
                            <button className="close-report-modal" onClick={closeReportModal}>
                                X
                            </button>
                        </div>
                        <div className="report-modal-body">
                            <p>
                                <strong>작성자</strong> | 닉네임1
                            </p>
                            <p>
                                <strong>제목</strong> | 제목
                            </p>
                            <div className="report-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="reportReason"
                                        value="spam"
                                        checked={selectedReason === "spam"}
                                        onChange={handleReasonChange}
                                    />
                                    스팸홍보/도배입니다.
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="reportReason"
                                        value="obscene"
                                        checked={selectedReason === "obscene"}
                                        onChange={handleReasonChange}
                                    />
                                    음란물입니다.
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="reportReason"
                                        value="illegal"
                                        checked={selectedReason === "illegal"}
                                        onChange={handleReasonChange}
                                    />
                                    불법정보를 포함하고 있습니다.
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="reportReason"
                                        value="harmful"
                                        checked={selectedReason === "harmful"}
                                        onChange={handleReasonChange}
                                    />
                                    청소년에게 유해한 내용입니다.
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="reportReason"
                                        value="offensive"
                                        checked={selectedReason === "offensive"}
                                        onChange={handleReasonChange}
                                    />
                                    욕설/생명경시/혐오/차별적 표현입니다.
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="reportReason"
                                        value="privacy"
                                        checked={selectedReason === "privacy"}
                                        onChange={handleReasonChange}
                                    />
                                    개인정보가 노출되었습니다.
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="reportReason"
                                        value="custom"
                                        checked={selectedReason === "custom"}
                                        onChange={handleReasonChange}
                                    />
                                    직접 입력하기.
                                </label>
                            </div>
                            <textarea
                                className="report-custom-input"
                                placeholder="사유를 입력해주세요"
                                disabled={selectedReason !== "custom"}
                            ></textarea>
                        </div>
                        <div className="report-modal-footer">
                            <button className="submit-btn">
                                신고하기
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showWriteReviewModal && (
                <div className="modal-overlay">
                    <div className="review-write-modal-content">
                        <div className="review-write-modal-header">
                            <h2>리뷰 작성</h2>
                            <button className="close-review-write-modal" onClick={closeWriteReviewModal}>
                                X
                            </button>
                        </div>
                        <div className="review-write-modal-body">
                            <div className="review-write-actions">
                                <button className="review-write-rating-btn">별점 등록 ▼</button>
                                <button className="review-write-image-upload-btn">이미지 첨부</button>
                            </div>
                            <textarea
                                placeholder="내용을 입력해주세요"
                                className="review-write-content-input"
                            ></textarea>
                            <div className="review-write-modal-footer">
                                <button className="cancel-btn" onClick={closeWriteReviewModal}>
                                    취소
                                </button>
                                <button className="submit-btn">등록</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetail;