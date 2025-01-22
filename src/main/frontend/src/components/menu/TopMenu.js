import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import alert from 'sweetalert2';
import "./TopMenu.css";

const TopMenu = () => {
    const [role, setRole] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();

    const fetchRoleFromToken = () => {
        const token = localStorage.getItem("authToken");
        if (token) {
            try {
                const payload = jwtDecode(token);
                if (payload.exp * 1000 > Date.now()) {
                    // 토큰이 유효하면 역할 설정
                    setRole(parseInt(payload.role, 10));
                    setNickname(payload.mem_nickname);
                } else {
                    // 만료된 토큰 처리
                    localStorage.removeItem("authToken");
                    setRole(null);
                }
            } catch (e) {
                console.error("토큰 디코딩 실패:", e);
                setRole(null);
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

    const handleLogout = async () => {
        localStorage.removeItem("authToken");
        setRole(null);
        setNickname("");
        await alert.fire({
            icon: "success",
            title: "로그아웃",
            text: "다음에 또 만나요~",
        });
        navigate("/");
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                            <Link className="logo" to={"/"}>
                                <img src="/images/logo.png" alt="로고" className="logo_image"/>
                                다이닝픽
                            </Link>
                        </li>
                        <li className="search_container">
                            <input
                                type="text"
                                placeholder="검색창"
                                className="search_box"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        const searchQuery = e.target.value.trim();
                                        if (searchQuery) {
                                            navigate(`/find_store?search=${encodeURIComponent(searchQuery)}`);
                                        }
                                    }
                                }}
                            />
                            <img
                                src="/images/search.png"
                                alt="검색"
                                className="search_icon"
                                onClick={() => {
                                    const searchInput = document.querySelector(".search_box").value.trim();
                                    if (searchInput) {
                                        navigate(`/find_store?search=${encodeURIComponent(searchInput)}`);
                                    }
                                }}
                            />
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
                            <span className="user_auth">{nickname}님</span>
                            <Link to="/mypage">
                                <button className="menu_btn">마이페이지</button>
                            </Link>
                            <Link to="/userinfo">
                                <button className="menu_btn">회원정보</button>
                            </Link>
                            <button className="menu_btn" onClick={handleLogout}>
                                로그아웃
                            </button>
                        </>
                    )}
                    {role === 2 && (
                        <>
                            <span className="user_auth">{nickname}님</span>
                            <Link to="/admin">
                                <button className="menu_btn">관리자페이지</button>
                            </Link>
                            <Link to="/userinfo">
                                <button className="menu_btn">회원정보</button>
                            </Link>
                            <button className="menu_btn" onClick={handleLogout}>
                                로그아웃
                            </button>
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