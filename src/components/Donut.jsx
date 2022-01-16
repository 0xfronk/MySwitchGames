import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend, Tooltip);

export const Donut = ({ games }) => {
  const occurences = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  games.forEach((game) => {
    switch (game.genre) {
      case "Action":
        occurences[0] += 1;
        break;
      case "Adventure":
        occurences[1] += 1;
        break;
      case "Education":
        occurences[2] += 1;
        break;
      case "Music & fitness":
        occurences[3] += 1;
        break;
      case "Party":
        occurences[4] += 1;
        break;
      case "Puzzle":
        occurences[5] += 1;
        break;
      case "RPG":
        occurences[6] += 1;
        break;
      case "Simulation":
        occurences[7] += 1;
        break;
      case "Sports & racing":
        occurences[8] += 1;
        break;
      default:
    }
  });

  return (
    <Doughnut
      width="500%"
      height="500%"
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            titleFont: {
              size: 16,
            },
            bodyFont: {
              size: 16,
            },
            footerFont: {
              size: 16,
            },
          },
          legend: {
            labels: {
              font: {
                size: 16,
              },
            },
          },
        },
      }}
      data={{
        labels: [
          "Action",
          "Adventure",
          "Education",
          "Music & fitness",
          "Party",
          "Puzzle",
          "RPG",
          "Simulation",
          "Sports & racing",
        ],
        datasets: [
          {
            label: "Games Played by Genre",
            data: occurences,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(56, 199, 88, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(108, 108, 108, 0.2)",
              "rgba(103, 69, 51, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(56, 199, 88, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(108, 108, 108, 1)",
              "rgba(103, 69, 51, 1)",
            ],
            borderWidth: 1,
          },
        ],
      }}
    />
  );
};
