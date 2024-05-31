import React from 'react';
import { customSelectData } from '../../constants';
import CustomSingleSelect from './CustomSingleSelect';

function CustomSelect() {
  const [sortData, ...otherSelectData] = customSelectData;
  return (
    <div className="flex">
      {otherSelectData &&
        otherSelectData.map((data, index) => {
          return (
            <div key={index}>
              <CustomSingleSelect key={index} data={data} />
            </div>
          );
        })}
      {sortData && <CustomSingleSelect data={sortData} />}
    </div>
  );
}

export default CustomSelect;
