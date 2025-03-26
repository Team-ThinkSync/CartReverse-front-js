import React, { useState } from "react";
import styles from './Asks.module.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import InquiryList from "../components/InquiryList";

const Asks = () => {
    const [ currentTab, clickTab ] = useState("1:1 문의 홈")
    const selectMenuHandler = (type) => {
        clickTab(type);
    };

    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/asks/write");
    }; 

    const [inquiries, setInquiries] = useState([]);
    return (
        <div className="w-full">
            <Header className="w-full"/>
            <div className="max-w-4xl mx-auto">
                <div className={styles.tab}>
                    <div className={`${styles['tab-item']} ${currentTab === "1:1 문의 홈" ? styles.active : ''}`}
                         onClick={() => selectMenuHandler("1:1 문의 홈")}>
                        <span>1:1 문의 홈</span>
                    </div>
                    <div className={`${styles['tab-item']} ${currentTab === "1:1 문의 내역" ? styles.active : ''}`}
                         onClick={() => selectMenuHandler("1:1 문의 내역")}>
                        <span>1:1 문의 내역</span>
                    </div>
                </div>

                <div>
                    {currentTab === "1:1 문의 홈" && (
                        <div>
                            <h2 className={styles.inquiry}>문의 유형 선택</h2>
                            <p className={styles.inquiry2}>문의 유형을 선택해 주세요. 고객센터 상담보다 더 빠르게 해결할 수 있습니다.</p>
                            <h3 className={styles.inquiry3}>찾으시는 내용이 없나요?</h3>
                            <button onClick={handleButtonClick} className={styles.button3}>1:1 문의 쓰기</button>
                        </div>
                    )}
                    {currentTab === "1:1 문의 내역" && (
                        <div>
                            {inquiries.length === 0 ? (
                                <div>
                                    <h5 className={styles.내역없음}>문의하신 내역이 없습니다.</h5>
                                    <p className={styles.이전문의}>이전 문의 보러가기</p>
                                </div>
                            ) : (
                                <InquiryList inquiries={inquiries} />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <Footer className="w-full"/>
        </div>
    );
}

export default Asks;