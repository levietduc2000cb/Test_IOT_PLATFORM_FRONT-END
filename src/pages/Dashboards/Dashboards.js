import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {
  deleteDashBoard,
  updateDashBoard,
  getAllDashBoard,
} from '~/api/dashBoardApi';
import Dialog from '~/components/Dialog';
import FormCreateDashBoard from '~/components/FormCreateDashBoard/FormCreateDashBoard';
import ListDashBoard from '~/components/ListDashBoard';
import SideBarIntroduces from '~/components/SideBarIntroduces';

const Dashboards = () => {
  const [openModalDeleteDashBoard, setOpenModalDeleteDashBoard] =
    useState(false);
  const [openModalUpdateDashBoard, setOpenModalUpdateDashBoard] =
    useState(false);
  const [dashBoardList, setDashBoardList] = useState([]);
  const idDashBoard = useRef();

  const handleSubmitSearchDashBoard = () => {};
  const handleGetDashBoard = () => {
    getAllDashBoard()
      .then((data) => {
        setDashBoardList(data.data.data.dashboard);
      })
      .catch((err) => {
        toast.error('Lấy dữ liệu Dashboard thất bại');
      });
  };
  const handleOpenModalDasboard = useCallback((idDashBoardCurren, type) => {
    idDashBoard.current = idDashBoardCurren;
    if (type === 'delete') {
      setOpenModalDeleteDashBoard(true);
    } else {
      setOpenModalUpdateDashBoard(true);
    }
  }, []);

  const handleCloseModalDasboard = useCallback((type) => {
    if (type === 'delete') {
      setOpenModalDeleteDashBoard(false);
    } else {
      setOpenModalUpdateDashBoard(false);
    }
  }, []);
  //Lấy tên dashboard từ id đã cho biết trước để sửa thông tin dashboard
  const getNameDashBoard = () => {
    const getName = dashBoardList.find(
      (dashBoard) => dashBoard._id === idDashBoard.current,
    );
    return getName.name;
  };
  //Xử lý xóa dashboard
  const handleDeleteDashboard = () => {
    deleteDashBoard(idDashBoard.current)
      .then((data) => {
        let newDashBoardList = dashBoardList.filter(
          (dashboard) => dashboard._id !== idDashBoard.current,
        );
        setDashBoardList(newDashBoardList);
        toast.success('Xóa dashboard thành công!', {
          theme: 'colored',
        });
      })
      .catch(() => {
        toast.error('Xóa dashboard thất bại!', {
          theme: 'colored',
        });
      })
      .finally(() => {
        idDashBoard.current = null;
        setOpenModalDeleteDashBoard(false);
      });
  };

  const handleUpdateDashboard = (newName) => {
    updateDashBoard(idDashBoard.current, { name: newName })
      .then((data) => {
        handleGetDashBoard();
        toast.success('Update dashboard thành công!', {
          theme: 'colored',
        });
      })
      .catch((err) => {
        toast.error('Update dashboard thất bại!', {
          theme: 'colored',
        });
      });
  };
  useEffect(() => {
    handleGetDashBoard();
  }, []);

  return (
    <div className="pb-5">
      <SideBarIntroduces
        title="Dashboards"
        content="A dashboard is a data visualization tool that transforms, displays, and organizes a collection of data captured and transmitted by IoT devices."
        contentBtn="Create a Dashboard"
        handleAddSucess={handleGetDashBoard}
        elementForm={FormCreateDashBoard}
      />
      <ListDashBoard
        handleOpenModalDashBoard={handleOpenModalDasboard}
        dashBoardList={dashBoardList}
        handleSubmitSearchDashBoard={handleSubmitSearchDashBoard}
        handleGetDashBoard={handleGetDashBoard}
      />
      {openModalDeleteDashBoard && (
        <Dialog
          nameBtn="Xóa dashboard"
          desBtn="Bạn sẽ mất tất cả dữ liệu bằng cách xóa dashboard của mình. Hành
          động này không thể quay trở lại được."
          handleClickCancel={() => {
            handleCloseModalDasboard('delete');
          }}
          handeClickDelete={handleDeleteDashboard}
        />
      )}
      {openModalUpdateDashBoard && (
        <FormCreateDashBoard
          type="update"
          initialValue={getNameDashBoard()}
          handleUpdateDashboard={handleUpdateDashboard}
          handleClickCLoseModal={() => {
            handleCloseModalDasboard('update');
          }}
        />
      )}
    </div>
  );
};

export default Dashboards;
