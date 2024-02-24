import { useState } from 'react';

import BarChart from './BarChart';
import AreaChart from './AreaChart';
import { MonthlyApplications } from 'src/infrasctucture/job/types';

type ChartsContainerProps = {
  monthlyApplications: MonthlyApplications;
};

const ChartsContainer = ({ monthlyApplications }: ChartsContainerProps) => {
  const [chart, setChart] = useState<'bar' | 'area'>('bar');

  const toggleChart = () => {
    setChart((chart) => {
      if (chart === 'bar') {
        return 'area';
      }

      return 'bar';
    });
  };

  return (
    <section className="mt-16 text-center">
      <h4 className="mb-3 text-center">Monthly Applications</h4>
      <button
        className="mx-auto mt-4 text-xl capitalize text-[--primary-500]"
        onClick={toggleChart}
        type="button"
      >
        {chart === 'area' ? 'Area Chart' : 'Bar Chart'}
      </button>
      {chart === 'bar' ? (
        <BarChart monthlyApplications={monthlyApplications} />
      ) : (
        <AreaChart monthlyApplications={monthlyApplications} />
      )}
    </section>
  );
};

export default ChartsContainer;
