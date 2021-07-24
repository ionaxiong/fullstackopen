import React from "react";

const Filter = ({ filtering, handleFiltering }) => {
  return (
    <>
      <div>
        find countries <input value={filtering} onChange={handleFiltering} />
      </div>
    </>
  );
};

export default Filter;
