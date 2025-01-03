import React, { useState } from 'react';
import DiningLayout from '../layouts/DiningLayout';
import Box from '../components/find_store/Find';
import Tags from '../components/find_store/Find';
import "../css/Find_store.css";


const Find_store = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <DiningLayout>
      <div className="container">
        <div className="tags">
          <div className="tag active">전체</div>
          <div className="tag">혼밥</div>
          <div className="tag">데이트</div>
          <div className="tag">남자 모임</div>
          <div className="tag">여자 모임</div>
          <div className="tag">신상 맛집</div>
        </div>
        <div className="tags">
          <div className="tag">가족외식</div>
          <div className="tag">회식</div>
          <div className="tag">해장</div>
          <div className="tag">분위기 좋은</div>
          <div className="tag">기념일</div>
          <div className="tag">코스요리</div>
        </div>

        {/* All Cards Section */}
        <div className="all">
          {/* 혼밥 그룹 */}
          <div className="cardall">
            <div className="select">
              <h3 className="group-title">혼밥</h3>
            </div>
            <div className="card">
              <Box num={1} name="신상 맛집" message="비밀번호 찾기를 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.5/5</span>
              </div>
            </div>
            <div className="card">
              <Box num={2} name="신상 맛집" message="비밀번호 찾기를 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.2/5</span>
              </div>
            </div>
            <div className="card">
              <Box num={3} name="신상 맛집" message="비밀번호 찾기를 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.7/5</span>
              </div>
            </div>
            <div className="card">
              <Box num={4} name="신상 맛집" message="카카오 로그인을 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.3/5</span>
              </div>
            </div>
          </div>
           <div className="pagination">
             <button className="previous">이전</button>
             <button className="next">다음</button>
           </div>

          <div className="cardtwo">
            <div className="select">
              <h3 className="group-title">데이트</h3>
            </div>
            <div className="card">
              <Box num={5} name="카카오로그인" message="카카오 로그인을 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.0/5</span>
              </div>
            </div>
            <div className="card">
              <Box num={6} name="카카오로그인" message="카카오 로그인을 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.8/5</span>
              </div>
            </div>
            <div className="card">
              <Box num={7} name="카카오로그인" message="카카오 로그인을 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.1/5</span>
              </div>
            </div>
            <div className="card">
              <Box num={8} name="카카오로그인" message="카카오 로그인을 클릭했습니다!" />
              <div className="restaurant-info">
                <span className="restaurant-name">평점</span>
                <span className="rating">4.6/5</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pagination">
          <button className="previous">이전</button>
          <button className="next">다음</button>
        </div>
      </div>
            <div className="container">
                  <div className="header">
                    <button className="region" onClick={openModal}>
                      지역선택
                    </button>
                    <h4>현재지역은 서울 입니다</h4>
                  </div>
                  {showModal && (
                     <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                          <div className="modal-header">
                            <h5>지역 선택</h5>
                            <button className="close-button" onClick={closeModal}>
                               X
                            </button>
                          </div>

                          <div className="modal-body">
                            <div className="region-selection">
                              <div className="region-column">
                                <h5>광역시도</h5>
                                <ul>
                                  <li>서울</li>
                                  <li>강원</li>
                                  <li>경기</li>
                                  <li>경남</li>
                                  <li>경북</li>
                                  <li>광주</li>
                                  <li>대구</li>
                                  <li>대전</li>
                                  <li>부산</li>
                                  <li>세종</li>
                                  <li>울산</li>
                                  <li>인천</li>
                                  <li>전남</li>
                                  <li>전북</li>
                                  <li>제주</li>
                                  <li>충남</li>
                                  <li>충북</li>
                                </ul>
                              </div>
                              {/* 시군구 Column */}
                              <div className="region-column">
                                <h5>시군구</h5>
                                <ul>
                                  <li>전체</li>
                                  <li>천안</li>
                                  <li>공주</li>
                                  <li>당진</li>
                                  <li>태안</li>
                                  <li>서산</li>
                                  <li>아산</li>
                                  <li>부여</li>
                                  <li>보령</li>
                                  <li>안면도</li>
                                  <li>불당동</li>
                                </ul>
                              </div>
                              <div className="region-column">
                                <h5>읍면동</h5>
                                <ul>
                                  <li>선택 없음</li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* Modal Footer */}
                          <div className="modal-footer">
                            <button className="complete-button" onClick={closeModal}>
                              선택 완료
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    </div>
              </DiningLayout>
            );
          };
export default Find_store;
