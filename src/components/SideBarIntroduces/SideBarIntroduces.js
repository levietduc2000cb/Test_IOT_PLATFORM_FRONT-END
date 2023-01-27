import React, { memo } from 'react';
import PropTypes from 'prop-types';

import ButtonCreateForm from '../UI/ButtonCreateForm';

import Background_iot_platform from '~/assets/image/background_iot_platform.JPG';

const SideBarIntroduces = ({
  title,
  content,
  contentBtn,
  elementForm,
  handleAddSucess = () => {},
}) => {
  return (
    <div className="w-full p-12">
      <div className="flex items-center px-9">
        <div className="mr-12 w-full max-w-[500px] text-left">
          <div className="text-4xl font-medium leading-10">{title}</div>
          <div className="mt-4 mb-10 text-lg font-medium leading-5 text-[#58666e]">
            {content}
          </div>
          <ButtonCreateForm
            contentBtn={contentBtn}
            elementForm={elementForm}
            handleAddSucess={handleAddSucess}
          ></ButtonCreateForm>
        </div>
        <div className="mtb:hidden">
          <img
            src={Background_iot_platform}
            alt="background_iot_platform"
            className="h-[480px] w-[600px]"
          ></img>
        </div>
      </div>
    </div>
  );
};

SideBarIntroduces.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  contentBtn: PropTypes.string,
  elementForm: PropTypes.func,
  handleAddSucess: PropTypes.func,
};

export default memo(SideBarIntroduces);
