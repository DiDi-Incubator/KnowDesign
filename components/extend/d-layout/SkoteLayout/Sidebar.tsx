import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  children: JSX.Element;
  theme: "dark" | "light";
  logo?: any;
}
const Sidebar = (props: IProps) => {
  function tToggle() {
    const body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <NavLink to="/" className="logo logo-dark">
            <span className="logo-sm">{props.logo}</span>
            <span className="logo-lg">
              <img src={props.logo} alt="" height="17" />
            </span>
          </NavLink>

          <button
            type="button"
            onClick={() => {
              tToggle();
            }}
            className="btn btn-sm font-size-16 header-item "
            id="vertical-menu-btn"
          >
            <i className="iconfont icon-gongzuotaibeifen" />
          </button>
        </div>
        <div data-simplebar className="h-100">
          {props.children}
        </div>
        <div className="sidebar-background"></div>
      </div>
    </>
  );
};

export default Sidebar;
