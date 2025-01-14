import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
        <div>
            <h1>{restaurant.name}</h1>
            <p>영업시간: {restaurant.openTime}</p>
            <p>휴무일: {restaurant.offDays}</p>
            <p>휴게시간: {restaurant.breakTime}</p>
            <p>주소: {restaurant.address} (지번: {restaurant.oldAddress})</p>
            <p>전화번호: {restaurant.phoneNumber}</p>
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
                <p>홈페이지: {restaurant.homepage || "정보 없음"}</p>
            )}
            <p>주차: {restaurant.parkingInfo}</p>
            <p>관련 태그: {restaurant.tags}</p>
        </div>
    );
};

export default RestaurantDetail;