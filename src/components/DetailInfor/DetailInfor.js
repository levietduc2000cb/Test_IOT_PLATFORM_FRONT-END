import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa';

const DetailInfor = ({ indexInput, title, infor, type, handleChangeInput }) => {
  const TypeInfor = {
    input: 'input',
    textarea: 'textarea',
  };
  let Tag = TypeInfor[type];
  return (
    <div className="gridCustom my-4 text-base">
      <div className="flex items-start justify-end text-black">
        <div className="flex items-center">
          {title}
          <FaInfoCircle className="ml-1" />
        </div>
      </div>
      {type ? (
        <Tag
          className="mr-8 flex items-center p-1 leading-5 text-black"
          value={infor}
          rows="5"
          required
          onChange={(e) => {
            handleChangeInput(indexInput, e.target.value);
          }}
        />
      ) : (
        <div className="mr-8 flex items-center leading-5 text-black">
          {infor}
        </div>
      )}
    </div>
  );
};

DetailInfor.propTypes = {
  title: PropTypes.string,
  infor: PropTypes.string,
};

export default DetailInfor;
