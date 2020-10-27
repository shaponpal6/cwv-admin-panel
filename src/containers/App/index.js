import React, { memo, PureComponent } from "react";
import { connect } from "react-redux";
import { setMenuState } from "../../redux/actions";
import Dashboard from '../Dashboard';
import ChatConsole from '../ChatConsole';
import KnowledgeBase from '../KnowledgeBase';
// import "./style.css";


class CWVAPPRoot extends PureComponent {



  // Chat Button Open / Close
  onMenuClick = (e) => {
    console.log(e);
    this.props.setMenuState(e);
  };


  render() {

    return (
      <div className="cwv-chatWidgetContainer">

        <div className="cwv-wraper">
          <div className="cwv-container">
            <div className="cwv-logoWraper">
              <a aria-current="dashboard" className="cwv-logo" href="#">
                Chat App
            </a>
            </div>

            <div className="cwv-profileWraper" style={{ opacity: 1, marginTop: 0 }}>
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

              <div className="cwv-menuItem cwv-menuItemActive" key="dashboard" onClick={() => this.onMenuClick('console')}>
                <span className="cwv-menuIcon ">
                  <svg className="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024"
                    rotate="0">
                    <path
                      d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z">
                    </path>
                  </svg>
                </span>
                <span className="cwv-menuName">Home</span>
              </div>
              <div className="cwv-menuItem" key="insights" onClick={() => this.onMenuClick('console')}>
                <span className="cwv-menuIcon">
                  <svg className="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024"
                    rotate="0">
                    <path
                      d="M576 161.652c90.586 7.41 174.708 46.048 239.618 110.988 72.47 72.5 112.382 168.848 112.382 271.446 0 51.848-10.16 102.084-30.198 149.406-19.36 45.718-47.080 86.768-82.388 122.048-35.308 35.278-76.408 62.962-122.16 82.302-47.346 20.020-97.646 30.162-149.504 30.162-82.386 0-160.94-25.694-227.168-74.292-31.9-23.41-59.914-51.466-83.266-83.384-16.756-22.906-30.844-47.448-42.082-73.268l384.766-96.068v-438.992zM544 128v448l-395.51 98.752c54.816 165.69 211.192 285.248 395.26 285.248 229.75 0 416.25-186.25 416.25-416s-186-416-416-416v0z M480 96.362v429.886l-360.684 91.46c-18.234-47.136-22.394-113.946-22.316-138.992v-0.142c0-94.622 32.93-187.492 90.346-254.796 33.47-39.236 75.004-69.962 123.442-91.326 49.41-21.79 106.25-33.904 169.212-36.090zM512 64h-11c-320 0-437 232.5-437 414.574 0 0 0.5 113.332 37.82 176.582l410.18-104.010v-487.146z">
                    </path>
                  </svg>
                </span>
                <span className="cwv-menuName">Insights</span>
              </div>
              <div className="cwv-menuItem" key="console" onClick={() => this.onMenuClick('console')}>
                <span className="cwv-menuIcon">
                  <svg className="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024"
                    rotate="0">
                    <path
                      d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z">
                    </path>
                  </svg>
                </span>
                <span className="cwv-menuName">Chat</span>
              </div>
              <div className="cwv-menuItem" key="setting" onClick={() => this.onMenuClick('console')}>
                <span className="cwv-menuIcon">
                  <svg className="sc-bdVaJa fUuvxv" fill="#000000" width="22px" height="22px" viewBox="0 0 1024 1024"
                    rotate="0">
                    <path
                      d="M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z">
                    </path>
                  </svg>
                </span>
                <span className="cwv-menuName" >Setting</span>
              </div>


            </div>

          </div>

          <button className="cwv-buttonRoot cwv-menuButton" tabIndex="0" type="button" aria-label="Menu">
            <span className="cwv-label">
              <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </svg>
            </span>
            <span className="MuiTouchRipple-root"></span>
          </button>

        </div>
        {/* </div> */}


        {/* <Row>
          <Col flex="100px">Simple ChatApp</Col>
          <Col flex="auto">

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.chatRoute]}>
              <Menu.Item key="dashboard" onClick={this.onMenuClick}>Dashboard</Menu.Item>
              <Menu.Item key="console" onClick={this.onMenuClick}>Console</Menu.Item>
              <Menu.Item key="knowledgebase" onClick={this.onMenuClick}>Knowledge Base</Menu.Item>
            </Menu>
          </Col>
          <Col flex="100px">BTN</Col>
        </Row> */}


        { this.props.chatRoute === "dashboard" && <Dashboard />}
        { this.props.chatRoute === "console" && <ChatConsole />}
        { this.props.chatRoute === "knowledgebase" && <KnowledgeBase />}

      </div >
    )
  }
}

const mapStateToProps = (state) => ({
  chatRoute: state.menus.chatRoute
})

export default connect(mapStateToProps, { setMenuState })(memo(CWVAPPRoot))
