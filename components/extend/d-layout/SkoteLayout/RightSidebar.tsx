import React from "react";

//SimpleBar
import SimpleBar from "simplebar-react";

import "../style/rightbar.scss";
import { layoutTypes, topBarThemeTypes } from "../config";

interface IProps {
  onClose?: any;
  layoutType?: any;
  topBarThemeTypes?: any;
  changeLayout?: any;
  topbarTheme?: any;
  changeTopbarTheme?: any;
}
const RightSidebar = (props: IProps) => {
  const onCloseRightBar = () => {
    const { onClose } = props;
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <SimpleBar style={{ height: "900px" }}>
        <div data-simplebar className="h-100">
          <div className="rightbar-title px-3 py-3">
            <span className="float-end">
              <i
                onClick={(e) => {
                  onCloseRightBar();
                }}
                className="iconfont icon-tishidanchuangguanbi noti-icon"
              />
            </span>
            <h5 className="m-0">Settings</h5>
          </div>

          <hr className="my-2" />

          <div className="p-4">
            <div className="radio-toolbar">
              <span className="mb-2 d-block">Layouts</span>
              <input
                type="radio"
                id="radioVertical"
                name="radioFruit"
                value={layoutTypes.VERTICAL}
                checked={props.layoutType === layoutTypes.VERTICAL}
                onChange={(e) => {
                  if (e.target.checked) {
                    props.changeLayout && props.changeLayout(e.target.value);
                  }
                }}
              />
              <label className="me-1" htmlFor="radioVertical">
                Vertical
              </label>
              <input
                type="radio"
                id="radioHorizontal"
                name="radioFruit"
                value={layoutTypes.HORIZONTAL}
                checked={props.layoutType === layoutTypes.HORIZONTAL}
                onChange={(e) => {
                  if (e.target.checked) {
                    props.changeLayout && props.changeLayout(e.target.value);
                  }
                }}
              />
              <label htmlFor="radioHorizontal">Horizontal</label>
            </div>

            <hr className="mt-1" />

            <div className="radio-toolbar">
              <span className="mb-2 d-block" id="radio-title">
                Topbar Theme
              </span>
              <input
                type="radio"
                id="radioThemeLight"
                name="radioTheme"
                value={topBarThemeTypes.LIGHT}
                checked={props.topbarTheme === topBarThemeTypes.LIGHT}
                onChange={(e) => {
                  if (e.target.checked) {
                    props.changeTopbarTheme(e.target.value);
                  }
                }}
              />
              <label className="me-1" htmlFor="radioThemeLight">
                Light
              </label>
              <input
                type="radio"
                id="radioThemeDark"
                name="radioTheme"
                value={topBarThemeTypes.DARK}
                checked={props.topbarTheme === topBarThemeTypes.DARK}
                onChange={(e) => {
                  if (e.target.checked) {
                    props.changeTopbarTheme(e.target.value);
                  }
                }}
              />
              <label className="me-1" htmlFor="radioThemeDark">
                Dark
              </label>
              {props.layoutType === "vertical" ? null : (
                <>
                  <input
                    type="radio"
                    id="radioThemeColored"
                    name="radioTheme"
                    value={topBarThemeTypes.COLORED}
                    checked={props.topbarTheme === topBarThemeTypes.COLORED}
                    onChange={(e) => {
                      if (e.target.checked) {
                        props.changeTopbarTheme(e.target.value);
                      }
                    }}
                  />
                  <label className="me-1" htmlFor="radioThemeColored">
                    Colored
                  </label>
                </>
              )}
            </div>
          </div>
        </div>
      </SimpleBar>
    </>
  );
};

export default RightSidebar;
