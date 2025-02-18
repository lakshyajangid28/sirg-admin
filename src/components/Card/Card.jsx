import React from "react";

const Card = ({ person }) => {
  return (
    <div className="ui card">
      <div className="image">
        {person.image ? (
          <img src={`/${person.image}`} alt="Person" />
        ) : (
          <img src="src/assets/image.png" alt="Default" />
        )}
      </div>
      <div className="content">
        <div className="ui medium header">{person.name}</div>
        <div className="meta">
          {person.category.charAt(0).toUpperCase() + person.category.slice(1)}
          <br />
          {person.description}
        </div>
      </div>
    </div>
  );
};

export default Card;
