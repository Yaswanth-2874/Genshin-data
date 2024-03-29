import React from "react";
import useProfilePictures from "../Hooks/useProfilePictures";
import relation from "../data/splashArtRelation.json";

function SplashArt(props) {
  const data = props.data;
  const index = props.index;
  const requireSquare = true;

  const requiredImage = relation[data.showAvatarInfoList[index].avatarId];
  const [img] = useProfilePictures({ data, requireSquare, requiredImage });
  return (
    <div
      style={{
        zIndex: "0",
        height: "400px",
        width: "400px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "250px",
          justifyContent: "space-around",
          marginTop: "10px",
        }}
      ></div>
      <img src={img} alt="splashArt" height="300px" width="300px"></img>
    </div>
  );
}

export default SplashArt;
