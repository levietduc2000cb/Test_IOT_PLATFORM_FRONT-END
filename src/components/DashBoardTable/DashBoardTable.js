import React from 'react';

const DashBoardTable = () => {
  return (
    <div className="overflow-x-auto shadow-xl sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 ">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">
              Device name
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">Temperature(°C)</div>
            </th>
            <th scope="col" className="py-3 px-6">
              <div className="flex items-center">Humidity(°F)</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white  ">
            <th
              scope="row"
              className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
            >
              Device 1
            </th>
            <td className="py-4 px-6 text-center">12</td>
            <td className="py-4 px-6 text-center">16</td>
          </tr>
          <tr className="border-b bg-white ">
            <th
              scope="row"
              className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
            >
              Device 2
            </th>
            <td className="py-4 px-6 text-center">41</td>
            <td className="py-4 px-6 text-center">23</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DashBoardTable;
