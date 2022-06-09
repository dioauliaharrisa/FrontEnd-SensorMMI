import React from "react";

export default function DataUpdateColumns({ title }) {
  return (
    <>
      <div className="pt-1 font-bold">{title}</div>
      <div className="grid grid-cols-2 justify-start">
        <div>
          <div>Error</div>
          <div>2</div>
        </div>
        <div>
          <div>Warning</div>
          <div>0</div>
        </div>
      </div>
    </>
  );
}
