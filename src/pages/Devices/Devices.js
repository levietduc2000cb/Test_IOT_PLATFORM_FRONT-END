import React, { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  FaRocket,
  FaMagic,
  FaLock,
  FaBook,
  FaVideo,
  FaHeadset,
  FaCode,
} from 'react-icons/fa';

import SideBarIntroduces from '~/components/SideBarIntroduces';
import ListDevices from '~/components/ListDevices';
import FormCreateDevice from '~/components/FormCreateDevice';
import BlockWrapperIntroduce from '~/components/BlockWrapperIntroduce';
import Dialog from '~/components/Dialog';
// import Pagination from '~/components/Pagination';
import { getDevices, deleteDevice, searchDevice } from '~/api/deviceApi';

const CONTENT1 = [
  {
    icon: FaRocket,
    title: 'CONNECT ANY DEVICE',
    content:
      'Thinger.io platform is hardware agnostic. Use it to connect any device, from microcontrollers to Linux devices. Use the protocol you prefer.',
  },
  {
    icon: FaMagic,
    title: 'UNIQUE IOT EXPERIENCE',
    content:
      'Use IOTMP protocol to enable REST APIs on devices, remote shells, tunnels to device services, configurable streams, API discovery, etc.',
  },
  {
    icon: FaLock,
    title: 'SECURE DEPLOYMENT',
    content:
      'All our endpoints and compatible devices are secure by default. Device access can be granted with OAuth2 clients, access tokens, etc.',
  },
];

const CONTENT2 = [
  {
    icon: FaBook,
    title: 'Product Docs',
    subTitle: 'Devices Documentation',
    content: 'Documentation about devices and its configuration',
  },
  {
    icon: FaVideo,
    title: 'Product Tutorial',
    subTitle: 'Devices Tutorial',
    content: 'Tutorial to get started with devices and its features',
  },
  {
    icon: FaHeadset,
    title: 'Product Support',
    subTitle: 'Devices Support',
    content: 'Ask our experts about devices and its possibilities',
  },
  {
    icon: FaCode,
    title: 'API',
    subTitle: 'Devices API',
    content: 'Manage and configure devices via REST API',
  },
];

const Devices = () => {
  const [deviceList, setDeviceList] = useState([]);
  const [openModalDeleteDevice, setOpenModalDeleteDevice] = useState(false);

  const idDevice = useRef(null);

  const handleCloseModalDeleteDevice = () => {
    setOpenModalDeleteDevice(false);
  };

  const handleGetDevice = () => {
    getDevices()
      .then((data) => {
        setDeviceList(data.data.data.device);
      })
      .catch((err) => {
        toast.error('C?? l???i trong qu?? tr??nh l???y thi???t b???!', {
          theme: 'colored',
        });
      });
  };

  const handleDeleteDevice = () => {
    deleteDevice(idDevice.current)
      .then((data) => {
        let newDeviceList = deviceList.filter(
          (device) => device._id !== idDevice.current,
        );
        setDeviceList(newDeviceList);
        toast.success('X??a thi???t b??? th??nh c??ng!', {
          theme: 'colored',
        });
      })
      .catch(() => {
        toast.error('X??a thi???t b??? th???t b???i!', {
          theme: 'colored',
        });
      })
      .finally(() => {
        idDevice.current = null;
        setOpenModalDeleteDevice(false);
      });
  };

  const handleSubmitSearchDevice = useCallback((nameDevice) => {
    if (nameDevice.trim() === '') {
      return;
    } else {
      searchDevice(nameDevice)
        .then((data) => {
          setDeviceList(data.data.data);
        })
        .catch(() => {
          toast.error('T??m ki???m thi???t b??? th???t b???i!', {
            theme: 'colored',
          });
        });
    }
  }, []);

  useEffect(() => {
    handleGetDevice();
  }, []);

  const handleOpenModalDeleteDevice = useCallback((idDeviceDelete) => {
    idDevice.current = idDeviceDelete;
    setOpenModalDeleteDevice(true);
  }, []);

  return (
    <div className="pb-6">
      <SideBarIntroduces
        title="Devices"
        content="No matter if it has Ethernet, Wifi, or GSM. No problem if it uses HTTP, MQTT, IOTMP, Sigfox, Lora. Almost any device can be connected to the platform."
        contentBtn="Create a Device"
        elementForm={FormCreateDevice}
        handleAddSucess={handleGetDevice}
      />
      <BlockWrapperIntroduce
        title1="Why use Thinger.io to connect your devices?"
        content1={CONTENT1}
        title2="Learn more about devices"
        content2={CONTENT2}
      ></BlockWrapperIntroduce>
      <ListDevices
        handleOpenModalDeleteDevice={handleOpenModalDeleteDevice}
        deviceList={deviceList}
        handleSubmitSearchDevice={handleSubmitSearchDevice}
        handleGetDevice={handleGetDevice}
      />

      {openModalDeleteDevice && (
        <Dialog
          nameBtn="X??a thi???t b???"
          desBtn="B???n s??? m???t t???t c??? d??? li???u b???ng c??ch x??a thi???t b??? c???a m??nh. H??nh
          ?????ng n??y kh??ng th??? quay tr??? l???i ???????c."
          handleClickCancel={handleCloseModalDeleteDevice}
          handeClickDelete={handleDeleteDevice}
        />
      )}
      {/* <div className="mt-4 mr-4 flex justify-end">
        <Pagination></Pagination>
      </div> */}
    </div>
  );
};

export default Devices;
