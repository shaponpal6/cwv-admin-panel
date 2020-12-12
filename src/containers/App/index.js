import React, { memo, PureComponent } from 'react';
import { connect } from "react-redux";
import { setMenuState } from "../../redux/actions";
import Dashboard from '../Dashboard';
import ChatConsole from '../ChatConsole';
import Profile from '../Profile';
import "./style.css";
import { Home, MessageSquare, Settings, Users, Globe } from 'react-feather';
import SettingsPage from '../SettingsPage';
import Tracking from '../Tracking';
                      
                      
const menus = [
  {
    key: "home",
    title: "Home",
    icon: "Home"
  },
  {
    key: "tracking",
    title: "Tracking",
    icon: "Globe"
  },
  {
    key: "console",
    title: "Chats",
    icon: "MessageSquare"
  },
  {
    key: "profile",
    title: "Profile",
    icon: "Users"
  },
  {
    key: "setting",
    title: "Settings",
    icon: "Settings"
  },
];
                      
const setIcon = (icon, size="16") => {
  switch (icon) {
    case 'Home':
      return <Home size={size}/>
    case 'Globe':
      return <Globe size={size}/>
    case 'MessageSquare':
      return <MessageSquare size={size}/>
    case 'Users':
      return <Users size={size}/>
    case 'Settings':
      return <Settings size={size}/>
    default:
      break;
  }
}


class CWVAPPRoot extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      menuBar: true,
      appPage: 'tracking',
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
    console.log('page', page)
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
                      {menu.icon && setIcon(menu.icon)}
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
          </button>

        </div>

        { this.state.appPage === "home" && <Dashboard />}
        { this.state.appPage === "tracking" && <Tracking onMenuChange={this.onMenuClick}/> }
        { this.state.appPage === "console" && <ChatConsole />}
        { this.state.appPage === "profile" && <Profile />}
        { this.state.appPage === "setting" && <SettingsPage/>}

      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  chatRoute: state.menus.chatRoute
})

export default connect(mapStateToProps, { setMenuState })(memo(CWVAPPRoot))
