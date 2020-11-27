import React, { memo, PureComponent } from 'react';
import { connect } from "react-redux";
import { setMenuState } from "../../redux/actions";
import Dashboard from '../Dashboard';
import ChatConsole from '../ChatConsole';
import KnowledgeBase from '../KnowledgeBase';
import "./style.css";

const menus = [
  {
    key: "home",
    title: "Home",
    icon: ""
  },
  {
    key: "console",
    title: "Chats",
    icon: ""
  },
  {
    key: "profile",
    title: "Profile",
    icon: ""
  },
  {
    key: "setting",
    title: "Setting",
    icon: ""
  },
]


class CWVAPPRoot extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      menuBar: true,
      appPage: 'console',
    }
  }
  

  componentDidMount() {

  }

  onMenuToggle = () => {
    this.setState((oldState) => {
      return { ...oldState, menuBar: !oldState.menuBar }
    });
  };

  onMenuClick = (page) => {
    this.setState((oldState) => {
      return { ...oldState, appPage: page }
    });
  };


  render() {

    return (
      <div className="cwv-chatWidgetContainer">

        <div className="cwv-wraper">
          <div className={"cwv-container "+ (!this.state.menuBar ? "cwv-mobileMenu" : "")} style={{ display: this.state.menuBar ? "block" : "none2" }}>
            <div className="cwv-logoWraper">
              <a aria-current="dashboard" className="cwv-logo" href="#">
                CWV Chat
            </a>
            </div>

            <div className="cwv-profileWraper" >
              <div className="cwv-avatar cwv-avatarCircle">
              </div>
              <div>
                <h4 className="cwv-adminName">John Doe</h4>
                <button className="cwv-buttonRoot cwv-button cwv-onlineButton" tabIndex="0" type="button"><span
                  className="cwv-label"><i className="cwv-ball cwv-ballGreen"></i>online</span><span
                    className="cwv-popupRoot"></span></button>
              </div>
            </div>

            <div id="cwv-sidebar" className="">

              {menus.length && menus.map((menu, index) => {
                const active = menu.key === this.state.appPage ? "cwv-menuItemActive" : "";
                return (
                  <div key={"menu-" + index} className={"cwv-menuItem " + active} onClick={() => this.onMenuClick(menu.key)}>
                    <span className="cwv-menuIcon ">
                      <svg className="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024"
                        rotate="0">
                        <path
                          d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z">
                        </path>
                      </svg>
                    </span>
                    {this.state.menuBar && <span className="cwv-menuName">{menu.title}</span>}
                  </div>
                );
              })}


            </div>

          </div>

          <button className={"cwv-buttonRoot cwv-menuButton " + (!this.state.menuBar ? "cwv-mobileMenuIcon" : "")}  type="button" aria-label="Menu" onClick={this.onMenuToggle}>
            <span className="cwv-label">
              <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </span>
            <span className="MuiTouchRipple-root"></span>
          </button>

        </div>

        { this.state.appPage === "dashboard" && <Dashboard />}
        { this.state.appPage === "console" && <ChatConsole />}
        { this.state.appPage === "profile" && <KnowledgeBase />}
        { this.state.appPage === "setting" && <KnowledgeBase />}

      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  chatRoute: state.menus.chatRoute
})

export default connect(mapStateToProps, { setMenuState })(memo(CWVAPPRoot))
