import React from 'react';

const FooterFilter = ({ todoFooterData, clicked }) => {
  return todoFooterData.map((elem) => {
    return (
      <li key={elem.id}>
        <button type="button" className={elem.btnClassName} onClick={() => clicked(elem.id)}>
          {elem.btnLabel}
        </button>
      </li>
    );
  });
};

export default FooterFilter;
