import React, { useState, useEffect } from "react";
import "./Modal.css";
import alert from "sweetalert2";


export const Modal = ({ openModal, setOpenModal }) => {
    const [inputCount, setInputCount] = useState(0);

    const onInputHandler = (e) => {
        setInputCount(
            e.target.value.length
        );
    }


    return (
        <div class="modal_contact">
            <div class="modal_container">
                <p class="modal_title">CONTACT</p>
                <div class="modal_input">
                    <input type="text" class="m_input" placeholder="제목" maxLength={30}/>
                    <input type="text" class="m_input" placeholder="휴대폰 번호" maxLength={11}/>
                    <textarea onChange={onInputHandler} class="m_textarea" placeholder="내용" maxLength={200}/>
                    <div class="tx_count" >
                        <span>{inputCount}</span>/200
                    </div>
                </div>
                <button class="cancel_contact"
                        type="button"
                        onClick={() => {
                            setOpenModal(false);
                            document.body.style = "overflow: visible";
                        }}> 취소
                </button>
                {!openModal ? setOpenModal(true) : null}
                <button class="submit_contact"
                    type="button"
                    onClick={async () => {
                        setOpenModal(false);
                        await alert.fire({
                            icon: 'success',
                            title: '발송 완료',
                            text: `관리자에게 전달 되었습니다.`,
                            confirmButtonText: '확인',
                        });
                        document.body.style = "overflow: visible";
                    }}> 전송 </button>
            </div>
        </div>
    );
};