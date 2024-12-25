import React from "react";

const Loader: React.FC = () => {
  return (
    <div id="ec-overlay">
      <div className="ec-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default Loader;
