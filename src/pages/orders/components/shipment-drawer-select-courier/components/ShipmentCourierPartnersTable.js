import DataTable from 'react-data-table-component';
import { infoIcon } from '../../../../../common/icons';
import { CustomTooltip, RatingProgressBar } from '../../../../../common/components';
import axios from 'axios';
import { toast } from 'react-toastify';

const ShipmentCourierPartnersTable = ({ orderId, shipmentDetails, closeShipmentDrawer }) => {
  const handleShipOrder = () => {
    if (orderId) {
      axios
        .post(`http://43.252.197.60:8030/order/${orderId}/shipment`)
        .then((resp) => {
          if (resp.status === 200) {
            toast(resp.success ? 'Order shipped successfully' : resp.error, {
              type: resp.status ? 'success' : 'error',
            });
            if (resp.success) {
              closeShipmentDrawer();
            }
          }
        })
        .catch((e) => {
          // eslint-disable-next-line no-console
          console.error(e)
          toast('Unable to ship order', { type: 'error' });
        });
    }
  };

  const columns = [
    {
      name: 'Courier Partner',
      selector: (row) => (
        <div className="flex gap-1 pb-4 pt-7 text-left">
          <div>{/* <img src={''} className="h-10 w-10 rounded-full bg-gray-400" /> */}</div>
          <div>
            <h4 className="pb-1.5 text-xs font-medium text-[#555]">
              {row?.partner_name || 'Xpressbees Surface'}
            </h4>
            <div className="pb-1.5 text-xs text-[#555]">
              {`${Number(row?.surface_max_weight || 0) ? 'Surface ' : 'Air'} | Min-weight: `}
              <span className="font-medium">
                {Number(row?.surface_max_weight || 0) ? row?.surface_max_weight : row?.air_max_weight || 0}
              </span>
            </div>
            <div className="pb-1.5 text-xs text-[#555]">
              {`RTO Charges: ₹`}
              <span className="font-medium">{row?.charge_RTO}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      name: 'Rating',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="relative h-12 w-12 text-sm font-medium">
            <RatingProgressBar rating={row?.rating || 0} />
          </div>
        </div>
      ),
    },
    {
      name: 'Expected Pickup',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="text-xs text-[#555]">{row?.expected_pickup || '-'}</div>
        </div>
      ),
    },
    {
      name: 'Estimated Delivery',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="text-xs text-[#555]">{row?.estimated_delivery || '-'}</div>
        </div>
      ),
    },
    {
      name: 'Chargeable Weight',
      selector: (row) => (
        <div className="flex h-full w-full flex-col gap-1 py-2 text-center">
          <div className="text-xs text-[#555]">{`${row?.charged_weight || ''} Kg`}</div>
        </div>
      ),
    },
    {
      name: 'Charges',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="flex items-center">
            <div className="text-base font-bold text-[gray]">{`₹${row?.total_amount || ''}`}</div>
            <CustomTooltip
              text={
                <>
                  <div className="mb-1.5">
                    {`Freight Charge: `}
                    <span className="font-bold">{`₹ ${row?.charge_freight || ''}`}</span>
                  </div>
                  <div className="">
                    {`Cod Charges: `}
                    <span className="font-bold">{`₹ ${row?.charge_COD || ''}`}</span>
                  </div>
                </>
              }>
              <img src={infoIcon} className="ml-1" />
            </CustomTooltip>
          </div>
        </div>
      ),
    },
    {
      name: 'Action',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <button
            id={row.id}
            className="min-w-fit rounded bg-indigo-600 px-5 py-2 text-white"
            onClick={handleShipOrder}>
            {'Ship Now'}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3 h-full w-full text-left">
      <div className="text-xs text-[#888]">{`${shipmentDetails?.length || 0} Couriers Found`}</div>
      <div className="mt-4 h-full max-h-full w-full overflow-auto">
        <DataTable columns={columns} data={shipmentDetails || []} sortActive={false} />
      </div>
    </div>
  );
};

export default ShipmentCourierPartnersTable;