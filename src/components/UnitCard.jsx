import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function UnitCard({
  parameter,
  value,
  importedSetFilterParameter,
}) {
  const splittedValue = value.split(" ");
  const magnitude = splittedValue[0];
  const unit = splittedValue[1];

  const className = () => {
    if (magnitude > 100) {
      return "bg-red-500 text-white";
    }
    if (magnitude > 80) {
      return "bg-yellow-300 text-gray-600";
    }
    return "bg-white text-gray-600";
  };

  return (
    <div
      onClick={() => importedSetFilterParameter(parameter)}
      className={`${className()} p-2 rounded-lg shadow-xl flex-col cursor-pointer`}
    >
      {/* disini ada nama datanya beserta unit dengan nomornya */}
      <div className="mx-2 flex justify-between items-center">
        <div className="text-2xl">{parameter}</div>
        <div className="text-sm">Unit 01</div>
      </div>
      <div className="mx-2 py-5 font-bold ">
        <span className="mr-1 text-4xl">{magnitude}</span>
        <span className="mr-1 text-2xl">{unit}</span>
        {magnitude > 80 && magnitude < 101 && (
          <i className="mx-1 fa-solid fa-triangle-exclamation text-red-500"></i>
        )}
      </div>
    </div>
  );
}
