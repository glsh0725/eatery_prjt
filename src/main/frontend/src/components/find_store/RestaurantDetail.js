import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import "../../css/RestaurantDetail.css";

const RestaurantDetail = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [isFavorited, setIsFavorited] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    const [reviewContent, setReviewContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageName, setSelectedImageName] = useState(null);
    const [userId, setUserId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showWriteReviewModal, setShowWriteReviewModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState("spam");
    const [reviews, setReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3;

    useEffect(() => {
        const fetchUserIdFromToken = () => {
            const token = localStorage.getItem("authToken");
            if (token) {
                try {
                    const payload = jwtDecode(token);
                    if (payload.exp * 1000 > Date.now()) {
                        setUserId(payload.sub);
                    } else {
                        localStorage.removeItem("authToken");
                        setUserId(null);
                    }
                } catch (e) {
                    console.error("토큰 디코딩 실패:", e);
                    setUserId(null);
                }
            }
        };
        fetchUserIdFromToken();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restaurantResponse = await axios.get(`http://192.168.0.61:18080/api/restaurants/${name}`);
                setRestaurant(restaurantResponse.data);

                const reviewsResponse = await axios.get(`http://192.168.0.61:18080/api/reviews/${name}`);
                setReviews(reviewsResponse.data);

                const usersResponse = await axios.get(`http://192.168.0.61:18080/api/users`);
                setUsers(usersResponse.data);

                if (userId) {
                    const response = await axios.get(`http://192.168.0.61:18080/api/likes-and-favorites/${userId}`);
                    const { likes = [], favorites = [] } = response.data;
                    setIsLiked(likes.includes(name));
                    setIsFavorited(favorites.includes(name));
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [name, userId]);

    useEffect(() => {
        const incrementViewCount = async () => {
            try {
                await axios.patch(`http://192.168.0.61:18080/api/restaurants/${name}/viewCount`);

                const updatedRestaurant = await axios.get(`http://192.168.0.61:18080/api/restaurants/${name}`);
                setRestaurant(updatedRestaurant.data);
            } catch (err) {
                console.error("조회수 증가 중 오류:", err);
            }
        };

        incrementViewCount();
    }, [name]);

    const toggleFavorite = async () => {
        if (!userId) {
            console.warn("로그인이 필요합니다.");
            return;
        }
        try {
            const response = await axios.post(
                `http://192.168.0.61:18080/api/favorites/toggle`,
                { memId: userId, resName: name }
            );
            setIsFavorited(response.data);
        } catch (err) {
            console.error("즐겨찾기 토글 중 오류:", err);
        }
    };

    const toggleLike = async () => {
        if (!userId) {
            console.warn("로그인이 필요합니다.");
            return;
        }
        try {
            const response = await axios.post(
                `http://192.168.0.61:18080/api/likes/toggle`,
                { memId: userId, resName: name }
            );
            const newIsLiked = response.data;
            setIsLiked(newIsLiked);

            const updatedRestaurant = await axios.get(`http://192.168.0.61:18080/api/restaurants/${name}`);
            setRestaurant(updatedRestaurant.data);
        } catch (err) {
            console.error("좋아요 토글 중 오류:", err);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setSelectedImageName(file.name);
        } else {
            setSelectedImage(null);
            setSelectedImageName(null);
        }
    };

    const handleReviewSubmit = async () => {
        if (!selectedRating) {
            alert("별점을 선택해주세요!");
            return;
        }
        if (!reviewContent.trim()) {
            alert("리뷰 내용을 입력해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append("reviewScore", selectedRating);
        formData.append("reviewContent", reviewContent);
        formData.append("memberId", userId);
        if (selectedImage) {
            formData.append("reviewPhoto", selectedImage);
        }

        try {
            await axios.post(`http://192.168.0.61:18080/api/reviews/${name}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("리뷰가 성공적으로 등록되었습니다!");

            const updatedReviews = await axios.get(`http://192.168.0.61:18080/api/reviews/${name}`);
            setReviews(updatedReviews.data);

            const reviewsResponse = await axios.get(`http://192.168.0.61:18080/api/reviews/${name}`);
            setReviews(reviewsResponse.data);

            closeWriteReviewModal();
            setSelectedRating(null);
            setReviewContent("");
            setSelectedImage(null);
        } catch (err) {
            console.error("리뷰 등록 중 오류:", err);
            alert("리뷰 등록에 실패했습니다.");
        }
    };

    const confirmDeleteReview = (reviewNumber) => {
        if (window.confirm("정말로 이 리뷰를 삭제하시겠습니까?")) {
            deleteReview(reviewNumber);
        }
    };

    const deleteReview = async (reviewNumber) => {
        try {
            await axios.delete(`http://192.168.0.61:18080/api/reviews/${reviewNumber}`);
            setReviews((prevReviews) =>
                prevReviews.filter((review) => review.reviewNumber !== reviewNumber)
            );
            alert("리뷰가 삭제되었습니다.");
        } catch (err) {
            console.error("리뷰 삭제 중 오류:", err);
            alert("리뷰 삭제에 실패했습니다.");
        }
    };

    const handleUpdateReview = async () => {
        if (!selectedRating) {
            alert("별점을 선택해주세요!");
            return;
        }
        if (!reviewContent.trim()) {
            alert("리뷰 내용을 입력해주세요!");
            return;
        }

        const formData = new FormData();
        formData.append("reviewScore", selectedRating);
        formData.append("reviewContent", reviewContent);
        if (selectedImage) {
            formData.append("reviewPhoto", selectedImage);
        }

        try {
            await axios.put(
                `http://192.168.0.61:18080/api/reviews/${selectedReview.reviewNumber}`,
                formData
            );

            alert("리뷰가 성공적으로 수정되었습니다!");
            const updatedReviews = await axios.get(`http://192.168.0.61:18080/api/reviews/${name}`);
            setReviews(updatedReviews.data);
            setShowEditReviewModal(false);
            setSelectedReview(null);
        } catch (err) {
            console.error("리뷰 수정 중 오류:", err);
            alert("리뷰 수정에 실패했습니다.");
        }
    };

    const handleEditReview = (review) => {
        setSelectedReview(review);
        setSelectedRating(review.reviewScore);
        setReviewContent(review.reviewContent);
        setSelectedImageName(review.reviewPhotoName || null);
        setShowEditReviewModal(true);
    };

    const closeEditReviewModal = () => {
        setShowEditReviewModal(false);
        setSelectedReview(null);
        setSelectedRating(null);
        setReviewContent("");
        setSelectedImage(null);
        setSelectedImageName(null);
    };

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
        setSelectedReason("spam");
    };

    const handleReasonChange = (event) => {
        setSelectedReason(event.target.value);
    };

    const openWriteReviewModal = () => {
        setShowWriteReviewModal(true);
    };

    const closeWriteReviewModal = () => {
        setShowWriteReviewModal(false);
        setSelectedRating(null);
        setReviewContent("");
        setSelectedImage(null);
        setSelectedImageName(null);
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
                    <span onClick={toggleFavorite} style={{cursor: "pointer", marginRight: "10px"}}>
                        {isFavorited ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="gold"
                            >
                                <path
                                    d="M12 .587l3.668 7.431 8.332 1.151-6.064 5.884 1.457 8.272-7.393-3.884-7.393 3.884 1.457-8.272-6.064-5.884 8.332-1.151z"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="gray"
                            >
                                <path
                                    d="M12 .587l3.668 7.431 8.332 1.151-6.064 5.884 1.457 8.272-7.393-3.884-7.393 3.884 1.457-8.272-6.064-5.884 8.332-1.151z"/>
                            </svg>
                        )}
                                    즐겨찾기
                    </span>

                                <span onClick={toggleLike} style={{cursor: "pointer", marginRight: "10px"}}>
                        {isLiked ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="red"
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="gray"
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        )}
                                    좋아요 {restaurant.likeCount || 0}
                    </span>

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
                                                    src={`/images/reviews/${review.reviewPhotoName || "default.jpg"}`}
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
                                                                <span
                                                                    className="rating">{parseFloat(review.reviewScore).toFixed(1)}</span>
                                                                <span className="report"
                                                                      onClick={openReportModal}>🚨 신고</span>
                                                            </div>
                                                            <div className="review-actions">
                                                                <button
                                                                    className="edit-btn"
                                                                    onClick={() => handleEditReview(review)}
                                                                >
                                                                    수정
                                                                </button>
                                                                <button className="delete-btn"
                                                                        onClick={() => confirmDeleteReview(review.reviewNumber)}>삭제
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="review-content">{review.reviewContent}</div>
                                                        <div className="review-container">
                                                            {review.reviewPhotoName && (
                                                                <div className="review-image">
                                                                    <a
                                                                        href={`/images/reviews/${review.reviewPhotoName || "default.jpg"}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <img
                                                                            src={`/images/reviews/${review.reviewPhotoName || "default.jpg"}`}
                                                                            alt="리뷰 이미지"
                                                                        />
                                                                    </a>
                                                                </div>
                                                            )}
                                                            <div className="review-footer">
                                                                <span className="like" style={{cursor: "pointer"}}>
                                                                    {review.isLiked ? (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="18"
                                                                            height="18"
                                                                            viewBox="0 0 24 24"
                                                                            fill="red"
                                                                        >
                                                                            <path
                                                                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                                            />
                                                                        </svg>
                                                                    ) : (
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="18"
                                                                            height="18"
                                                                            viewBox="0 0 24 24"
                                                                            fill="gray"
                                                                        >
                                                                            <path
                                                                                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                                            />
                                                                        </svg>
                                                                    )}
                                                                    좋아요 {review.reviewLikes || 0}
                                                                </span>
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
                                <select
                                    className="review-write-rating-select"
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                                >
                                    <option value="">별점 선택</option>
                                    {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
                                        <option key={rating} value={rating}>
                                            {rating}
                                        </option>
                                    ))}
                                </select>
                                <label className="review-write-image-upload-label">
                                    이미지 첨부
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="review-write-image-upload-input"
                                        onChange={handleFileChange}
                                        style={{display: "none"}}
                                    />
                                </label>
                                {/* 선택된 파일 이름 표시 */}
                                {selectedImageName && (
                                    <p className="selected-image-name">선택된 파일: {selectedImageName}</p>
                                )}
                            </div>
                            <textarea
                                placeholder="내용을 입력해주세요"
                                className="review-write-content-input"
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                            ></textarea>
                            <div className="review-write-modal-footer">
                                <button className="cancel-btn" onClick={closeWriteReviewModal}>
                                    취소
                                </button>
                                <button className="submit-btn" onClick={handleReviewSubmit}>
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showEditReviewModal && (
                <div className="modal-overlay">
                    <div className="review-edit-modal-content">
                        <div className="review-edit-modal-header">
                            <h2>리뷰 수정</h2>
                            <button
                                className="close-review-edit-modal"
                                onClick={closeEditReviewModal}
                            >
                                X
                            </button>
                        </div>
                        <div className="review-edit-modal-body">
                            <div className="review-edit-actions">
                                <select
                                    className="review-edit-rating-select"
                                    value={selectedRating}
                                    onChange={(e) => setSelectedRating(Number(e.target.value))}
                                >
                                    <option value="">별점 선택</option>
                                    {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((rating) => (
                                        <option key={rating} value={rating}>
                                            {rating}
                                        </option>
                                    ))}
                                </select>
                                <label className="review-edit-image-upload-label">
                                    이미지 변경
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="review-edit-image-upload-input"
                                        onChange={handleFileChange}
                                        style={{ display: "none" }}
                                    />
                                </label>
                                {selectedImageName && (
                                    <p className="selected-image-name">
                                        현재 파일: {selectedImageName}
                                    </p>
                                )}
                            </div>
                            <textarea
                                placeholder="내용을 입력해주세요"
                                className="review-edit-content-input"
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                            ></textarea>
                            <div className="review-edit-modal-footer">
                                <button className="cancel-btn" onClick={closeEditReviewModal}>
                                    취소
                                </button>
                                <button className="submit-btn" onClick={handleUpdateReview}>
                                    수정
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetail;