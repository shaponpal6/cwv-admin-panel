import React, { PureComponent } from "react";
import ClientsListContainer from "./ClientsListContainer";
import AsyncClientData from "./AsyncClientData";

class CWVChatConsole extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      clientId: ''
    }
  }

  setClientId = (uid) => {
    this.setState((oldState) => {
      if (oldState.clientId !== uid) {
        return { ...oldState, clientId: uid }
      }
      return oldState;
    });
  };


  render() {
    return (
      <div className="cwv-chatWraper ">
        <div className="cwv-console">
          <div className="cwv-consoleLeft">
            <ClientsListContainer setClientId={this.setClientId} />
          </div>
          <div className="cwv-userMessagesContainer">
            <AsyncClientData clientId={this.state.clientId} />
          </div>
        </div>
      </div>
    );
  }
}

export default CWVChatConsole;
