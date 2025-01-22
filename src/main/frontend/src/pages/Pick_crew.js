import DiningLayout from '../layouts/DiningLayout';
import React, { useState } from 'react';
import "../css/Pick_crew.css";

function Pick_crew() {
    const [selBtn, setSelBtn] = useState(1);

    const handleBtn = (btnId) => {
        setSelBtn(btnId);
    };

    const showAlert = () => {
        alert("준비 중입니다.");
    };

    return (
        <DiningLayout>
            <div className="myc_container">
                <div className="my_top">
                    <p className="my_crew">나의 크루</p>
                    <div className="crew_btn">
                        <button type="button" className="mc_btn" onClick={showAlert}>
                            탈퇴하기
                        </button>
                        <button type="button" className="mc_btn" onClick={showAlert}>
                            만들기
                        </button>
                    </div>
                </div>
                <img
                    className="mc_img"
                    src="https://cdn.pixabay.com/photo/2019/01/06/21/54/cookies-3918049_1280.jpg"
                    alt="크루 이미지"
                    onClick={showAlert}
                />
                <p className="my_info">나의 음식 정보 공유 그룹을 확인하세요.</p>
            </div>
            <div className="bottom_menu">
                <input
                    type="text"
                    className="pick_search"
                    placeholder="크루 검색 구현"
                    onClick={showAlert}
                />
                <div className="bm_con">
                    <p className="bm_title">인기 크루</p>
                    <button onClick={() => handleBtn(1)} className={`bm_btn ${selBtn === 1 ? 'active' : ''}`}>전체</button>
                    <button onClick={() => handleBtn(2)} className={`bm_btn ${selBtn === 2 ? 'active' : ''}`}>한식</button>
                    <button onClick={() => handleBtn(3)} className={`bm_btn ${selBtn === 3 ? 'active' : ''}`}>중식</button>
                    <button onClick={() => handleBtn(4)} className={`bm_btn ${selBtn === 4 ? 'active' : ''}`}>일식</button>
                    <button onClick={() => handleBtn(5)} className={`bm_btn ${selBtn === 5 ? 'active' : ''}`}>양식</button>
                    <button onClick={() => handleBtn(6)} className={`bm_btn ${selBtn === 6 ? 'active' : ''}`}>디저트</button>
                    <button onClick={() => handleBtn(7)} className={`bm_btn ${selBtn === 7 ? 'active' : ''}`}>비건</button>
                </div>
                <div className="bm_cardlist">
                    <div className="cl_card" onClick={showAlert}>
                        <img src="https://cdn.pixabay.com/photo/2023/09/26/20/05/tomatoes-8278168_1280.jpg" alt="카드 이미지" />
                        <div className="txt_right">
                            <div className="txt_title">맛집탐방</div>
                            <ul className="txt_elem">
                                <li>좋아요 23</li>
                                <li>참여인원 33</li>
                            </ul>
                        </div>
                    </div>
                    <div className="cl_card" onClick={showAlert}>
                        <img src="https://cdn.pixabay.com/photo/2019/08/15/09/00/pilaf-4407500_1280.jpg" alt="카드 이미지" />
                        <div className="txt_right">
                            <div className="txt_title">초딩입맛</div>
                            <ul className="txt_elem">
                                <li>좋아요 13</li>
                                <li>참여인원 13</li>
                            </ul>
                        </div>
                    </div>
                    <div className="cl_card" onClick={showAlert}>
                        <img src="https://cdn.pixabay.com/photo/2018/12/03/01/04/mandu-3852527_1280.jpg" alt="카드 이미지" />
                        <div className="txt_right">
                            <div className="txt_title">진중한 맛집</div>
                            <ul className="txt_elem">
                                <li>좋아요 33</li>
                                <li>참여인원 13</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </DiningLayout>
    );
}

export default Pick_crew;