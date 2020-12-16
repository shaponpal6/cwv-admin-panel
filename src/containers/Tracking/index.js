import React, { useState, useEffect, memo } from "react";
import { Globe, Home, Settings } from "react-feather";
import { useDispatch } from "react-redux";
import uniqid  from "uniqid";
import { setClientID } from "../../redux/actions";
import { useDocument } from "react-firebase-hooks/firestore";
import { withFirebase } from "../../firebase";
import { useTable, usePagination, useSortBy } from "react-table";
import { getTime } from "../../functions/time";

import "./style.css";
import makeData from "./makeData";

function Tracking({ firebase, onMenuChange }) {
  const dispatch = useDispatch();
  console.log("firebase", firebase);
  console.log("onMenuChange", onMenuChange);
  const [sessionsList, setSessionsList] = useState([]);
  const [visitorsList, setVisitorsList] = useState([]);
  // const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [activeSession, setActiveSession] = useState(localStorage.getItem('cwvActiveSession'));
  const [activeSessionName, setActiveSessionName] = useState((sessionsList.length && sessionsList.hasOwnProperty(activeSession) && sessionsList[activeSession]['name']) ? sessionsList[activeSession]['name'] : (localStorage.getItem('cwvActiveSessionName') ?? 'Select Collection'));
  const [sessionName, setSessionName] = useState("");
  const [sessionDuration, setSessionDuration] = useState("");

  const makeNewSession = (e) => {
    const sessionID = uniqid('cwvCollection-');
    const session = {
      name: sessionName,
      sessionEnd: sessionDuration,
      sessionStart: Date.now(),
      status: "on",
      trackingID: sessionID,
    };
    console.log('session :>> ', session);
    firebase.makeNewTracking(sessionID, session)
    firebase.doTracking( session)
    setActiveSession(sessionID)
    setActiveSessionName(sessionName)
    localStorage.setItem('cwvActiveSession', sessionID)
    localStorage.setItem('cwvActiveSessionName', sessionName)
  };

  const changeSession = (e) =>{
    const val = e.nativeEvent.target.value;
    var index = e.nativeEvent.target.selectedIndex;
    setActiveSession(val);
    setActiveSessionName(e.nativeEvent.target[index].text);
  }

  const [chatSessions, chatSessionsLoading, chatSessionsError] = useDocument(
    firebase.getData("actions", 'chatSessions'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  const [visitors, visitorsLoading, visitorsError] = useDocument(
    firebase.getData("visitors", activeSession),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (chatSessions && chatSessions.data()) {
      console.log('chatSessions.data() :>> ', chatSessions.data());
      setSessionsList(sessionsListFilter(chatSessions));
      // setData(() => VisitorsFilter(visitors), []);
    }
    if (visitors && visitors.data()) {
      setVisitorsList(VisitorsFilter(visitors));
      setData(() => VisitorsFilter(visitors), []);
    }
    return () => {
      // Unregister hook
    };
  }, [visitorsLoading, chatSessionsLoading]);

  // Filter Sessions
  const sessionsListFilter = (chatSessions) => {
    if (!chatSessions || !chatSessions.data()) return [];
    const sessionsList = chatSessions.data();
    console.log("sessionsList", sessionsList);
    if(sessionsList.activesSession){
      localStorage.setItem('cwvActiveSession', sessionsList.activesSession)
    }
    if (typeof sessionsList.sessions === "object" && sessionsList.sessions !== null) {
      console.log('object :>> ', activeSession);
      console.log('object :>> ', sessionsList.sessions[activeSession]);
      if( typeof sessionsList.sessions[activeSession] === "object" && sessionsList.sessions[activeSession].hasOwnProperty('name')){
        console.log('object :>> ', sessionsList.sessions[activeSession].name);
      localStorage.setItem('cwvActiveSessionName', sessionsList.sessions[activeSession].name ?? activeSession)
      }
      return Object.keys(sessionsList.sessions).map((key) => sessionsList.sessions[key]);
    }
    return [];
  };
  // Filter Visitors
  const VisitorsFilter = (visitors) => {
    if (!visitors.data()) return [];
    const clients = visitors.data();
    console.log("clients", clients);
    if (typeof clients.visitors === "object" && clients.visitors !== null) {
      return Object.keys(clients.visitors).map((key) => clients.visitors[key]);
    }
    return [];
  };

  function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      // which has only the rows for the active page

      // The rest of these things are super handy, too ;)
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      state: { pageIndex, pageSize },
    } = useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination
    );

    // Render the UI for your table
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
        <div className="pagination">
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>{" "}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </button>{" "}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </button>{" "}
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>{" "}
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <span>
            | Go to page:{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }

  async function sendVisitorFatchRequest(e) {
    console.log("sendVisitorFatchRequest", e);
    const response = await fetch(
      "http://localhost/wordpress/wp-json/cwvchat/v1/tracking",
      {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "cwv_tracking", whatever: 123 }),
      }
    );

    try {
      const appData = await response.json();
      console.log("appData", appData);
      return appData;
    } catch (error) {
      console.log("warning: ", error);
    }
  }

  const onTrack = (data) => {
    console.log("data", data);
    onMenuChange("console");
    // console.log('dispatch', dispatch)
    // setClientId(uid);
    // dispatch(setClientID(uid))
  };
  // On User Click
  const onChatUserClick = (uid) => {};

  const columns = React.useMemo(
    () => [
      {
        Header: "Browser",
        columns: [
          {
            Header: "Name",
            accessor: (row) =>
              [
                row.name ?? "",
                " ",
                row.version && parseInt(row.version)
                  ? parseInt(row.version).toFixed(2)
                  : "",
              ].join(""),
          },
          {
            Header: "Platform",
            accessor: "os",
          },
        ],
      },
      {
        Header: "Location",
        columns: [
          {
            Header: "IP",
            accessor: "ip",
          },
          {
            Header: "City",
            accessor: "city",
          },
          {
            Header: "Country",
            accessor: "country",
          },
          {
            Header: "Updated At",
            id: "lastUpdated",
            Cell: ({ row }) => {
              return (
                <div>
                  <div to="#" onClick={(e) => onTrack(row.original)}>
                    {getTime(row.original.lastUpdated)}
                  </div>
                </div>
              );
            },
          },
        ],
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Send Offer",
            id: "offer",
            Cell: ({ row }) => {
              return (
                <div>
                  <div to="#" onClick={(e) => onTrack(row.original)}>
                    Send Offer
                  </div>
                </div>
              );
            },
          },
          {
            Header: "Live Track",
            id: "track",
            Cell: ({ row }) => {
              return (
                <div>
                  <div to="#" onClick={(e) => onTrack(row.original)}>
                    Live Track
                  </div>
                </div>
              );
            },
          },
        ],
      },
    ],
    []
  );

  //const data11 = React.useMemo(() => visitorsList, []);

  console.log("makeData(20)", makeData(20));
  console.log("visitorsList", visitorsList);

  return (
    <div className="cwv-chatWraper ">
      <div className="cwv-console cwv-settingsWraper">
        <div className="cwv-header">
          <div className="cwv-UMCHETitle">
            <span className="cwv-UMCHEIcon">
              <Globe size={30} />
            </span>
            <div className="cwv-UMCHEName">Visitors Track</div>
          </div>
          <div className="cwv-saveSettings">
            <Settings size={14} />
          </div>
        </div>
        <div className="cwv-tracking-body">
          <h4 className="cwv-settingName">Settings </h4>
          <hr className="cwv-hr" />

          <div className="cwv-tracking-action">
            <div className="cwv-tracking-selection">
            <label for="cwvSelectSession">Choose Session</label>
              <select id="cwvSelectSession" onChange={changeSession} value={activeSession}>
  <option value={activeSession}>{activeSessionName}</option>
                {(sessionsList && sessionsList.length ) && sessionsList.map((row, i ) => {return(<option key={'session-'+i} tag={i} value={row.trackingID}>{row.name}</option>)})}
               </select>
            </div>
            <div className="cwv-tracking-selection">
              <input
                type="text"
                placeholder="Tracking Name"
                onChange={(e) => setSessionName(e.target.value)}
              />
              <input
                type="number"
                placeholder="10"
                onChange={(e) => setSessionDuration(e.target.value)}
              />
              <button onClick={(e) => makeNewSession(e)}>
                Create New Session
              </button>
              <button onClick={(e) => sendVisitorFatchRequest(e)}>
                Track Now
              </button>
            </div>
          </div>
          <div className="cwv-table">
            {console.log("visitorsList", visitorsList)}
            <Table columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(memo(Tracking));
