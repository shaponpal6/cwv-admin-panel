import React from "react";
import { connect } from "react-redux";
import { addMessage } from "../../redux/actions";


import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import "../DraftEditor/node_modules/draft-js/dist/Draft.css";

import "./RichEditor.css";

class RichEditorExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({ editorState });

    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.handleSumit = this.handleSumit.bind(this);
  }

  _handleKeyCommand(command, editorState) {
    console.log("_handleKeyCommand", command, this.state);
    // convert editorState to plain HTML
    const contentRaw = convertToRaw(editorState.getCurrentContent());
    //  const contentHTML = draftToHtml(contentRaw);
    console.log(
      "_handleKeyCommand22",
      JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    );
    console.log("_handleKeyCommand22,,,,,", contentRaw);

    const rawContentState = convertToRaw(editorState.getCurrentContent());

    const markup = draftToHtml(rawContentState);
    console.log("draftToHtml", markup);
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }


  handleReturn = () => {
    this.setState({
      editorState: EditorState.createEmpty()
    });
  }

  clearOnSubmit = () => {
    const editorState = EditorState.push(
      this.state.editorState,
      ContentState.createFromText(""),
      'remove-range'
    );
    this.setState({ editorState });
    const rawContentState2 = convertToRaw(
      this.state.editorState.getCurrentContent()
    );
    console.log("Empty state", draftToHtml(rawContentState2));
  }


  handleSumit(event) {
    const rawContentState = convertToRaw(
      this.state.editorState.getCurrentContent()
    );

    const markup = draftToHtml(rawContentState);
    this.clearOnSubmit()
    console.log("event", event);
    console.log("draftToHtml", markup);

    this.props.addMessage(markup);
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  render() {
    const { editorState } = this.state;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    return (
      <div className="wpcwv-RichEditorBlock">
        <div className="RichEditor-root">
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={className} onClick={this.focus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={editorState}
              handleKeyCommand={this.handleKeyCommand}
              keyBindingFn={this.mapKeyToEditorCommand}
              onChange={this.onChange}
              handleReturn={this.onReturn}
              placeholder="Write Your Message..."
              ref="editor"
              spellCheck={true}
            />
            <div className="wpcwv-RichEditorSubmit">
              <button
                type="button"
                shape="round"
                onClick={(event) => this.handleSumit(event)}
                size={"middle"}
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = "RichEditor-styleButton";
    if (this.props.active) {
      className += " RichEditor-activeButton";
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return { chatRoute: state.menus.chatRoute };
};
// export default VisibilityFilters;
export default connect(mapStateToProps, { addMessage })(RichEditorExample);
