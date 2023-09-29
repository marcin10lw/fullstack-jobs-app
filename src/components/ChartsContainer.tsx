import { useState } from "react";

import { MonthlyApplications } from "src/types";
import { Wrapper } from "src/assets/wrappers/ChartsContainer";
import BarChart from "./BarChart";
import AreaChart from "./AreaChart";

type ChartsContainerProps = {
  monthlyApplications: MonthlyApplications;
};

const ChartsContainer = ({ monthlyApplications }: ChartsContainerProps) => {
  const [chart, setChart] = useState<"bar" | "area">("bar");

  const toggleChart = () => {
    setChart((chart) => {
      if (chart === "bar") {
        return "area";
      }

      return "bar";
    });
  };

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button onClick={toggleChart} type="button">
        {chart === "area" ? "Area Chart" : "BarChart"}
      </button>
      {chart === "bar" ? (
        <BarChart monthlyApplications={monthlyApplications} />
      ) : (
        <AreaChart monthlyApplications={monthlyApplications} />
      )}
    </Wrapper>
  );
};

export default ChartsContainer;
