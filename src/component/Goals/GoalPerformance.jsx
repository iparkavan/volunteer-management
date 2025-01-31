import React, { useEffect, useState } from "react";
// import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import { Chart } from "primereact/chart";
import CalenderIcon from "../../assets/icons/CalenderIcon.svg";
import { useDispatch, useSelector } from "react-redux";
import { getStartAndEndDates } from "../../utils";
import { getGoalsOverAllData } from "../../services/goalsInfo";

export default function GoalPerformance() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const dispatch = useDispatch();
  const { goalOverAll } = useSelector(state => state.goals)

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
    setChartOptions(options);
    handlePerformanceFilter()
  }, []);

  useEffect(() => {
    const processChartData = (year) => {
      if (goalOverAll[year]) {
        const yearData = goalOverAll[year];
        const labels = Object.keys(yearData); // Get the month names as labels
        const dataValues = Object.values(yearData); // Get the values for each month
        return {
          labels: labels,
          datasets: [
            {
              label: `${year} Dataset`, // Label the dataset with the year
              data: dataValues, // Use the extracted values
              fill: false,
              tension: 0.4,
              borderColor: "rgba(254, 137, 37, 1)",
            },
          ],
        };
      } else {
        return {
          labels: [],
          datasets: [],
        };
      }
    };
    const chartData = processChartData(new Date().getFullYear());
    setChartData(chartData);
  }, [goalOverAll]);

  const handlePerformanceFilter = (e) => {
    const res = e?.target?.value || "month";
    const date = getStartAndEndDates(res)
    const payload = `start=${date?.startDate}&end=${date?.endDate}`
    dispatch(getGoalsOverAllData(payload));
  };

  return (
    <div
      style={{
        border: "1px solid rgba(29, 91, 191, 1)",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div className="goal-title-container flex justify-between items-center">
        <div className="flex gap-5 items-center ">
          <p className="text-[18px] font-semibold">Goals Overall Performance</p>
        </div>
        <div className="flex gap-8 items-center">
          <div
            className="relative flex gap-3 py-3 px-3"
            style={{
              border: "1px solid rgba(24, 40, 61, 0.25)",
              background: "rgba(238, 245, 255, 1)",
              borderRadius: "3px",
            }}
          >
            <img src={CalenderIcon} alt="CalenderIcon" />
            <select
              className="focus:outline-none"
              onChange={handlePerformanceFilter}
              style={{ background: "rgba(238, 245, 255, 1)" }}
            >
              <option value={"month"}>Month</option>
              <option value={"year"}>Year</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card px-8 py-6 h-[440px]">
        <Chart
          type="line"
          data={chartData}
          options={chartOptions}
          height="390"
        />
      </div>
    </div>
  );
}
