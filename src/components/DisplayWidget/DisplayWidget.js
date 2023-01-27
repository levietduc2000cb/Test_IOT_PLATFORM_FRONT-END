import React from 'react';

import DashBoardTable from '~/components/DashBoardTable';
import DashBoardCart from '~/components/DashBoardCart';
import LineChart from '~/components/Charts/LineChart';
import PieChart from '~/components/Charts/PieChart';
import DoughnutChart from '~/components/Charts/DoughnutChart';
import VerticalBarChart from '~/components/Charts/VerticalBarChart';

const SELECT_WIDGET = {
  Card: DashBoardCart,
  Table: DashBoardTable,
  DoughnutChart: DoughnutChart,
  LineChart: LineChart,
  PieChart: PieChart,
  VerticalBarChart: VerticalBarChart,
};

const DisplayWidget = ({ widgetsListDisplay }) => {
  console.log('Widget : ', widgetsListDisplay);
  return (
    <div className="grid grid-cols-3">
      {widgetsListDisplay.map((widget) => {
        let Widget = SELECT_WIDGET[widget.type];
        return (
          <div className="flex items-center justify-center">
            <Widget key={widget._id} />
          </div>
        );
      })}
    </div>
  );
};

export default DisplayWidget;
