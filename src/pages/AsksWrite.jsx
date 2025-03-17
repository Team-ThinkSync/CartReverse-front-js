import React, { useState } from 'react';
import styles from './AsksWrite.module.css';

const AsksWrite = () => {
    const [formData, setFormData] = useState({
        inquiryType: '',
        orderNumber: '',
        orderDate: '',
        name: '',
        userId: '',
        email: '',
        title: '',
        content: '',
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            photo: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        // 여기서 백엔드 API 호출
        try {
            const response = await fetch('API_URL_HERE', {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('서버 오류 발생');
            }

    
            console.log('폼 제출 성공');
        } catch (error) {
            console.error('폼 제출 실패:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.Container}>
            <h1>고객 문의</h1>
            
            <div className={styles.FormGrid}>
                <div>
                    <label>문의 유형:</label>
                    <input type="text" name="inquiryType" value={formData.inquiryType} onChange={handleChange} required />
                </div>
                <div>
                    <label>주문 번호:</label>
                    <input type="text" name="orderNumber" value={formData.orderNumber} onChange={handleChange} required />
                </div>
                <div>
                    <label>주문 일자:</label>
                    <input type="date" name="orderDate" value={formData.orderDate} onChange={handleChange} required />
                </div>
                <div>
                    <label>성명:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>아이디:</label>
                    <input type="text" name="userId" value={formData.userId} onChange={handleChange} required />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className={styles.FullWidth}>
                    <label>제목:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className={styles.FullWidth}>
                    <label>내용:</label>
                    <textarea name="content" value={formData.content} onChange={handleChange} required></textarea>
                </div>
                <div className={styles.FullWidth}>
                    <label>사진 첨부:</label>
                    <input type="file" name="photo" onChange={handleFileChange} />
                </div>
            </div>
            <button type="submit">제출</button>
        </form>
    );
};

export default AsksWrite;
