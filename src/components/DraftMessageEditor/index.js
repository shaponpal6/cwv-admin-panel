import React from "react";
import { Editor, EditorState, ContentState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "draft-js/dist/Draft.css";
import "./style.css";

function DraftMessageEditor({ onMessageSave }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  // const setDomEditorRef = () =>{};

  const focus = () => {
    setEditorState(() => EditorState.moveFocusToEnd(editorState));
  };

  const clearOnSubmit = () => {
    setEditorState(() =>
      EditorState.push(
        editorState,
        ContentState.createFromText(""),
        "remove-range"
      )
    );
  };

  const onMessageSaveHandler = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const message = draftToHtml(rawContentState);
    const rowMessage = message.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
    console.log(rowMessage);
    clearOnSubmit();
    if (rowMessage !== "") onMessageSave(rowMessage);
  };

  const styles = {
    editor: {
      cursor: "text",
      padding: 10,
      minHeight: 55,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    button: {
      minHeight: 55,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
    },
  };

  return (
    <div className="wpcwv-messageContainer">
      <div style={styles.editor} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Enter Your Replay..."
        />
      </div>
      <div className="wpcwv-RichEditorSubmit" style={styles.button}>
        {/* <button>Send</button> */}
        <div className="cwv-send" title="Send">
          <button className="cwv-buttonRoot cwv-button" type="button" mini="true" aria-label="send"
            disabled="" onClick={() => onMessageSaveHandler()}>
            <span className="cwv-buttonLabel">
              <svg className="cwv-SvgIconRoot" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default DraftMessageEditor;
