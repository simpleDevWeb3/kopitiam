import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styled from "styled-components";
import { useFetchUsers } from "../Users/useFetchUsers";
import SpinnerMini from "../../../../components/SpinnerMini";
import { useSearchParams } from "react-router-dom";
import { filterDataByDays } from "../../../../helpers/dateHelper";
import { useMemo } from "react"; // Import useMemo

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function ChartUserGrowth() {
  const { users, isLoadUsers } = useFetchUsers();
  const [searchParam] = useSearchParams();

  const lastDay = Number(searchParam.get("last")) || 7;

  // --- FIX 1: Correct Date Logic ---
  const today = new Date();
  const d = new Date(today);
  d.setDate(today.getDate() - lastDay); // This mutates 'd'

  const todayDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const startingDate = d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  // --------------------------------

  // --- OPTIMIZATION: useMemo ---
  const { labels, counts } = useMemo(() => {
    if (!users) return { labels: [], counts: [] };

    const processingDate = new Date(); // Use a local date instance inside
    const dateMap = {};
    const labelsArr = [];

    // 1. Generate all dates
    for (let i = lastDay - 1; i >= 0; i--) {
      const iterDate = new Date(processingDate);
      iterDate.setDate(processingDate.getDate() - i);

      const label = iterDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      labelsArr.push(label);
      dateMap[label] = 0;
    }

    // 2. Count Users
    const filteredUsers = filterDataByDays(users, lastDay);

    filteredUsers.forEach((user) => {
      const userDate = new Date(user.created_at);
      const label = userDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      if (dateMap[label] !== undefined) {
        dateMap[label] += 1;
      }
    });

    const countsArr = labelsArr.map((label) => dateMap[label]);

    return { labels: labelsArr, counts: countsArr };
  }, [users, lastDay]); // Only re-run if users or days change

  const data = {
    labels: labels,
    datasets: [
      {
        label: "New Users",
        data: counts,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.2)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "rgb(53, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(53, 162, 235)",
        pointRadius: lastDay > 30 ? 0 : 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: function (context) {
            return ` ${context.parsed.y} New Users`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
      x: {
        grid: { display: false },
        ticks: {
          maxRotation: 0,
          autoSkip: false,
          callback: function (val, index) {
            const label = this.getLabelForValue(val);
            if (lastDay <= 10) return label;
            if (index % 5 === 0) return label;
            if (index === labels.length - 1) return label;
            return null;
          },
        },
      },
    },
  };

  if (isLoadUsers) return <SpinnerMini />;

  return (
    <StyledSection>
      <Header>
        User Growth from {startingDate} to {todayDate}
      </Header>
      <ChartBox>
        <Line data={data} options={options} />
      </ChartBox>
    </StyledSection>
  );
}

export default ChartUserGrowth;

// Styles remain the same...
const StyledSection = styled.div`
  background-color: var(--background-glass);
  border: 1px solid var(--hover-color);
  border-radius: 15px;
  padding: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 1rem;
`;

const ChartBox = styled.div`
  flex-grow: 1;
  width: 100%;
  min-height: 250px;
`;
