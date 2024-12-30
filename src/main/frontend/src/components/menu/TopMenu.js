import { Link } from 'react-router-dom';
import './TopMenu.css';

const TopMenu = () => {
    return (
        <nav class="top_nav">
            <div class="top_first">
                <div class="top_menu">
                    <ul>
                        <li>
                            <Link class="logo" to={'/'}>다이닝픽</Link>
                        </li>
                        <li>
                            <input type="text" placeholder="검색창 구현예정" className="search_box" />
                        </li>
                    </ul>
                </div>
                <div className="top_menu_btn">
                    <Link to="/sign_up">
                        <button className="menu_btn">회원가입</button>
                    </Link>
                    <button class="menu_btn">
                        <Link to={"/login"}>로그인</Link>
                    </button>
                </div>
            </div>
            <div class="second_menu">
                <ul>
                    <li>
                        <Link to={"/about"}>다이닝픽 소개</Link>
                    </li>
                    <li>
                        <Link to={"/find_store"}>맛집 찾기</Link>
                    </li>
                    <li>
                        <Link to={"/ranking"}>랭킹</Link>
                    </li>
                    <li>
                        <Link to={"/pick_crew"}>픽 크루</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default TopMenu;
