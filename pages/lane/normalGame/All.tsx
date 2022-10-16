import { useQuery } from "react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import * as X from "../../../styles/laneStyle/LaneStyle";
import { laneState, playerNameState } from "../../api/atom";
import { getNormalInfo } from "../../games/Normal";
import {
  adcLink,
  getSoloRankInfo,
  ISoloRankProps,
  jugLink,
  midLink,
  supLink,
  topLink,
} from "../../games/SoloRank";

function All() {
  const playerName = useRecoilValue(playerNameState);
  const [lane, setLane] = useRecoilState(laneState);

  const { data: normalData, isLoading } = useQuery<ISoloRankProps>(
    "Noraml",
    () => getNormalInfo(playerName)
  );

  const onHandle = (data: string) => {
    setLane(data);
  };

  return (
    <X.MainContainer>
      <X.InfoContainer>
        <X.ThirtyGame>최근 30게임</X.ThirtyGame>
        <X.WinRate>승률</X.WinRate>
        <X.Role>인분</X.Role>
        <X.Lane>라인전</X.Lane>
        <X.KdaContainer>킬뎃</X.KdaContainer>
      </X.InfoContainer>

      {/* 라인 */}
      <div>
        {normalData?.mostLanes.map((data) => (
          <>
            {data.lane === "Top" && (
              <X.LineContainer onClick={() => onHandle("Top")}>
                <div>
                  <X.LineImage>
                    <X.LaneImg onClick={() => onHandle("Top")} src={topLink} />
                  </X.LineImage>

                  <X.Line>
                    <X.LineText>{data.lane === "Top" && "Top"}</X.LineText>
                    <X.LineGameText>{data.matchCount} 경기</X.LineGameText>
                  </X.Line>

                  <X.LineWinRate>
                    {Number(data.winRate).toFixed(0)}%
                  </X.LineWinRate>
                  <X.LineRole>{Number(data.role).toFixed(2)}</X.LineRole>
                  <X.LineRate>{Number(data.laning).toFixed(1)}</X.LineRate>
                  <X.LineKda>{Number(data.kda).toFixed(2)}</X.LineKda>
                </div>
              </X.LineContainer>
            )}
            {data.lane === "Jug" && (
              <X.LineContainer onClick={() => onHandle("Jug")}>
                <div>
                  <X.LineImage>
                    <X.LaneImg onClick={() => onHandle("Jug")} src={jugLink} />
                  </X.LineImage>

                  <X.Line>
                    <X.LineText>{data.lane === "Jug" && "Jungle"}</X.LineText>
                    <X.LineGameText>{data.matchCount} 경기</X.LineGameText>
                  </X.Line>

                  <X.LineWinRate>
                    {Number(data.winRate).toFixed(0)}%
                  </X.LineWinRate>
                  <X.LineRole>{Number(data.role).toFixed(2)}</X.LineRole>
                  <X.LineRate>{Number(data.laning).toFixed(1)}</X.LineRate>
                  <X.LineKda>{Number(data.kda).toFixed(2)}</X.LineKda>
                </div>
              </X.LineContainer>
            )}
            {data.lane === "Mid" && (
              <X.LineContainer onClick={() => onHandle("Mid")}>
                <div>
                  <X.LineImage>
                    <X.LaneImg onClick={() => onHandle("Mid")} src={midLink} />
                  </X.LineImage>

                  <X.Line>
                    <X.LineText>{data.lane === "Mid" && "Mid"}</X.LineText>
                    <X.LineGameText>{data.matchCount} 경기</X.LineGameText>
                  </X.Line>

                  <X.LineWinRate>
                    {Number(data.winRate).toFixed(0)}%
                  </X.LineWinRate>
                  <X.LineRole>{Number(data.role).toFixed(2)}</X.LineRole>
                  <X.LineRate>{Number(data.laning).toFixed(1)}</X.LineRate>
                  <X.LineKda>{Number(data.kda).toFixed(2)}</X.LineKda>
                </div>
              </X.LineContainer>
            )}
            {data.lane === "Adc" && (
              <X.LineContainer onClick={() => onHandle("Adc")}>
                <div>
                  <X.LineImage>
                    <X.LaneImg onClick={() => onHandle("Adc")} src={adcLink} />
                  </X.LineImage>

                  <X.Line>
                    <X.LineText>{data.lane === "Adc" && "Adc"}</X.LineText>
                    <X.LineGameText>{data.matchCount} 경기</X.LineGameText>
                  </X.Line>

                  <X.LineWinRate>
                    {Number(data.winRate).toFixed(0)}%
                  </X.LineWinRate>
                  <X.LineRole>{Number(data.role).toFixed(2)}</X.LineRole>
                  <X.LineRate>{Number(data.laning).toFixed(1)}</X.LineRate>
                  <X.LineKda>{Number(data.kda).toFixed(2)}</X.LineKda>
                </div>
              </X.LineContainer>
            )}
            {data.lane === "Sup" && (
              <X.LineContainer onClick={() => onHandle("Sup")}>
                <div>
                  <X.LineImage>
                    <X.LaneImg onClick={() => onHandle("Sup")} src={supLink} />
                  </X.LineImage>

                  <X.Line>
                    <X.LineText>{data.lane === "Sup" && "Support"}</X.LineText>
                    <X.LineGameText>{data.matchCount} 경기</X.LineGameText>
                  </X.Line>

                  <X.LineWinRate>
                    {Number(data.winRate).toFixed(0)}%
                  </X.LineWinRate>
                  <X.LineRole>{Number(data.role).toFixed(2)}</X.LineRole>
                  <X.LineRate>{Number(data.laning).toFixed(1)}</X.LineRate>
                  <X.LineKda>{Number(data.kda).toFixed(2)}</X.LineKda>
                </div>
              </X.LineContainer>
            )}
          </>
        ))}
      </div>

      {/* 챔프 */}
      <div>
        {normalData?.mostChampions.map((data) => (
          <>
            <X.LineContainer>
              <X.LineImage>
                <X.ChampImg src={data.imageUrl} />
                {data.lane === "Top" && <X.ChampImg2 src={topLink} />}
                {data.lane === "Jug" && <X.ChampImg2 src={jugLink} />}
                {data.lane === "Mid" && <X.ChampImg2 src={midLink} />}
                {data.lane === "Adc" && <X.ChampImg2 src={adcLink} />}
                {data.lane === "Sup" && <X.ChampImg2 src={supLink} />}
              </X.LineImage>

              <X.Champ>
                <X.ChampText>{data.name}</X.ChampText>
                <X.LineGameText>{data.matchCount} games</X.LineGameText>
              </X.Champ>

              <div>
                <X.ChampWinRate>
                  {Number(data.winRate).toFixed(0)}%
                </X.ChampWinRate>
                <X.ChampRole>{Number(data.role).toFixed(2)}</X.ChampRole>
                <X.ChampRate>{Number(data.laning).toFixed(1)}</X.ChampRate>
                <X.ChampKda>{Number(data.kda).toFixed(2)}</X.ChampKda>
              </div>
            </X.LineContainer>
          </>
        ))}
      </div>
    </X.MainContainer>
  );
}

export default All;
