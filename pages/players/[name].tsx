import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { playerNameState } from "../api/atom";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import Normal, { ISoloRankProps } from "../games/Normal";
import SoloRank, { getSoloRankInfo } from "../games/SoloRank";
import FreeRank from "../games/FreeRank";
import * as X from "../../styles/playerStyle/playerStyle";
import NoSsr from "../NoSsr";
import NoPlayer from "../noPlayer/NoPlayer";
import Link from "next/link";

export default function Players() {
  const playerName = useRecoilValue(playerNameState);
  const [game, setGame] = useState("SoloRank");

  const onHandle = (event: any) => {
    setGame(event.target.value);
  };

  const { data: soloRankData, isLoading } = useQuery<ISoloRankProps>(
    "Error",
    () => getSoloRankInfo(playerName)
  );

  return (
    <>
      {soloRankData?.id === "Exception" ? (
        <NoPlayer />
      ) : (
        <X.Container>
          <Link href="/">
            <X.Title>YOURGG</X.Title>
          </Link>
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
      )}
    </>
  );
}
