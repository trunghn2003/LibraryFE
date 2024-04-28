import { Outlet } from "react-router-dom";
import "./index.scss"
import Header from "../Header";

function LayoutDefault() {
  return (
    <div className="layout-default">
      <div className="layout-default__header">
        <Header />
      </div>
      <div className="layout-default__main">
        <Outlet />
      </div>
        {/* <div className="layout-default__footer">
          <Footer />
        </div> */}
    </div>
  );
}
export default LayoutDefault;
