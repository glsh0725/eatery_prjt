import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/RestaurantDetail.css";

const RestaurantDetail = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restaurantResponse = await axios.get(`http://localhost:18080/api/restaurants/${name}`);
                setRestaurant(restaurantResponse.data);

                const restaurantName = name;

                const reviewsResponse = await axios.get(`http://localhost:18080/api/reviews/${restaurantName}`);
                setReviews(reviewsResponse.data);
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
                    {restaurant.name} <span className="rating">{restaurant.scoreNumber}</span>
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
                        <button className="review-button">리뷰 작성 ∨</button>
                    </div>
                    <div className="review-list">
                        {reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <p>
                                    {review.memberId}{" "}
                                    <span className="rating">{review.reviewScore}</span>
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
                        ))}
                </div>
                <button className="more-reviews" onClick={handleMoreReviewsClick}>
                    리뷰 더보기 +
                </button>
            </div>
        </div>

            {
                showModal && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>리뷰 목록 ({reviews.length})</h2>
                                <button className="close-modal" onClick={closeModal}>
                                    X
                                </button>
                            </div>
                            <div className="modal-body">
                                {reviews.length > 0 ? (
                                    <div className="review-list">
                                        {reviews.map((review, index) => (
                                            <div key={index} className="review-item">
                                                <div className="review-header">
                                                    <div className="review-info">
                                                        <strong>{review.memberId}</strong>{" "}
                                                        <span
                                                            className="rating">{parseFloat(review.reviewScore).toFixed(1)}</span>
                                                        <span className="report">🚨 신고</span>
                                                    </div>
                                                    <div className="review-actions">
                                                        <button className="edit-btn">수정</button>
                                                        <button className="delete-btn">삭제</button>
                                                    </div>
                                                </div>
                                                <div className="review-content">
                                                    {review.reviewContent}
                                                </div>
                                                <div className="review-container">
                                                    {review.reviewPhotoName && (
                                                        <div className="review-image">
                                                            <img
                                                                src={`/images/reviews/${review.reviewPhotoName}`}
                                                                alt="리뷰 이미지"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="review-footer">
                                                        <span>❤️ 좋아요 {review.reviewLikes || 0}</span>
                                                        <span>💬 댓글 {review.commentCount || 0}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>리뷰가 없습니다.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default RestaurantDetail;