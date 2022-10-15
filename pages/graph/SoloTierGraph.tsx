import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { playerNameState } from "../api/atom";
import { getSoloRankInfo } from "../games/SoloRank";
import NoSsr from "../NoSsr";
import dynamic from "next/dynamic";
import styled from "styled-components";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Container = styled.div`
  width: 270px;
`;

interface ITierProps {
  tierHistory: ITierHistoryProps[];
}

interface ITierHistoryProps {
  division: string;
  leaguePoint: number;
  normalizedPoint: number;
  tier: string;
  updated: number;
}

function TierGraph() {
  const playerName = useRecoilValue(playerNameState);
  const { data: soloRankTierData, isLoading } = useQuery<ITierProps>(
    "SoloRankTier",
    () => getSoloRankInfo(playerName)
  );
  return (
    <NoSsr>
      <Container>
        <ApexChart
          type="line"
          series={[
            {
              name: "tier",
              data:
                soloRankTierData?.tierHistory.map(
                  (data) => data.normalizedPoint
                ) ?? [],
            },
          ]}
          options={{
            colors: ["#2b69ac"],
            chart: {
              height: 150,
              width: 150,
              background: "transparent",
              toolbar: {
                show: false,
              },
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisBorder: { show: false },
              axisTicks: { show: false },
            },
            tooltip: {
              x: {
                show: false,
              },
            },
          }}
        />
      </Container>
    </NoSsr>
  );
}

export default TierGraph;
