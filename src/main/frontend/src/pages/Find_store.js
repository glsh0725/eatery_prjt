import React, { useEffect, useState } from "react";
import axios from "axios";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Find_store.css";

const Find_store = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");
    const itemsPerPage = 8;

    useEffect(() => {
        axios.get("http://localhost:18080/api/restaurants")
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                setError(error.message);
                console.error("Error fetching restaurants:", error);
            });
    }, []);

    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < Math.ceil(restaurants.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = restaurants.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <DiningLayout>
            <div className="find-store-container">
                <div
                    className="left-arrow"
                    onClick={() => handlePageChange("prev")}
                    style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}
                >
                    ◀
                </div>
                <div className="restaurant-list">
                    {error && <p className="error-message">오류: {error}</p>}
                    {currentItems.map((restaurant, index) => (
                        <div key={index} className="restaurant-card">
                            <img
                                src={`/images/restaurant/${restaurant.photoName || "default.jpg"}`}
                                alt={restaurant.name}
                            />
                            <h2>{restaurant.name}</h2>
                            <p>대표메뉴: {restaurant.category || "정보 없음"}</p>
                            <h3>⭐ </h3>
                        </div>
                    ))}
                </div>
                <div
                    className="right-arrow"
                    onClick={() => handlePageChange("next")}
                    style={{ visibility: currentPage === Math.ceil(restaurants.length / itemsPerPage) ? "hidden" : "visible" }}
                >
                    ▶
                </div>
            </div>
        </DiningLayout>
    );
};

export default Find_store;