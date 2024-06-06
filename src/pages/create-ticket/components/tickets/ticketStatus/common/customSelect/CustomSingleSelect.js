import { useState } from 'react';

function CustomSingleSelect({ data }) {
  const [showList, setShowList] = useState(false);
  const [lists, setLists] = useState(data.lists);

  console.log(lists);

  const handleShowList = () => {
    setShowList(!showList);
  };
  return (
    <div className="relative cursor-pointer rounded-lg border">
      <div
        className="flex w-52 items-center justify-between rounded-sm bg-white px-2.5 py-1.5"
        onClick={handleShowList}>
        <p className="text-[12px] font-semibold">{data.selectName}</p>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="h-4 w-4">
          <path d="M3.81 4.38 8 8.57l4.19-4.19 1.52 1.53L8 11.62 2.29 5.91l1.52-1.53z" />
        </svg>
      </div>
      {showList && (
        <div className="absolute z-50 mt-2 max-h-52 w-full overflow-hidden overflow-y-auto rounded-lg bg-white">
          {data &&
            data.lists.map((list, index) => {
              return (
                <div key={index}>
                  <ul className="px-2 py-2 text-[12px] font-semibold">
                    {typeof list !== 'object' ? (
                      <p>{list}</p>
                    ) : (
                      <>
                        {list?.titleName && <p className="py-2 font-bold">{list?.titleName}</p>}
                        <div className="flex gap-2">
                          <input
                            type="checkbox"
                            id="check-box"
                            name="check-box"
                            className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />

                          <p> {list?.title}</p>
                        </div>
                      </>
                    )}
                  </ul>
                </div>
              );
            })}
          {data.selectName !== 'Last 30 Days' && data.selectName !== 'Sort by:Recently Updated' && (
            <div className="flex justify-end gap-2 border-t px-2 py-2 text-[13px] font-semibold text-white ">
              <button className="rounded-lg bg-blue-400 px-2 py-1 shadow">clear</button>
              <button className="rounded-lg bg-blue-400 px-2 py-1 shadow">Apply</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomSingleSelect;