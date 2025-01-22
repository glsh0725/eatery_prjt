import React, { useState } from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/Ranking.css";

const Ranking = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);

    const reviewRanking = [
        { id: 1, name: "맛집왕", profileImage: "" },
        { id: 2, name: "밥순이", profileImage: "" },
        { id: 3, name: "칠가이", profileImage: "" },
        { id: 4, name: "스시러버", profileImage: "" },
        { id: 5, name: "맛집탐방가", profileImage: "" },
        { id: 6, name: "한식매니아", profileImage: "" },
        { id: 7, name: "피자킬러", profileImage: "" },
        { id: 8, name: "디저트홀릭", profileImage: "" },
        { id: 9, name: "양식왕", profileImage: "" },
        { id: 10, name: "국밥러버", profileImage: "" },
        { id: 11, name: "치킨매니아", profileImage: "" },
        { id: 12, name: "베이커리러버", profileImage: "" },
        { id: 13, name: "커피마니아", profileImage: "" },
        { id: 14, name: "테라스뷰", profileImage: "" },
        { id: 15, name: "스테이크사랑꾼", profileImage: "" },
    ];

    const followRanking = [
        { id: 1, name: "맛탐정", profileImage: "" },
        { id: 2, name: "한식러버", profileImage: "" },
        { id: 3, name: "카페러버", profileImage: "" },
        { id: 4, name: "푸드판다", profileImage: "" },
        { id: 5, name: "고기러버", profileImage: "" },
        { id: 6, name: "밥사랑", profileImage: "" },
        { id: 7, name: "치즈러버", profileImage: "" },
        { id: 8, name: "감성맛집러", profileImage: "" },
        { id: 9, name: "파스타매니아", profileImage: "" },
        { id: 10, name: "후라이드킹", profileImage: "" },
        { id: 11, name: "소울푸드러버", profileImage: "" },
        { id: 12, name: "베이커리매니아", profileImage: "" },
        { id: 13, name: "중식러버", profileImage: "" },
        { id: 14, name: "분식왕", profileImage: "" },
        { id: 15, name: "커피러버", profileImage: "" },
    ];

    const commentRanking = [
        { id: 1, name: "카페탐험가", profileImage: "" },
        { id: 2, name: "수제버거러버", profileImage: "" },
        { id: 3, name: "스시사랑꾼", profileImage: "" },
        { id: 4, name: "떡볶이광", profileImage: "" },
        { id: 5, name: "치킨홀릭", profileImage: "" },
        { id: 6, name: "국밥킹", profileImage: "" },
        { id: 7, name: "감성디저트러버", profileImage: "" },
        { id: 8, name: "해산물왕", profileImage: "" },
        { id: 9, name: "고기러버", profileImage: "" },
        { id: 10, name: "피자매니아", profileImage: "" },
        { id: 11, name: "양식사랑", profileImage: "" },
        { id: 12, name: "스테이크광", profileImage: "" },
        { id: 13, name: "튀김러버", profileImage: "" },
        { id: 14, name: "일식마니아", profileImage: "" },
        { id: 15, name: "테라스러버", profileImage: "" },
    ];

    // 보여줄 데이터 개수를 관리하는 상태
    const [visibleReviewCount, setVisibleReviewCount] = useState(10);
    const [visibleFollowCount, setVisibleFollowCount] = useState(10);
    const [visibleCommentCount, setVisibleCommentCount] = useState(10);

    // "더보기" 클릭 핸들러
    const loadMore = (setVisibleCount, currentCount) => {
        setVisibleCount(currentCount + 10);
    };

    const handleProfileClick = (user) => {
        setSelectedUser(user);
        setProfileModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setProfileModalOpen(false);
    };

    return (
        <DiningLayout>
            <div className="ranking-container">
                <div className="ranking-section">
                    {/* 리뷰 랭킹 */}
                    <div className="ranking-box">
                        <h2>리뷰 랭킹 TOP 100</h2>
                        <div className="ranking-list">
                            {reviewRanking.slice(0, visibleReviewCount).map((user) => (
                                <div className="ranking-item" key={user.id}>
                                    <span className="ranking-rank">{user.id}</span>
                                    <img
                                        className="profile-image"
                                        src={user.profileImage || "/images/chillguy.jpg"}
                                        alt="프로필"
                                        onClick={() => handleProfileClick(user)}
                                        style={{cursor: 'pointer'}}
                                    />
                                    <span className="ranking-user">{user.name}</span>
                                </div>
                            ))}
                        </div>
                        {visibleReviewCount < reviewRanking.length && (
                            <button
                                className="load-more-btn"
                                onClick={() => loadMore(setVisibleReviewCount, visibleReviewCount)}
                            >
                                더보기
                            </button>
                        )}
                    </div>

                    {/* 팔로우 랭킹 */}
                    <div className="ranking-box">
                        <h2>팔로우 랭킹 TOP 100</h2>
                        <div className="ranking-list">
                            {followRanking.slice(0, visibleFollowCount).map((user) => (
                                <div className="ranking-item" key={user.id}>
                                    <span className="ranking-rank">{user.id}</span>
                                    <img
                                        className="profile-image"
                                        src={user.profileImage || "/images/chillguy.jpg"}
                                        alt="프로필"
                                        onClick={() => handleProfileClick(user)}
                                        style={{cursor: 'pointer'}}
                                    />
                                    <span className="ranking-user">{user.name}</span>
                                </div>
                            ))}
                        </div>
                        {visibleFollowCount < followRanking.length && (
                            <button
                                className="load-more-btn"
                                onClick={() => loadMore(setVisibleFollowCount, visibleFollowCount)}
                            >
                                더보기
                            </button>
                        )}
                    </div>

                    {/* 댓글 랭킹 */}
                    <div className="ranking-box">
                        <h2>댓글 랭킹 TOP 100</h2>
                        <div className="ranking-list">
                            {commentRanking.slice(0, visibleCommentCount).map((user) => (
                                <div className="ranking-item" key={user.id}>
                                    <span className="ranking-rank">{user.id}</span>
                                    <img
                                        className="profile-image"
                                        src={user.profileImage || "/images/chillguy.jpg"}
                                        alt="프로필"
                                        onClick={() => handleProfileClick(user)}
                                        style={{cursor: 'pointer'}}
                                    />
                                    <span className="ranking-user">{user.name}</span>
                                </div>
                            ))}
                        </div>
                        {visibleCommentCount < commentRanking.length && (
                            <button
                                className="load-more-btn"
                                onClick={() => loadMore(setVisibleCommentCount, visibleCommentCount)}
                            >
                                더보기
                            </button>
                        )}
                    </div>
                </div>

                {/* 프로필 모달 */}
                {isProfileModalOpen && selectedUser && (
                    <div className="ranking-modal-overlay" onClick={closeModal}>
                        <div className="ranking-modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-btn" onClick={closeModal}>
                                닫기
                            </button>
                            <div className="profile-modal">
                                <h1 className="profile-title">프로필</h1>
                                <div className="profile-section">
                                    <div className="profile-left">
                                        <div className="profile-picture">
                                            <img
                                                src={selectedUser.profileImage || "/images/chillguy.jpg"}
                                                alt="프로필"
                                            />
                                        </div>
                                        <div className="profile-tier">
                                            <img src="/images/silver.png" alt="실버" className="silver_image"/>
                                            실버
                                        </div>
                                    </div>
                                    <div className="profile-right">
                                        <p>닉네임: <span>{selectedUser.name}</span></p>
                                        <p>팔로워: <span>25명</span></p>
                                        <p>팔로잉: <span>23명</span></p>
                                        <p>
                                            지역 : 충남 천안시
                                        </p>
                                        <p>리뷰 작성: <span>12개</span></p>
                                        <p>좋아요: <span>43개</span></p>
                                    </div>
                                </div>

                                {/* 하단 버튼 */}
                                <div className="action-buttons">
                                    <button className="action-btn">🤝팔로우</button>
                                    <button className="action-btn">❤️좋아요</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DiningLayout>
    );
};

export default Ranking;
