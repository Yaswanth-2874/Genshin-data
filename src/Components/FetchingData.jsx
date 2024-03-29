import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CharacterList from "./CharacterList";
import DisplayCard from "./DisplayCard";
import useIndex from "../Hooks/useIndex";

function FetchingData(props) {
  const checkedItems = props.checkedItems;
  const [uid, setUid] = useState("814201215");
  const onChangingId = (e) => {
    setUid(e.target.value);
  };
  const [index, setIndex] = useIndex();
  const [data, setData] = useState();

  const fetchDataFromAPI = () => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = `https://enka.network/api/uid/${uid}`;
    fetch(proxyUrl + apiUrl)
      .then((data) => {
        if (!data.ok) throw new Error("Failed to fetch");
        return data.json();
      })
      .then((formattedData) => {
        setData(formattedData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const timeout = setTimeout(fetchDataFromAPI, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [uid]);
  if (!data)
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  return (
    <>
      <Navbar uid={uid} onChangingId={onChangingId} data={data.playerInfo} />
      <CharacterList
        level={data.playerInfo}
        data={data.avatarInfoList}
        index={index}
        setIndex={setIndex}
        displayLevels={checkedItems[1]}
      />
      <DisplayCard
        data={data.playerInfo}
        avatars={data.avatarInfoList}
        index={index}
        displayLevels={checkedItems}
      />
    </>
  );
}

export default FetchingData;
