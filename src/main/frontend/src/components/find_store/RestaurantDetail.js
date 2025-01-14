import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../css/RestaurantDetail.css";

const RestaurantDetail = () => {
    const { name } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get(`http://localhost:18080/api/restaurants/${name}`)
            .then((response) => setRestaurant(response.data))
            .catch((err) => setError(err.message));
    }, [name]);

    if (error) {
        return <div>오류: {error}</div>;
    }

    if (!restaurant) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="restaurant-detail">
            <div className="top-section">
                <div className="image-box">이미지</div>
                <div className="map-box">지도</div>
            </div>
            <div className="title-and-actions">
                <h2>
                    {restaurant.name} <span className="rating">{restaurant.rating || "5.0"}</span>
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
                    <p>주소: {restaurant.address || "정보 없음"} (지번: {restaurant.oldAddress || "정보 없음"})</p>
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
                        <h3>리뷰 (8)</h3>
                        <button className="review-button">리뷰 작성 ∨</button>
                    </div>
                    <div className="review-list">
                        <div className="review-item">
                            <p>
                                닉네임 <span className="rating">5.0</span>
                            </p>
                            <div className="review-content">
                                리뷰 내용
                            </div>
                            <div className="review-image">이미지</div>
                            <div className="review-actions">❤️ 좋아요 20</div>
                        </div>
                        <div className="review-item">
                            <p>
                                닉네임 <span className="rating">4.8</span>
                            </p>
                            <p>리뷰 내용</p>
                            <div className="review-actions">❤️ 좋아요 9</div>
                        </div>
                    </div>
                    <button className="more-reviews">리뷰 더보기 +</button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetail;