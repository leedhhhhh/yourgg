import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import * as X from "../../../styles/laneStyle/LaneStyle";
import { playerNameState } from "../../api/atom";
import { getFreeRankInfo } from "../../games/FreeRank";
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
  const { data: freeRankData, isLoading } = useQuery<ISoloRankProps>(
    "FreeRank",
    () => getFreeRankInfo(playerName)
  );

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
        {freeRankData?.mostLanes.map((data) => (
          <>
            <X.LineContainer>
              <div>
                <X.LineImage>
                  {data.lane === "Top" && <X.LaneImg src={topLink} />}
                  {data.lane === "Jug" && <X.LaneImg src={jugLink} />}
                  {data.lane === "Mid" && <X.LaneImg src={midLink} />}
                  {data.lane === "Adc" && <X.LaneImg src={adcLink} />}
                  {data.lane === "Sup" && <X.LaneImg src={supLink} />}
                </X.LineImage>

                <X.Line>
                  <X.LineText>
                    {data.lane === "Top" && "Top"}
                    {data.lane === "Jug" && "Jungle"}
                    {data.lane === "Mid" && "Mid"}
                    {data.lane === "Adc" && "Adc"}
                    {data.lane === "Sup" && "Support"}
                  </X.LineText>
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
          </>
        ))}
      </div>

      {/* 챔프 */}
      <div>
        {freeRankData?.mostChampions.map((data) => (
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
