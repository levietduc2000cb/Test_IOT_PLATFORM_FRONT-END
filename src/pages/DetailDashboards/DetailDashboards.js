import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWidgets } from '~/api/widgetApi';
import FormCreateWidget from '~/components/FormCreateWidget';
import { getDevices } from '~/api/deviceApi';
import { toast } from 'react-toastify';
import DisplayWidget from '~/components/DisplayWidget';

const DetailDashboards = () => {
  const params = useParams();
  const [widgetsList, setWidgetList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deviceList, setDeviceList] = useState([]);

  const getListWigets = (idDasboard) => {
    getWidgets(idDasboard)
      .then((data) => {
        setWidgetList(data.data.data.dashboard);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListDevice = () => {
    getDevices()
      .then((data) => {
        setDeviceList(data.data.data.device);
      })
      .catch((err) => {
        toast.error('Có lỗi trong quá trình lấy dữ liệu');
      });
  };

  const handleClickCLoseModal = useCallback(() => {
    setOpenModal(false);
  }, []);

  useEffect(() => {
    getListWigets(params.id);
    getListDevice();
  }, [params]);
  return (
    <div className="bg-[#F0F3F4] pt-6">
      <div>
        <div className="flex h-10 items-center bg-[#F6F8F8] px-3 text-base">
          DashBoard Details
        </div>
        <div className="min-h-full bg-white px-3">
          {widgetsList.length > 0 ? (
            <DisplayWidget widgetsListDisplay={widgetsList} />
          ) : (
            <div className="flex justify-center pt-[15%]">
              <div className="rounded-sm border-4 border-dashed border-[#000A3D]  py-7 px-12 text-[#D91E1E]">
                Không có Widget
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        className="fixed right-10 bottom-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#D91E1E] p-1 text-4xl text-white"
      >
        +
      </button>
      {openModal && (
        <FormCreateWidget
          handleClickCLoseModal={handleClickCLoseModal}
          deviceList={deviceList}
          dashBoardId={params.id}
          onGetWidget={getListWigets}
        />
      )}
    </div>
  );
};

export default DetailDashboards;
