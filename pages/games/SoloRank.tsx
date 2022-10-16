import { useEffect } from "react";
import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { laneState, playerNameState } from "../api/atom";
import Adc from "../lane/soloRank/Adc";
import All from "../lane/soloRank/All";
import Jungle from "../lane/soloRank/Jungle";
import Mid from "../lane/soloRank/Mid";
import Support from "../lane/soloRank/Support";
import Top from "../lane/soloRank/Top";
import Image from "next/image";
import * as X from "../../styles/gameStyle/SoloRankStyle";
import TierGraph from "../graph/SoloTierGraph";
import Loading from "../loading/Loading";

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

export function getSoloRankInfo(playerName: string) {
  return fetch(
    `https://api.your.gg/kr/api/summoners/${playerName}?matchCategory=SoloRank`
  ).then((response) => response.json());
}

function SoloRank() {
  const playerName = useRecoilValue(playerNameState);
  const [lane, setLane] = useRecoilState(laneState);

  const { data: soloRankData, isLoading } = useQuery<ISoloRankProps>(
    "SoloRank",
    () => getSoloRankInfo(playerName)
  );

  const onHandle = (data: string) => {
    setLane(data);
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {soloRankData?.mostChampions.length === 0 ? (
            <X.NoGameInfo>
              최근 30게임에 대한 정보가 존재하지 않습니다😢
            </X.NoGameInfo>
          ) : (
            <>
              {" "}
              <div>
                <X.PlayerInfo>
                  <div>
                    <X.Role>{Number(soloRankData?.role).toFixed(2)}</X.Role>{" "}
                    <X.RoleText>인분</X.RoleText>
                  </div>
                  <div>
                    <X.Role>
                      {Number(soloRankData?.laning).toFixed(1)} :{" "}
                      {eval(
                        `10 - ${Number(soloRankData?.laning).toFixed(1)}`
                      ).toFixed(1)}
                    </X.Role>
                    <X.LaningText>라인전</X.LaningText>
                  </div>
                  <div>
                    <X.Role>{Number(soloRankData?.kda).toFixed(2)}</X.Role>{" "}
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
          )}
        </>
      )}
    </>
  );
}

export default SoloRank;
