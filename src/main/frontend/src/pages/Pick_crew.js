import DiningLayout from '../layouts/DiningLayout';
import React, { useState } from 'react';
import "../css/Pick_crew.css";

function Pick_crew() {
    const [selBtn, setSelBtn] = useState(1);
    const handleBtn = (btnId) => {
        setSelBtn(btnId);
      };
    return(
        <DiningLayout>
            <div class="myc_container">
                <div class="my_top">
                    <p class="my_crew">나의 크루</p>
                    <div class="crew_btn">
                        <button type="button" class="mc_btn">탈퇴하기</button>
                        <button type="button" class="mc_btn">만들기</button>
                    </div>
                </div>
                <img class="mc_img" src="https://cdn.pixabay.com/photo/2019/01/06/21/54/cookies-3918049_1280.jpg" />
                <p class="my_info">나의 음식 정보 공유 그룹을 확인하세요.</p>
            </div>
            <div class="bottom_menu">
                <input type="text" class="pick_search" placeholder="크루 검색 구현" />
                <div class="bm_con">
                    <p class="bm_title">인기 크루</p>
                        <button onClick={() => handleBtn(1)}
                            class={`bm_btn ${selBtn === 1 ? 'active' : ''}`}>전체</button>
                        <button onClick={() => handleBtn(2)}
                            class={`bm_btn ${selBtn === 2 ? 'active' : ''}`}>한식</button>
                        <button onClick={() => handleBtn(3)}
                            class={`bm_btn ${selBtn === 3 ? 'active' : ''}`}>중식</button>
                        <button onClick={() => handleBtn(4)}
                            class={`bm_btn ${selBtn === 4 ? 'active' : ''}`}>일식</button>
                        <button onClick={() => handleBtn(5)}
                            class={`bm_btn ${selBtn === 5 ? 'active' : ''}`}>디저트</button>
                        <button onClick={() => handleBtn(6)}
                            class={`bm_btn ${selBtn === 6 ? 'active' : ''}`}>맛집</button>
                        <button onClick={() => handleBtn(7)}
                            class={`bm_btn ${selBtn === 7 ? 'active' : ''}`}>비건</button>
                </div>
                <div class="bm_cardlist">
                    <card class="cl_card">
                        <img src="https://cdn.pixabay.com/photo/2023/09/26/20/05/tomatoes-8278168_1280.jpg" />
                        <div class="txt_right">
                            <div class="txt_title">맛집탐방</div>
                            <ul class="txt_elem">
                                <li>좋아요 23</li>
                                <li>참여인원 33</li>
                            </ul>
                        </div>
                    </card>
                </div>
            </div>
        </DiningLayout>
    );
}

export default Pick_crew;
