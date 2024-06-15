import { useEffect, useState } from 'react';
import { infoIcon } from '../../common/icons';
import { CustomTooltip } from '../../common/components';
import { All, Delivered, InTransit, New, PickupMenifests, ReadyToShip, Rto } from './components';
import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';

const Tabs = ({ tabs, tabClassNames, onTabChange = () => {} }) => {
  const [activeTab, setActiveTab] = useState(JSON.parse(localStorage.getItem('activeTab')));
  console.log('Activeeeeeeee', activeTab);

  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;

  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const tabID = tabs.find((_, i) => i === activeTab);
  console.log(tabID.id);

  // Handler function to update the state when the selected value changes
  const handleChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const handlePageIncrement = () => {
    setPage((prev) => prev + 1);
  };

  const handlePageDecrement = () => {
    setPage((prev) => (prev <= 1 ? prev : prev - 1));
  };

  const fetchOrdersData = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BACKEND_URL}/order/get_filtered_orders?created_by=${user_id}&${
          id !== 'all' && `status=${id}`
        }&page=${page}&page_size=${itemsPerPage}`,
      );
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast('There is some error while fetching orders.', { type: 'error' });
    }
  };

  const handleClick = (index) => {
    setActiveTab(index);
    onTabChange(index);
    localStorage.setItem('activeTab', JSON.stringify(index));
  };

  useEffect(() => {
    localStorage.setItem('activeTab', activeTab.toString());
    fetchOrdersData(tabID.id);
  }, [itemsPerPage, page, activeTab]);

  return (
    <div className="mb-4">
      <div
        className="dark:border-gray-700 -mb-px flex flex-wrap border-b-2 border-gray-200 text-center text-sm font-medium"
        id="default-tab">
        {tabs.map((tab, i) => {
          return (
            <li className={`me-2 flex`} key={tab.id}>
              <button
                key={tab.id}
                className={`me-2 inline-flex items-center rounded-t-lg border-b-4 p-2 ${
                  i === activeTab ? 'border-red-600 text-rose-500' : 'border-transparent text-[#9CA3AF]'
                } ${tabClassNames}`}
                id={`${tab.id}-tab`}
                type="button"
                onClick={() => handleClick(i, tab.id)}>
                {tab.title}
                {tab?.tooltip && (
                  <CustomTooltip text={tab.tooltip}>
                    <img className="ms-2" src={infoIcon} />
                  </CustomTooltip>
                )}
              </button>
            </li>
          );
        })}
      </div>
      <div id="default-tab-content">
        <div className={`rounded-lg`}>
          {activeTab === 0 && <New data={data} isLoading={loading} />}
          {activeTab === 1 && <ReadyToShip data={data} isLoading={loading} />}
          {activeTab === 2 && <PickupMenifests data={data} isLoading={loading} />}
          {activeTab === 3 && <InTransit data={data} isLoading={loading} />}
          {activeTab === 4 && <Delivered data={data} isLoading={loading} />}
          {activeTab === 5 && <Rto data={data} isLoading={loading} />}
          {activeTab === 6 && <All data={data} isLoading={loading} />}
          <div className="flex w-full flex-wrap-reverse justify-between gap-2 rounded-lg bg-white px-4 py-2">
            <div className="mr-2 flex items-center">
              <div className="mr-4 text-xs text-black">{'Items per page: '}</div>
              <div>
                <select
                  id="select"
                  value={itemsPerPage}
                  className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  onChange={handleChange}>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="60">60</option>
                </select>
              </div>
            </div>
            <div className="flex items-center text-xs">
              <Button
                color="light"
                className="mr-6 border-0 *:px-3 *:text-xs *:font-normal"
                onClick={handlePageDecrement}
                disabled={page === 1 ? true : false}>
                <FontAwesomeIcon icon={faArrowLeft} className="mx-2 h-4 w-3" />
                {'PREV'}
              </Button>
              <button className="rounded-lg border-0 bg-gray-100 px-3 py-2 font-medium" disabled={true}>
                {page}
              </button>
              <Button
                color="light"
                className="ml-6 border-0 *:px-3  *:text-xs *:font-normal"
                onClick={handlePageIncrement}>
                {'NEXT'} <FontAwesomeIcon icon={faArrowRight} className="mx-2 h-4 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;