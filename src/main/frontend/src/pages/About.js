import React, {useState} from "react";
import {Modal} from "../components/modal/Modal";
import DiningLayout from '../layouts/DiningLayout';
import '../css/About.css'

const About = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <DiningLayout>
            <div className="container">
                <div className="intro">
                    <div className="intro_img">
                        <img src="https://cdn.pixabay.com/photo/2024/08/04/15/47/ai-generated-8944735_1280.jpg"
                             alt="meat"/>
                    </div>
                    <div className="intro_text">
                        <h1>다이닝픽이란...</h1>
                        <p>
                            손쉽게 레스토랑을 찾고 손쉽게 먹고 싶은 음식을 찾고 <br/>
                            외롭지 않게! 식성이 맞는 사람들과 함께! 때론 맛집을 혼자서!<br/>
                            나의 리뷰가 다른 사람에게 도움이 되는...
                        </p>
                    </div>
                </div>

                <div className="contact">
                    <h2>기업 문의</h2>
                    <p>
                        우리와 함께 성장할 기회를 찾고 있나요? <br/>
                        아래 버튼을 클릭하여 문의해 주세요!
                    </p>
                    <button className="contact_btn"
                            onClick={() => {
                                setOpenModal(true);
                                document.body.style = "overflow: hidden";
                            }}> 기업 문의하기
                    </button>
                    {openModal ? <Modal openModal={openModal} setOpenModal={setOpenModal}/> : null}
                </div>
            </div>
        </DiningLayout>
    );
};

export default About;
