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
            <p>주소: {restaurant.address}</p>
            <p>전화번호: {restaurant.phoneNumber}</p>
        </div>
    );
};

export default RestaurantDetail;