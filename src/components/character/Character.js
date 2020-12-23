import React from "react";
import './Character.css';

const Character = (props) => {
    const char = props.char;
    return (
        <div className="row col-item-container">
            <div className="col-4 col-item-left">
                <img className="list-img" src={char.img} alt={char.name}/>
            </div>
            <div className="col-4 col-item-centre">
                <div><b>Name:</b> {char.name}</div>
                <div><b>Nickname:</b> {char.nickname}</div>
            </div>
            <div className="col-4 col-item-right">
                <b>Portrayed by:</b> {char.portrayed}
            </div>
        </div>
    );
}

export default Character;