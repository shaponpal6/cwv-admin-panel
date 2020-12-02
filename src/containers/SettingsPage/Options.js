import React from "react";
import Button from "../../components/Button";

function Options() {
  const saveSettings = (e) => {
    console.log("object", e);
  };

  return (
    <div className="cwv-optionContainer">
      <div className="cwv-optionWraper">
        <section className="cwv-optionsPage">
          <ul className="cwv-optionItems">
            <h2 className="cwv-optionName">Option 1</h2>
            <li className="cwv-option">
              <div className="cwv-optionLabel">
                <h4 className="cwv-optionLabelName">Switch input</h4>
                <p className="cwv-optionLabelDesc">Odio ac imperdiet luctus</p>
              </div>

              <div className="cwv-optionAction">
                <input
                  className="cwv-optionCheckbox"
                  type="checkbox"
                  data-indeterminate="false"
                  value=""
                />
              </div>
            </li>
            <hr className="cwv-hr" />
            <li className="cwv-option">
              <div className="cwv-optionLabel">
                <h4 className="cwv-optionLabelName">Switch input</h4>
                <p className="cwv-optionLabelDesc">Odio ac imperdiet luctus</p>
              </div>

              <div className="cwv-optionAction">
                <input
                  className="cwv-optionCheckbox"
                  type="checkbox"
                  data-indeterminate="false"
                  value=""
                />
              </div>
            </li>
            <hr className="cwv-hr" />
            <li className="cwv-option">
              <div className="cwv-optionLabel">
                <h4 className="cwv-optionLabelName">Switch input</h4>
                <p className="cwv-optionLabelDesc">Odio ac imperdiet luctus</p>
              </div>

              <div className="cwv-optionAction">
                <input
                  className="cwv-optionCheckbox"
                  type="checkbox"
                  data-indeterminate="false"
                  value=""
                />
              </div>
            </li>
            <hr className="cwv-hr" />
            <li className="cwv-option">
              <div className="cwv-optionLabel">
                <h4 className="cwv-optionLabelName">Switch input</h4>
                <p className="cwv-optionLabelDesc">Odio ac imperdiet luctus</p>
              </div>

              <div className="cwv-optionAction">
                <input
                  className="cwv-optionCheckbox"
                  type="checkbox"
                  data-indeterminate="false"
                  value=""
                />
              </div>
            </li>
            <hr className="cwv-hr" />
            <li className="cwv-option">
              <div className="cwv-optionLabel">
                <h4 className="cwv-optionLabelName">Switch input</h4>
                <p className="cwv-optionLabelDesc">Odio ac imperdiet luctus</p>
              </div>

              <div className="cwv-optionAction">
                <input
                  className="cwv-optionCheckbox"
                  type="checkbox"
                  data-indeterminate="false"
                  value=""
                />
              </div>
            </li>
            <hr className="cwv-hr" />
            <li className="cwv-option">
              <div className="cwv-optionLabel">
                <h4 className="cwv-optionLabelName">Switch input</h4>
                <p className="cwv-optionLabelDesc">Odio ac imperdiet luctus</p>
              </div>

              <div className="cwv-optionAction">
                <input
                  className="cwv-optionCheckbox"
                  type="checkbox"
                  data-indeterminate="false"
                  value=""
                />
              </div>
            </li>
            <hr className="cwv-hr" />
          </ul>
        </section>
            <section className="cwv-saveSettings">
              <Button
                className="cwv-saveSettingBTN"
                icon="lock"
                title="SAVE"
                onClick={() => saveSettings("settings")}
              />
            </section>
      </div>
    </div>
  );
}

export default Options;
