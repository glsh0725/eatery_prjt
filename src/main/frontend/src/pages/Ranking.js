import React, { useState } from 'react';
import DiningLayout from '../layouts/DiningLayout';
import '../css/Ranking.css';

const Ranking = () => {
    // 샘플 데이터 (100명의 사용자)
    const reviewRanking = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `유저${i + 1}`,
        profileImage: "https://via.placeholder.com/40", // 프로필 이미지 URL
    }));

    const followRanking = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `유저${i + 1}`,
        profileImage: "https://via.placeholder.com/40",
    }));

    const commentRanking = Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `유저${i + 1}`,
        profileImage: "https://via.placeholder.com/40",
    }));

    // 보여줄 데이터 개수를 관리하는 상태
    const [visibleReviewCount, setVisibleReviewCount] = useState(10);
    const [visibleFollowCount, setVisibleFollowCount] = useState(10);
    const [visibleCommentCount, setVisibleCommentCount] = useState(10);

    // "더보기" 클릭 핸들러
    const loadMore = (setVisibleCount, currentCount) => {
        setVisibleCount(currentCount + 10);
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
                                    <img className="profile-image" src={user.profileImage} alt="프로필" />
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
                                    <img className="profile-image" src={user.profileImage} alt="프로필" />
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
                                    <img className="profile-image" src={user.profileImage} alt="프로필" />
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
            </div>
        </DiningLayout>
    );
};

export default Ranking;
