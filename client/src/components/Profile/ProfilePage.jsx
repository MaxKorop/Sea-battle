import React from "react";
import Title from "../Title/Title";
import ExitButton from "./ExitButton";
import './ProfilePage.css';

const ProfilePage = ({ userName, gameCount, shotCount, winCount, lossCount }) => {
    return (
        <div className="profile-page">
            <div className="profile-title">
                <Title title="Профіль користувача" />
            </div>
            <div className="profile-container">
                <div className="profile-info">
                    <p>Ім'я користувача: {userName}</p>
                    <p>Кількість ігор: {gameCount}</p>
                    <p>Кількість пострілів: {shotCount}</p>
                    <p>Кількість виграшів: {winCount}</p>
                    <p>Кількість поразок: {lossCount}</p>
                </div>
            </div>
            <div className="exit-button-container">
                <ExitButton />
            </div>
        </div>
    );
}

export default ProfilePage;

