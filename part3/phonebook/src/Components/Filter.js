import React from "react";

const Filter = ({filtering, handleFiltering}) => {
  return (
    <>
      <div>
        filter shown with <input value={filtering} onChange={handleFiltering} />
      </div>
    </>
  );
};

export default Filter;
