import _ from "lodash";
import React from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  children: JSX.Element;
  theme: "dark" | "light";
  logo?: any;
  title?: any;
  changeCollpsed?: any;
}
const Sidebar = (props: IProps) => {
  function tToggle() {
    const body = document.body;

    const toggleCollpsed = () => {
      if (window.screen.width <= 998) {
        body.classList.toggle("sidebar-enable");
      } else {
        body.classList.toggle("vertical-collpsed");
        body.classList.toggle("sidebar-enable");
      }
    };

    if (typeof props.changeCollpsed === "function") {
      props.changeCollpsed();
      _.delay(() => {
        toggleCollpsed();
      }, 200);

      return;
    }

    toggleCollpsed();
  }

  return (
    <>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <NavLink to="/" className="logo">
            <span className="logo-lg">{props.logo}</span>
            <span className="logo-title logo-lg">{props.title}</span>
          </NavLink>

          <button
            type="button"
            onClick={() => {
              tToggle();
            }}
            className="btn btn-sm font-size-16 header-item white-icon"
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
