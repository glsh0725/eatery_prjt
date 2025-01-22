import React, { useState } from "react";
import DiningLayout from "../layouts/DiningLayout";
import regions from "../data/regions.json";
import "../css/MyPage.css";

function MyPage() {
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [isFavoriteModalOpen, setFavoriteModalOpen] = useState(false);
    const [isFollowModalOpen, setFollowModalOpen] = useState(false);

    // 지역 상태
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);

    // 샘플 데이터
    const reviewList = [
        { id: 1, text: "매우 맛있고 깔끔한 분위기였어요!", link: "/review/1" },
        { id: 2, text: "친절한 직원 덕분에 기분 좋게 식사했습니다.", link: "/review/2" },
        { id: 3, text: "음식이 정성스럽고 정말 맛있었어요.", link: "/review/3" },
        { id: 4, text: "재료가 신선해서 더 좋았던 식당이에요.", link: "/review/4" },
        { id: 5, text: "분위기가 좋아서 데이트 장소로 딱이에요.", link: "/review/5" },
        { id: 6, text: "다음에도 꼭 방문하고 싶은 곳이에요.", link: "/review/6" },
        { id: 7, text: "특별한 날에 가기 좋은 레스토랑입니다.", link: "/review/7" },
        { id: 8, text: "메뉴가 다양해서 고르는 재미가 있었어요.", link: "/review/8" },
        { id: 9, text: "조용하고 아늑해서 가족 모임에 적합해요.", link: "/review/9" },
        { id: 10, text: "가격 대비 퀄리티가 정말 좋았어요.", link: "/review/10" },
        { id: 11, text: "디저트까지 완벽한 한 끼를 즐겼습니다.", link: "/review/11" },
        { id: 12, text: "음식의 비주얼도 훌륭해서 사진 찍기 좋았어요.", link: "/review/12" },
    ];
    const favoriteList = [
        { id: 1, text: "징기스칸", link: "/favorite/1" },
        { id: 2, text: "달식당", link: "/favorite/2" },
        { id: 3, text: "스시린", link: "/favorite/3" },
        { id: 4, text: "모카빈", link: "/favorite/4" },
        { id: 5, text: "참숯갈비", link: "/favorite/5" },
        { id: 6, text: "블루문", link: "/favorite/6" },
        { id: 7, text: "떡볶이랑", link: "/favorite/7" },
        { id: 8, text: "빵굽는마을", link: "/favorite/8" },
        { id: 9, text: "황룡각", link: "/favorite/9" },
        { id: 10, text: "레인보우", link: "/favorite/10" },
        { id: 11, text: "파스타의집", link: "/favorite/11" },
        { id: 12, text: "스시하루", link: "/favorite/12" },
        { id: 13, text: "한우리", link: "/favorite/13" },
        { id: 14, text: "황금치킨", link: "/favorite/14" },
        { id: 15, text: "족발천국", link: "/favorite/15" },
        { id: 16, text: "면사랑", link: "/favorite/16" },
        { id: 17, text: "화덕피자소울", link: "/favorite/17" },
        { id: 18, text: "르블랑", link: "/favorite/18" },
        { id: 19, text: "바다의맛", link: "/favorite/19" },
        { id: 20, text: "풍성한날", link: "/favorite/20" },
        { id: 21, text: "쌀국수향기", link: "/favorite/21" },
        { id: 22, text: "그릴앤스모크", link: "/favorite/22" },
        { id: 23, text: "테라스뷰", link: "/favorite/23" },
    ];
    const followList = [
        { id: 1, text: "푸드러버", link: "/follow/1" },
        { id: 2, text: "맛집탐방가", link: "/follow/2" },
        { id: 3, text: "스시광", link: "/follow/3" },
        { id: 4, text: "칠가이", link: "/follow/4" },
        { id: 5, text: "카페홀릭", link: "/follow/5" },
        { id: 6, text: "피자러버", link: "/follow/6" },
        { id: 7, text: "디저트마니아", link: "/follow/7" },
        { id: 8, text: "맛집러", link: "/follow/8" },
        { id: 9, text: "양식마스터", link: "/follow/9" },
        { id: 10, text: "한식애호가", link: "/follow/10" },
        { id: 11, text: "중식매니아", link: "/follow/11" },
        { id: 12, text: "빵순이", link: "/follow/12" },
        { id: 13, text: "치킨홀릭", link: "/follow/13" },
        { id: 14, text: "고기러버", link: "/follow/14" },
        { id: 15, text: "미식가", link: "/follow/15" },
        { id: 16, text: "맛집파인더", link: "/follow/16" },
        { id: 17, text: "국밥매니아", link: "/follow/17" },
        { id: 18, text: "테라스러버", link: "/follow/18" },
        { id: 19, text: "카페매니아", link: "/follow/19" },
        { id: 20, text: "소울푸드러버", link: "/follow/20" },
        { id: 21, text: "스테이크홀릭", link: "/follow/21" },
        { id: 22, text: "비빔밥러버", link: "/follow/22" },
        { id: 23, text: "고기킬러", link: "/follow/23" },
    ];

    const handleProvinceChange = (province) => {
        setSelectedProvince(province);
        setSelectedCity(null);
        setSelectedArea(null);
    };

    const handleCityChange = (city) => {
        setSelectedCity(city);
        setSelectedArea(null);
    };

    const handleAreaChange = (area) => {
        setSelectedArea(area);
    };

    return (
        <DiningLayout>
            <div className="mypage-container">
                <h1 className="mypage-title">마이페이지</h1>
                <div className="profile-section">
                    <div className="profile-left">
                        <div className="profile-picture">
                            <span>프로필 사진</span>
                        </div>
                        <div className="profile-tier"><img src="/images/silver.png" alt="실버" className="silver_image"/>실버
                        </div>
                    </div>
                    <div className="profile-right">
                        <p>팔로워: <span>25명</span></p>
                        <p>팔로잉: <span>23명</span></p>
                        <p>
                            지역 선택:
                            <select
                                value={selectedProvince || ""}
                                onChange={(e) => handleProvinceChange(e.target.value)}
                            >
                                <option value="">광역시도 선택</option>
                                {Object.keys(regions).map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>

                            {selectedProvince && (
                                <select
                                    value={selectedCity || ""}
                                    onChange={(e) => handleCityChange(e.target.value)}
                                >
                                    <option value="">시군구 선택</option>
                                    {Object.keys(regions[selectedProvince]).map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </p>
                        <p>리뷰 작성: <span>12개</span></p>
                        <p>좋아요: <span>43개</span></p>
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
                        onClick={() => setFavoriteModalOpen(true)}
                    >
                        즐겨찾기 내역
                    </button>
                    <button
                        className="action-btn"
                        onClick={() => setFollowModalOpen(true)}
                    >
                        팔로잉 내역
                    </button>
                </div>

                {/* 리뷰 작성 내역 모달 */}
                {isReviewModalOpen && (
                    <div className="modal-overlay" onClick={() => setReviewModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span>리뷰 작성 내역</span>
                            <button onClick={() => setReviewModalOpen(false)}>닫기</button>
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
                        </div>
                    </div>
                )}

                {/* 즐겨찾기 내역 모달 */}
                {isFavoriteModalOpen && (
                    <div className="modal-overlay" onClick={() => setFavoriteModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span>즐겨찾기 내역</span>
                            <button onClick={() => setFavoriteModalOpen(false)}>닫기</button>
                            <ul>
                                {favoriteList.map((favorite) => (
                                    <li key={favorite.id}>
                                        {favorite.text}
                                        <a href={favorite.link} className="go-to-favorite">
                                            바로가기
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {/* 팔로우 내역 모달 */}
                {isFollowModalOpen && (
                    <div className="modal-overlay" onClick={() => setFollowModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <span>팔로잉 내역</span>
                            <button onClick={() => setFollowModalOpen(false)}>닫기</button>
                            <ul>
                                {followList.map((follow) => (
                                    <li key={follow.id}>
                                        {follow.text}
                                        <a href={follow.link} className="go-to-follow">
                                            바로가기
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </DiningLayout>
    );
}

export default MyPage;