import React, { useContext } from "react";
import Title from "../Title/Title";
import ExitButton from "./ExitButton";
import './ProfilePage.css';
import { observer } from "mobx-react-lite";
import { Context } from "../..";

const ProfilePage = observer(() => {
    const { user } = useContext(Context);
    console.log(user.login);

    return (
        <div className="profile-page">
            <div className="profile-title">
                <Title title="Профіль користувача" />
            </div>
            <div className="profile-container">
                <div className="profile-info">
                    <p>Ім'я користувача: {user.login}</p>
                    <p>Кількість зіграних боїв: {user.statistic.battles}</p>
                    <p>Кількість пострілів: {user.statistic.shots}</p>
                    <p>Кількість потраплянь по кораблях противника: {user.statistic.hits}</p>
                    <p>Кількість виграшів: {user.statistic.wins}</p>
                    <p>Кількість поразок: {user.statistic.loses}</p>
                </div>
            </div>
            <div className="exit-button-container">
                <ExitButton />
            </div>
        </div>
    );
});

export default ProfilePage;

