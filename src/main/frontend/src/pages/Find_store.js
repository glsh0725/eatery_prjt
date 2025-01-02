import DiningLayout from '../layouts/DiningLayout';
import Box from '../components/find_store/Find';
import Tags from '../components/find_store/Find';
import "../css/Find_store.css";

const Find_store = () => {
  return (
    <DiningLayout>
      <div className="container">
        <div className="header">
          <div className="search">
            <h4>방문시간 선택</h4>
            <input type="time" />
            <h4>현재 보고있는 지역은</h4>
            <input type="text" placeholder="현재 지역" />
            <h4>입니다.</h4>
          </div>
        </div>
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

        <div className="cardall">
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

        <div className="cardtwo">
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
        <div className="pagination">
          <button className="previous">이전</button>
          <button className="next">다음</button>
        </div>
      </div>
    </DiningLayout>
  );
};

export default Find_store;