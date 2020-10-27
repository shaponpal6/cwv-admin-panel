import React, { PureComponent } from "react";
import ClientsListContainer from "./ClientsListContainer";
import AsyncClientData from "./AsyncClientData";
import MessagesContainer from "../../components/MessagesContainer";
import ClientDetailsComponent from "../../components/ClientDetailsComponent";
import Footer from "../../components/Footer";
// import "./style.css";

class CWVChatConsole extends PureComponent {

  render() {
    return (
      <div className="cwv-chatWraper ">


        <div className="cwv-console">
          <div className="cwv-consoleLeft">
            <ClientsListContainer />
          </div>

          <div className="cwv-userMessagesContainer">
            <ClientDetailsComponent />
            <section className="cwv-chatRoom">
              <AsyncClientData />
              <MessagesContainer />
            </section>

            <Footer />

          </div>
        </div>

      </div>
    );
  }
}

export default CWVChatConsole;
