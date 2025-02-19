import React from "react";
import './FlipCard.css';

const FlipCard = ({ body }) => {
  return (  
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front side of the card */}
        <div className="flip-card-front">
          <img
            src="https://via.placeholder.com/300"
            alt="Front"
            className="ui image"
          />
        </div>

        {/* Back side of the card */}
        <div className="flip-card-back">
          {body.map((ele, index) => {
            return <p key={index}>{ele}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
