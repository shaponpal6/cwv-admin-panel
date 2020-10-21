import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
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
    root: {
      fontFamily: "'Helvetica', sans-serif",
      padding: 20,
      width: 600,
    },
    editor: {
      border: "1px solid #ccc",
      cursor: "text",
      minHeight: 80,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: "center",
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
      <div className="wpcwv-RichEditorSubmit">
        <Button
          type="button"
          shape="round"
          onClick={() => onMessageSaveHandler()}
          icon={<DownloadOutlined />}
          size={"middle"}
        >
          SEND
        </Button>
      </div>
    </div>
  );
}

export default DraftMessageEditor;
