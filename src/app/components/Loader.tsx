import React from "react";
import "./Loader.css";

const Loader: React.FC = () => (
  <div className="loader-bg">
    <div className="cssload-loader">
      <div className="cssload-inner cssload-one" />
      <div className="cssload-inner cssload-two" />
      <div className="cssload-inner cssload-three" />
    </div>
  </div>
);

export default Loader; 