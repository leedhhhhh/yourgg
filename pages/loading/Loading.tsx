import * as Y from "../../styles/laneStyle/LaneStyle";
import * as X from "../../styles/loading/LoadingStyle";
import {
  adcLink,
  allLink,
  jugLink,
  midLink,
  supLink,
  topLink,
} from "../games/SoloRank";

function Loading() {
  return (
    <>
      <div>
        <X.PlayerInfo>
          <X.LoadingBox>
            <X.Role></X.Role>
            <X.RoleText></X.RoleText>
          </X.LoadingBox>
          <X.LoadingBox>
            <X.Role></X.Role>
            <X.LaningText></X.LaningText>
          </X.LoadingBox>
          <X.LoadingBox>
            <X.Role></X.Role>
            <X.KdaText></X.KdaText>
          </X.LoadingBox>
        </X.PlayerInfo>
        <X.GraphInfo></X.GraphInfo>
      </div>

      <X.LaneContainer>
        <X.LaneImg src={allLink} />
        <X.LaneImg src={topLink} />
        <X.LaneImg src={jugLink} />
        <X.LaneImg src={midLink} />
        <X.LaneImg src={adcLink} />
        <X.LaneImg src={supLink} />
      </X.LaneContainer>

      <X.Hr />

      <Y.MainContainer>
        <Y.InfoContainer>
          <Y.ThirtyGame>최근 30게임</Y.ThirtyGame>
          <Y.WinRate>승률</Y.WinRate>
          <Y.Role>인분</Y.Role>
          <Y.Lane>라인전</Y.Lane>
          <Y.KdaContainer>킬뎃</Y.KdaContainer>
        </Y.InfoContainer>
        {/* 라인 */}
        <div>
          <>
            <X.LoadingContainer />
            <X.LoadingContainer />
            <X.LoadingContainer />
            <X.LoadingContainer />
          </>
        </div>
      </Y.MainContainer>
    </>
  );
}

export default Loading;
