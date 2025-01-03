import React from "react";
import DiningLayout from "../layouts/DiningLayout";
import "../css/UserProfile.css";

function UserProfile() {
    return (
        <DiningLayout>
            <div className="mypage-container">
                <div className="profile-section">
                    {/* 프로필 왼쪽 */}
                    <div className="profile-left">
                        <div className="profile-picture">
                            <span>프로필 사진</span>
                        </div>
                        <div className="profile-tier">실버</div>
                    </div>

                    {/* 프로필 오른쪽 */}
                    <div className="profile-right">
                        <p>팔로워: <span>XX명</span></p>
                        <p>지역: 천안시</p>
                        <p>리뷰 작성: <span>XX개</span></p>
                        <p>댓글 작성: <span>XX개</span></p>
                        <p>좋아요: <span>XX개</span></p>
                    </div>
                </div>

                {/* 버튼 */}
                <div className="action-buttons">
                    <button className="action-btn">1 🤝 팔로우</button>
                    <button className="action-btn">2 ❤️ 좋아요</button>
                </div>
            </div>
        </DiningLayout>
    );
}

export default UserProfile;
