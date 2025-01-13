import React, { useEffect, useState } from "react";
import axios from "axios";
import regions from "../data/regions.json";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Find_store.css";

const Find_store = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");
    const [selectedTag, setSelectedTag] = useState("전체");
    const [selectedTime, setSelectedTime] = useState("전체");
    const [selectedRegion, setSelectedRegion] = useState("전체");
    const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [isSelectCompleteActive, setIsSelectCompleteActive] = useState(false);
    const itemsPerPage = 8;

    const tags = [
        "전체", "가족모임", "데이트", "상견례", "회식", "카페", "친목모임",
        "코스요리", "점심식사", "혼밥", "안심식당", "노포"
    ];

    const times = ["전체", ...Array.from({ length: 24 }, (_, i) => `${i + 1}시`)];

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

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
        setCurrentPage(1);
    };

    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < Math.ceil(filteredRestaurants.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleRegionSelection = (selection) => {
        setSelectedRegion(selection);
        setIsSelectCompleteActive(true);
    };

    const handleRegionComplete = () => {
        if (!isSelectCompleteActive) return;
        setCurrentPage(1);
        setIsRegionModalOpen(false);
        setSelectedProvince(null);
        setSelectedCity(null);
        setIsSelectCompleteActive(false);
    };

    const closeModal = () => {
        setCurrentPage(1);
        setIsRegionModalOpen(false);
        setSelectedProvince(null);
        setSelectedCity(null);
        setSelectedRegion("전체");
        setIsSelectCompleteActive(false);
    };

    const isTimeWithinRange = (openTime, selectedTime) => {
        if (!openTime || selectedTime === "전체") {
            return true;
        }

        if (!openTime.includes("~")) {
            return false;
        }

        const [start, end] = openTime.split(" ~ ").map((time) => time.trim());
        const selectedHour = parseInt(selectedTime.replace("시", ""), 10);

        if (!start || !end || isNaN(selectedHour)) {
            return false;
        }

        const [startHour] = start.split(":").map(Number);
        const [endHour] = end.split(":").map(Number);

        if (startHour <= endHour) {
            return selectedHour >= startHour && selectedHour <= endHour;
        } else {
            return selectedHour >= startHour || selectedHour <= endHour;
        }
    };

    const filteredRestaurants = restaurants.filter((restaurant) => {
        const matchesTag = selectedTag === "전체" || restaurant.tags?.includes(selectedTag);
        const matchesTime = isTimeWithinRange(restaurant.openTime, selectedTime);
        const matchesRegion = selectedRegion === "전체" ||
            restaurant.address?.includes(selectedRegion) ||
            restaurant.oldAddress?.includes(selectedRegion.split(" ").pop());
        return matchesTag && matchesTime && matchesRegion;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredRestaurants.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <DiningLayout>
            <div className="find-store-container">
                <div className="header">
                    <span>
                        방문시간 선택{" "}
                        <select className="time-select" value={selectedTime} onChange={handleTimeChange}>
                            {times.map((time, index) => (
                                <option key={index} value={time}>
                                    {time}
                                </option>
                            ))}
                        </select>
                        {"　　　"}
                    </span>
                    <span>
                        현재 보고 있는 지역은{" "}
                        <button className="region-select" onClick={() => setIsRegionModalOpen(true)}>
                            {selectedRegion === "전체" ? "지역 선택" : selectedRegion}
                        </button>{" "}
                        입니다.{"　　"}
                    </span>
                </div>
                <div className="tag-container">
                    {tags.map((tag, index) => (
                        <button
                            key={index}
                            className={`tag-button ${selectedTag === tag ? "active" : ""}`}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
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
                    style={{
                        visibility: currentPage === Math.ceil(filteredRestaurants.length / itemsPerPage) ? "hidden" : "visible",
                    }}
                >
                    ▶
                </div>

                {isRegionModalOpen && (
                    <div className="region-modal">
                        <div className="region-modal-content">
                            <button className="close-modal" onClick={closeModal}>
                                X
                            </button>
                            {!selectedProvince && (
                                <div>
                                    {Object.keys(regions).map((province) => (
                                        <button
                                            key={province}
                                            onClick={() => {
                                                setSelectedProvince(province);
                                                handleRegionSelection(province);
                                            }}
                                        >
                                            {province}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {selectedProvince && !selectedCity && (
                                <div>
                                    {Object.keys(regions[selectedProvince]).map((city) => (
                                        <button
                                            key={city}
                                            onClick={() => {
                                                setSelectedCity(city);
                                                handleRegionSelection(`${selectedProvince} ${city}`);
                                            }}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            )}
                            {selectedCity && (
                                <div>
                                    {regions[selectedProvince][selectedCity].map((area) => (
                                        <button
                                            key={area}
                                            onClick={() =>
                                                handleRegionSelection(`${selectedProvince} ${selectedCity} ${area}`)
                                            }
                                        >
                                            {area}
                                        </button>
                                    ))}
                                </div>
                            )}
                            <button
                                className={`select-complete ${isSelectCompleteActive ? "active" : ""}`}
                                onClick={handleRegionComplete}
                                disabled={!isSelectCompleteActive}
                            >
                                선택 완료
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DiningLayout>
    );
};

export default Find_store;