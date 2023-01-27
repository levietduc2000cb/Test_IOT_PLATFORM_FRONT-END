import React from 'react';

import DashBoardTable from '~/components/DashBoardTable';
import DashBoardCart from '~/components/DashBoardCart';

const ListDashBoardCutom = () => {
  return (
    <div>
      <div className="h-10 flex items-center bg-[#F8F8F8] px-10">
        List Dashboard Custom
      </div>
      <div className="grid grid-cols-2 gap-10 mx-10">
        <div className="flex items-center justify-center h-96">
          <DashBoardTable />
        </div>
        <div className="flex items-center justify-center h-96">
          <DashBoardCart></DashBoardCart>
        </div>
      </div>
    </div>
  );
};

export default ListDashBoardCutom;
