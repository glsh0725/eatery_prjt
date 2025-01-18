import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./TopMenu.css";

const TopMenu = () => {
    const [role, setRole] = useState(null); // role 값을 저장
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 햄버거 메뉴 상태
    const navigate = useNavigate();

    const fetchRoleFromToken = () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1])); // 토큰 디코딩
                setRole(parseInt(payload.role, 10)); // role 값 설정
            } catch (e) {
                setRole(null); // 디코딩 실패 시 초기화
            }
        } else {
            setRole(null);
        }
    };

    useEffect(() => {
        fetchRoleFromToken();

        const handleLoginEvent = () => {
            fetchRoleFromToken();
        };

        window.addEventListener("login", handleLoginEvent);

        return () => {
            window.removeEventListener("login", handleLoginEvent);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        setRole(null);
        alert("로그아웃되었습니다.");
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // 햄버거 메뉴 열기/닫기
    };

    return (
        <nav className="top_nav">
            <div className="hamburger" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="top_first">
                <div className="top_menu">
                    <ul>
                        <li>
                            <Link className="logo" to={"/"}>다이닝픽</Link>
                        </li>
                        <li>
                            <input type="text" placeholder="검색창 구현예정" className="search_box"/>
                        </li>
                    </ul>
                </div>
                <div className="top_menu_btn">
                    {!role && (
                        <>
                            <Link to="/sign_up">
                                <button className="menu_btn">회원가입</button>
                            </Link>
                            <Link to="/login">
                                <button className="menu_btn">로그인</button>
                            </Link>
                        </>
                    )}
                    {role === 1 && (
                        <>
                            <Link to="/mypage">
                                <button className="menu_btn">마이페이지</button>
                            </Link>
                            <Link to="/userinfo">
                                <button className="menu_btn">회원정보</button>
                            </Link>
                            <button className="menu_btn" onClick={handleLogout}>로그아웃</button>
                        </>
                    )}
                    {role === 2 && (
                        <>
                            <Link to="/admin_userlist">
                                <button className="menu_btn">관리자페이지</button>
                            </Link>
                            <Link to="/userinfo">
                                <button className="menu_btn">회원정보</button>
                            </Link>
                            <button className="menu_btn" onClick={handleLogout}>로그아웃</button>
                        </>
                    )}
                </div>
            </div>
            <div className={`second_menu ${isMenuOpen ? "show" : "hide"}`}>
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