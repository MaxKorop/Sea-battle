import React from "react";

const Rules = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Правила гри "Морський бій"</h1>
            <p style={styles.paragraph}>Гра "Морський бій" - це стратегічна гра для двох гравців, яка полягає в тому, щоб першим знищити всі кораблі противника.</p>
            
            <h2 style={styles.subHeading}>Підготовка до гри</h2>
            <ul style={styles.list}>
                <li>Кожен гравець отримує ігрове поле розміром 10x10 клітинок.</li>
                <li>Гравці розміщають свої кораблі на своєму полі. Кожен корабель має певну кількість клітинок і розташовується горизонтально або вертикально.</li>
                <li>Кораблі не можуть торкатися один одного, але можуть займати сусідні клітинки.</li>
            </ul>
            
            <h2 style={styles.subHeading}>Правила гри</h2>
            <ul style={styles.list}>
                <li>Гравці чергуються пострілами на полі противника, намагаючись потопити його кораблі.</li>
                <li>Гравець обирає клітинку на полі противника і стріляє в неї.</li>
                <li>Якщо стрілець попав, він отримує ще один хід.</li>
                <li>Якщо стрілець промахнувся, хід переходить до іншого гравця.</li>
                <li>Переможцем вважається гравець, який першим знищив всі кораблі противника.</li>
            </ul>

            <h2 style={styles.subHeading}>Типи кораблів</h2>
            <ul style={styles.list}>
                <li>Корабель "Лінкор" - 4 клітинки.</li>
                <li>Крейсер - 3 клітинки.</li>
                <li>Эсмінець - 2 клітинки.</li>
                <li>Катер - 1 клітинка.</li>
            </ul>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        fontSize: "2rem",
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    subHeading: {
        fontSize: "1.5rem",
        marginBottom: "10px",
        color: "#555",
    },
    paragraph: {
        fontSize: "1rem",
        lineHeight: "1.5",
        marginBottom: "15px",
        color: "#777",
    },
    list: {
        fontSize: "1rem",
        marginBottom: "15px",
        paddingLeft: "20px",
        color: "#777",
    },
};

export default Rules;
