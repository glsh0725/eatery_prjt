import React from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/MyPage.css";

function MyPage() {
    return (
        <DiningLayout>
        <div className="mypage-container">
            <h1 className="mypage-title">마이페이지</h1>
            <div className="profile-section">
                <div className="profile-left">
                    <div className="profile-picture">
                        <span>프로필 사진</span>
                    </div>
                    <div className="profile-tier">실버</div>
                </div>
                <div className="profile-right">
                    <p>팔로워: <span>XX명</span></p>
                    <p>
                        지역:
                        <select>
                            <option>선택</option>
                            <option>지역 1</option>
                            <option>지역 2</option>
                        </select>
                    </p>
                    <p>리뷰 작성: <span>XX개</span></p>
                    <p>댓글 작성: <span>XX개</span></p>
                    <p>좋아요: <span>XX개</span></p>
                </div>
            </div>
            <div className="action-buttons">
                <button className="action-btn">리뷰 작성 내역</button>
                <button className="action-btn">댓글 작성 내역</button>
            </div>
        </div>
        </DiningLayout>
    );
}

export default MyPage;
