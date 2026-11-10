import React from 'react'
import RecentOrdersForDashboard from './_components/recent-orders';
import AddressCard from './_components/address-card';

const page = () => {
  return (
    <>
    <div className="grid grid-cols-3 gap-3">
      <div className="col-span-2">
        <RecentOrdersForDashboard />
      </div>
      <div className="col-span-1">
        <AddressCard />
      </div>
    </div>
    </>
  )
}

export default page;
