import React from "react";
import { Editor, EditorState, ContentState, convertToRaw, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "draft-js/dist/Draft.css";
import Button from "../Button";
import "./style.css";

const { hasCommandModifier } = KeyBindingUtil;

function DraftEditor({ className, placeholder, onSubmitHandler, styles, button }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const focus = () => {
    setEditorState(() => EditorState.moveFocusToEnd(editorState));
  };

  const cwvKeyBindingFn = (e) => {
    if (hasCommandModifier(e) && e.keyCode === 13) {
      return getDefaultKeyBinding(e)
    }

    if (e.keyCode === 13) {
      return onSaveHandler()
    }

    return getDefaultKeyBinding(e);
  }

  const clearOnSubmit = () => {
    setEditorState(() =>
      EditorState.push(
        editorState,
        ContentState.createFromText(""),
        "remove-range"
      )
    );
  };

  const onSaveHandler = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const message = draftToHtml(rawContentState);
    const rowMessage = message.replace(/(<p[^>]+?>|<p>|<\/p>)/img, "");
    clearOnSubmit();
    if (rowMessage !== "") { onSubmitHandler(rowMessage); }
  };
 
  return (
    <div className={"wpcwv-messageContainer " + (className ?? '')} style={styles.root ?? ''} >
      <div style={styles.editor ?? ''} onClick={focus}>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          keyBindingFn={cwvKeyBindingFn}
          placeholder={placeholder ?? ""}
        />
      </div>
      {button.load &&
        <div className={"wpcwv-RichEditorSubmit " + (button.containerClass ?? '')} style={button.style ?? ''}>
          <div className="cwv-send" title="Save">
            <Button title={button.title ?? ''} className={button.className ?? ''} textFast={true} icon={button.icon ?? ''} onClick={onSaveHandler} />
          </div>
        </div>
      }
    </div>
  );
}

export default DraftEditor;
