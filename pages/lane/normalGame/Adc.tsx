import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { playerNameState } from "../../api/atom";
import { getFreeRankInfo } from "../../games/FreeRank";
import * as X from "../../../styles/laneStyle/LaneStyle";
import {
  adcLink,
  getSoloRankInfo,
  ISoloRankProps,
  jugLink,
  midLink,
  supLink,
  topLink,
} from "../../games/SoloRank";
import { getNormalInfo } from "../../games/Normal";

function Adc() {
  const playerName = useRecoilValue(playerNameState);
  const { data: normalData, isLoading } = useQuery<ISoloRankProps>(
    "Normal",
    () => getNormalInfo(playerName)
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
        {normalData?.mostLanes.map((data) => (
          <>
            {data.lane === "Adc" && (
              <X.LineContainer>
                <div>
                  <X.LineImage>
                    {data.lane === "Adc" && <X.LaneImg src={adcLink} />}
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
          </>
        ))}
      </div>

      {/* 챔프 */}
      <div>
        {normalData?.mostChampions.map((data) => (
          <>
            {data.lane === "Adc" && (
              <X.LineContainer>
                <X.LineImage>
                  <X.ChampImg src={data.imageUrl} />
                  {data.lane === "Adc" && <X.ChampImg2 src={adcLink} />}
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
            )}
          </>
        ))}
      </div>
    </X.MainContainer>
  );
}

export default Adc;
