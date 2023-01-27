import { useCallback, useEffect } from 'react';
import { FaInfoCircle, FaRocket } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { getDevice, updateDevice } from '~/api/deviceApi';
import DetailInfor from '~/components/DetailInfor';
import FormTopic from '~/components/FormTopic';

const DetailDevice = () => {
  const [inforDevice, setInforDevice] = useState([]);
  const [topicConfi, setTopicConfi] = useState([]);
  const [openModalTopic, setOpenModalTopic] = useState(false);
  const params = useParams();

  const handleOpenModalTopic = useCallback(() => {
    setOpenModalTopic(true);
  }, []);
  const handleCloseModalTopic = (e) => {
    e.stopPropagation();
    getDeviceInfor(params.id);
    setOpenModalTopic(false);
  };

  const handleChangeInput = (indexInput, valueInput) => {
    let newArr = [...inforDevice];
    newArr[indexInput].infor = valueInput;
    setInforDevice(newArr);
  };

  const getDeviceInfor = (idDevice) => {
    getDevice(idDevice)
      .then((data) => {
        const { device, topic } = data.data.data;
        setInforDevice([
          {
            title: 'Device Name',
            infor: device.name,
            type: 'input',
            name: 'name',
          },
          {
            title: 'Type',
            infor: device.type,
            type: 'input',
            name: 'type',
          },
          {
            title: 'Device Description',
            infor: device.description,
            type: 'textarea',
            name: 'description',
          },
        ]);
        const getTopic = topic.map((t) => ({
          title: t.topicname,
          infor: t._id,
        }));
        setTopicConfi(getTopic);
      })
      .catch((err) => {
        toast.error('Lấy device thất bại');
      });
  };

  const handleUpdateDevice = () => {
    let newUpdateDevice = {};
    inforDevice.forEach((device) => {
      newUpdateDevice[device.name] = device.infor;
    });
    updateDevice(params.id, newUpdateDevice)
      .then((data) => {
        getDeviceInfor(data.data.data.device._id);
        toast.success('Update device thành công');
      })
      .catch((err) => {
        toast.error('Update device thất bại');
      });
  };

  useEffect(() => {
    if (params.id) {
      getDeviceInfor(params.id);
    }
  }, [params]);

  return (
    <div className="bg-[#F0F3F4] pt-6">
      <div>
        <div className="flex h-10 items-center bg-[#F6F8F8] px-3 text-base">
          Device Details
        </div>
        <div className="min-h-full bg-white px-3">
          <div className="gridCustom">
            <div></div>
            <div className="flex items-center py-5 text-base font-bold leading-5 text-black">
              <FaInfoCircle className="mr-1" />
              Device Information
            </div>
          </div>
          {inforDevice.map((infor, index) => {
            return (
              <DetailInfor
                key={index}
                indexInput={index}
                title={infor.title}
                infor={infor.infor}
                type={infor.type}
                handleChangeInput={handleChangeInput}
              />
            );
          })}
          {topicConfi.length > 0 && (
            <div>
              <div className="gridCustom">
                <div></div>
                <div className="flex items-center py-5 text-base font-bold leading-5 text-black">
                  <FaRocket className="mr-1" />
                  Topic Device Configuration
                </div>
              </div>
              {topicConfi.map((infor, index) => {
                return (
                  <DetailInfor
                    key={index}
                    title={infor.title}
                    infor={infor.infor}
                  />
                );
              })}
            </div>
          )}
          <button
            className="float-right mr-6 mt-6 rounded-sm bg-[#D91E1E] px-5 py-2 text-white hover:bg-[#d91e1eee]"
            onClick={handleOpenModalTopic}
          >
            Create New Topic
          </button>
          <button
            className="float-right mr-6 mt-6 rounded-sm bg-[#000A3D] px-5 py-2 text-white hover:bg-[#000a3de1]"
            onClick={handleUpdateDevice}
          >
            Update device
          </button>
          {openModalTopic && (
            <FormTopic
              handleCloseModalTopic={handleCloseModalTopic}
              idDevice={params.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailDevice;
