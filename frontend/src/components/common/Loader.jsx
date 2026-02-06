import React from "react";

const Loader = ({ size = "medium", color = "#2563eb" }) => {
  const sizeClasses = {
    small: "h-7 w-7 border-2",
    medium: "h-10 w-10 border-[3px]",
    large: "h-14 w-14 border-4",
  };

  return (
    <div className="flex items-center justify-center py-8">
      <div
        className={`animate-spin rounded-full border-slate-200 ${
          sizeClasses[size] || sizeClasses.medium
        }`}
        style={{ borderTopColor: color }}
      />
    </div>
  );
};

export default Loader;
