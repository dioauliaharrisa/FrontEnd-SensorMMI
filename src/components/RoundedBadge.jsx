import React from "react";

export default function RoundedBadge({ badgeName, badgeIcon }) {
  return (
    <div className="flex py-1 px-3 bg-white rounded-full items-center">
      <div className="text-cyan-700">{badgeIcon}</div>
      <div className="text-cyan-700 px-1">{badgeName}</div>
    </div>
  );
}
