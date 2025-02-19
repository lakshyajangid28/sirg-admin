import React from "react";
import FlipCard from "../FlipCard/FlipCard";
import { achievements } from "../../util/util";

const Achievements = () => {
  return (
    <div className="box" id="achievements">
      <h2 className="ui top attached inverted bold header">Achievements</h2>
      <div className="ui padded text segment" id="content-box">
        <br />
        <div className="ui cards flip-cards">
          {achievements.map(ele => {
            return <FlipCard key={ele.id} body={ele.body}/>
          })}
        </div>
        <br />
      </div>
    </div>
  );
};

export default Achievements;
