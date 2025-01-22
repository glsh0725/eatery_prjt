import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Main.css";

const Main = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [hotIndex, setHotIndex] = useState(0);
    const [soloIndex, setSoloIndex] = useState(0);
    const [safeIndex, setSafeIndex] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:18080/api/restaurants-with-reviews")
            .then((response) => {
                setRestaurants(response.data);
            })
            .catch((error) => {
                console.error("Error fetching restaurants:", error);
            });
    }, []);

    const handleNext = (setIndex, index, items) => {
        if (index + 4 < items.length) {
            setIndex(index + 1);
        }
    };

    const handlePrev = (setIndex, index) => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const handleCardClick = (restaurantName) => {
        navigate(`/find_store/${restaurantName}`);
    };

    const renderCategory = (title, filteredRestaurants, index, setIndex) => {
        return (
            <div className="main-category-section">
                <h2 className="main-category-title">{title}</h2>
                <div className="main-carousel-container">
                    <button
                        className="main-arrow-button main-left-arrow"
                        onClick={() => handlePrev(setIndex, index)}
                        disabled={index === 0}
                    >
                        ◀
                    </button>
                    <div className="main-card-list">
                        {filteredRestaurants
                            .slice(index, index + 4)
                            .map((restaurant) => (
                                <div
                                    key={restaurant.id}
                                    className="main-card"
                                    onClick={() => handleCardClick(restaurant.name)}
                                >
                                    <img
                                        src={
                                            restaurant.photoName === "default.jpg"
                                                ? "/images/default.jpg"
                                                : `/images/restaurant/${restaurant.photoName}`
                                        }
                                        alt={restaurant.name}
                                        className="main-card-image"
                                    />
                                    <h3 className="main-card-title">{restaurant.name}</h3>
                                    <p className="main-card-menu">
                                        대표메뉴: {restaurant.category || "정보 없음"}
                                    </p>
                                    <h3 className="main-card-rating">
                                        ⭐
                                        {restaurant.reviews?.length > 0 &&
                                        restaurant.reviews.reduce((sum, review) => sum + review.reviewScore, 0) > 0
                                            ? (
                                                restaurant.reviews.reduce((sum, review) => sum + review.reviewScore, 0) /
                                                restaurant.reviews.length
                                            ).toFixed(1)
                                            : restaurant.scoreNumber}
                                    </h3>
                                </div>
                            ))}
                    </div>
                    <button
                        className="main-arrow-button main-right-arrow"
                        onClick={() =>
                            handleNext(setIndex, index, filteredRestaurants)
                        }
                        disabled={index + 4 >= filteredRestaurants.length}
                    >
                        ▶
                    </button>
                </div>
            </div>
        );
    };

    const hotRestaurants = restaurants
        .slice()
        .sort(
            (a, b) =>
                b.reviews?.length - a.reviews?.length || b.scoreNumber - a.scoreNumber
        );

    const soloRestaurants = restaurants.filter((restaurant) =>
        restaurant.tags?.includes("혼밥")
    );

    const safeRestaurants = restaurants.filter((restaurant) =>
        restaurant.tags?.includes("안심식당")
    );

    return (
        <DiningLayout>
            <div className="main-container">
                {renderCategory(
                    "HOT 음식점 추천",
                    hotRestaurants,
                    hotIndex,
                    setHotIndex
                )}
                {renderCategory(
                    "혼밥 식당 추천",
                    soloRestaurants,
                    soloIndex,
                    setSoloIndex
                )}
                {renderCategory(
                    "안심식당 추천",
                    safeRestaurants,
                    safeIndex,
                    setSafeIndex
                )}
            </div>
        </DiningLayout>
    );
};

export default Main;