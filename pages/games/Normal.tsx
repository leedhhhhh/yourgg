import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { laneState, playerNameState } from "../api/atom";
import Adc from "../lane/normalGame/Adc";
import All from "../lane/normalGame/All";
import Jungle from "../lane/normalGame/Jungle";
import Mid from "../lane/normalGame/Mid";
import Support from "../lane/normalGame/Support";
import Top from "../lane/normalGame/Top";
import Image from "next/image";
import * as X from "../../styles/gameStyle/SoloRankStyle";
import TierGraph from "../graph/SoloTierGraph";

//이미지 링크 정리
export const allLink =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-autofill-protection.png";
export const topLink =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-top-disabled.png";
export const jugLink =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-jungle-disabled.png";
export const midLink =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-middle-disabled.png";
export const adcLink =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-bottom-disabled.png";
export const supLink =
  "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-utility-disabled.png";

export interface ISoloRankProps {
  role: string | undefined;
  laning: string;
  kda: string;
  mostChampions: IMostChamp[];
  mostLanes: IMostLane[];
}

export interface IMostChamp {
  id: number;
  imageUrl: string;
  winRate: string;
  role: string;
  laning: string;
  kda: string;
  matchCount: number;
  name: string;
  lane: string;
}

export interface IMostLane {
  lane: string;
  winRate: string;
  role: string;
  laning: string;
  kda: string;
  matchCount: number;
}

export function getNormalInfo(playerName: string) {
  return fetch(
    `https://api.your.gg/kr/api/summoners/${playerName}?matchCategory=Normal`
  ).then((response) => response.json());
}

function Normal() {
  const playerName = useRecoilValue(playerNameState);
  const [lane, setLane] = useRecoilState(laneState);

  const { data: normalData, isLoading } = useQuery<ISoloRankProps>(
    "Normal",
    () => getNormalInfo(playerName)
  );

  const onHandle = (data: string) => {
    setLane(data);
  };
  return (
    <>
      <div>
        <X.PlayerInfo>
          <div>
            <X.Role>{Number(normalData?.role).toFixed(2)}</X.Role>{" "}
            <X.RoleText>인분</X.RoleText>
          </div>
          <div>
            <X.Role>
              {Number(normalData?.laning).toFixed(1)} :{" "}
              {eval(`10 - ${Number(normalData?.laning).toFixed(1)}`).toFixed(1)}
            </X.Role>
            <X.LaningText>라인전</X.LaningText>
          </div>
          <div>
            <X.Role>{Number(normalData?.kda).toFixed(2)}</X.Role>{" "}
            <X.KdaText>KDA</X.KdaText>
          </div>
        </X.PlayerInfo>
        <X.GraphInfo>
          <TierGraph />
        </X.GraphInfo>
      </div>

      <X.LaneContainer>
        <X.LaneImg onClick={() => onHandle("All")} src={allLink} />
        <X.LaneImg onClick={() => onHandle("Top")} src={topLink} />
        <X.LaneImg onClick={() => onHandle("Jug")} src={jugLink} />
        <X.LaneImg onClick={() => onHandle("Mid")} src={midLink} />
        <X.LaneImg onClick={() => onHandle("Adc")} src={adcLink} />
        <X.LaneImg onClick={() => onHandle("Sup")} src={supLink} />
      </X.LaneContainer>

      <X.Hr />

      {lane === "All" && <All />}
      {lane === "Top" && <Top />}
      {lane === "Jug" && <Jungle />}
      {lane === "Mid" && <Mid />}
      {lane === "Adc" && <Adc />}
      {lane === "Sup" && <Support />}
    </>
  );
}

export default Normal;