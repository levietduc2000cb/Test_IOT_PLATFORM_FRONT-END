import React from 'react';

const DashBoardTable = () => {
  return (
    <div className="overflow-x-auto sm:rounded-lg shadow-xl">
      <table className="w-full text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
          <tr className="bg-white border-b  ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
            >
              Device 1
            </th>
            <td className="py-4 px-6 text-center">12</td>
            <td className="py-4 px-6 text-center">16</td>
          </tr>
          <tr className="bg-white border-b ">
            <th
              scope="row"
              className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
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
