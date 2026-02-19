import React from "react";

export default function RestaurantCard(props, onClick) {
    return (
        <div className="restaurant-card" onClick={onClick}>
            <div className="restaurant-card-image">
                <img src={props.image} alt={props.name} width={300} height={150}/>
            </div>
            <div className="restaurant-card-content">
                <h3 className="restaurant-card-title">{props.name}</h3>
                <p className="restaurant-card-description">{props.description}</p>
            </div>
        </div>
    )
}