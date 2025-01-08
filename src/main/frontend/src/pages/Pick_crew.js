import DiningLayout from '../layouts/DiningLayout';
import "../css/Pick_crew.css";

function Pick_crew() {
    return(
        <DiningLayout>
            <div class="myc_container">
                <div class="my_top">
                    <p class="my_crew">나의 크루</p>
                    <div class="crew_btn">
                        <button type="button" class="btn">탈퇴하기</button>
                        <button type="button" class="btn">만들기</button>
                    </div>
                </div>
                <p class="my_info">나의 음식 정보 공유 그룹을 확인하세요.</p>
            </div>
            <div class="bottom_menu">
                <input type="text" class="pick_search" />
                <div class="bm_con">
                    <p class="bm_title">인기 크루</p>
                    <ul class="bm_category">
                        <li>전체</li>
                        <li>한식</li>
                        <li>중식</li>
                        <li>일식</li>
                        <li>디저트</li>
                        <li>맛집</li>
                        <li>비건</li>
                    </ul>
                </div>
                <div class="bm_crewlist">
                    <card>
                        크루 1
                    </card>
                    <card>
                        크루 2
                    </card>
                    <card>
                        크루 3
                    </card>
                </div>
            </div>
        </DiningLayout>
    );
}

export default Pick_crew;
