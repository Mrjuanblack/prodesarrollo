import React from "react";

export const GlobalLoaderComponent = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-sm transition-opacity duration-300">
      <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
};
