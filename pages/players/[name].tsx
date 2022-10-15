import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { playerNameState } from "../api/atom";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import Normal from "../games/Normal";
import SoloRank from "../games/SoloRank";
import FreeRank from "../games/FreeRank";
import * as X from "../../styles/playerStyle";
import NoSsr from "../NoSsr";

export default function Players() {
  const playerName = useRecoilValue(playerNameState);
  const [game, setGame] = useState("SoloRank");

  const onHandle = (event: any) => {
    setGame(event.target.value);
  };

  return (
    <X.Container>
      <X.PlayerName>
        <NoSsr>{playerName}</NoSsr>
      </X.PlayerName>
      <X.SelectRank>
        <X.SelectBox defaultValue="SoloRank" onChange={onHandle}>
          <option value="Normal">Normal</option>
          <option value="SoloRank">SoloRank</option>
          <option value="FreeRank">FreeRank</option>
        </X.SelectBox>
      </X.SelectRank>
      <div>
        {game === "Normal" && <Normal />}
        {game === "SoloRank" && <SoloRank />}
        {game === "FreeRank" && <FreeRank />}
      </div>
    </X.Container>
  );
}
