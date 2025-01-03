import DiningLayout from '../layouts/DiningLayout';
import React, { useState } from 'react';
import "../css/Pick_crew.css";

const Pick_crew = () => {
const [activeTag, setActiveTag] = useState('전체'); // 활성화된 태그 상태 관리
  const tags = ['전체', '한식', '중식', '일식', '디저트', '맛집', '비건'];
  const dummyData = [ // 임시 데이터
    { name: '맛집 탐방 크루', likes: 40, members: 29 },
    { name: '맛집 탐험대!!!', likes: 37, members: 25 },
    { name: '맛집 사랑해요', likes: 57, members: 35 },
    // ... 더 많은 데이터
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 아이템 수

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dummyData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
    return (
        <DiningLayout>
            <div className="pick">
                   <div className="pcik_header">
                       <button className='region'>지역</button>
                       <div className="search">
                            <input type="text" placeholder="검색어를 입력하세요." />
                       </div>
                       <button className='search'>검색</button>
                   </div>
                 <div className="tags">
                   {tags.map((tag) => (
                     <div
                       key={tag}
                       className={`tag ${activeTag === tag ? 'active' : ''}`}
                       onClick={() => setActiveTag(tag)}
                     >
                       {tag}
                     </div>
                   ))}
                 </div>

                 <div className="all">
                       <h4 className="pcik_title">나의 크루</h4>
                   <div className="cardall">
                       {currentItems.map((item,index) => (
                         <div key={index} className="box">
                           <h3>{item.name}</h3>
                           <h3>좋아요 {item.likes}</h3>
                           <h3>참여인원 {item.members}</h3>
                         </div>
                       ))}
                   </div>
                 </div>
                     <div className="pagination">
                   <button onClick={() => paginate(currentPage-1)} disabled={currentPage===1} className="previous">이전</button>
                       {pageNumbers.map(number => (
                       <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                           {number}
                       </button>
                       ))}
                   <button onClick={() => paginate(currentPage+1)} disabled={currentPage===pageNumbers.length} className="next">다음</button>
                 </div>
               </div>
        </DiningLayout>
    );
};

export default Pick_crew;
