import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './NotFoundPage.css';

export function NotFoundPage(){
        const navigate = useNavigate();

    return (
        <>
            <div className="mars"></div>
            <img src="https://assets.codepen.io/1538474/404.svg" className="logo-404" />
            <img src="https://assets.codepen.io/1538474/meteor.svg" className="meteor" />
            <p className="title">404 Not found</p>
            <p className="subtitle">
                Страница не найдена
            </p>
       
            <div style={{textAlign:"center"}}>
                <button className="btn-back" onClick={() => navigate(-1)}>Назад</button>
            </div>
            <img src="https://assets.codepen.io/1538474/astronaut.svg" className="astronaut" />
            <img src="https://assets.codepen.io/1538474/spaceship.svg" className="spaceship" />
        </>

    )
}