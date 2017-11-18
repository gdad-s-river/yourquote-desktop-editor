import React, { Component } from "react";
import g from "glamorous";

import AwesomeEditor from "./components/AwesomeEditor";
import Logo from "./components/Logo";
import ColorPicker from "./components/ColorPicker";
import ColorPickerSwitch from "./components/ColorPickerSwitch";
import FontSizeChanger from "./components/FontSizeChanger";
import { setLSItem } from "./utils/localStorage";

import "./overrides.css";

class PoetryEditor extends Component {
  state = {
    hasFocus: false,
    currentColor: "#000",
    addColor: null,
    addFontSize: null,
    colorSwitch: "fontColor",
    editorBgColor: "#fff",
    currentFontSize: 16
  };

  toggleFocus = newFocusVal => {
    this.setState((prevState, props) => {
      if (prevState.hasFocus !== newFocusVal) {
        return { hasFocus: newFocusVal };
      } else {
        return;
      }
    });
  };

  /* setAddColor (from colorPicker to change text color)*/
  setAddColor = addColorFn => {
    this.setState({
      addColor: addColorFn
    });
  };

  /* from editor inlinestyle color to keep in sync with colorpicker*/
  setCurrentColor = color => {
    this.setState({
      currentColor: color
    });
  };

  handleCurrentColorChange = (color, event) => {
    this.setState({ currentColor: color.hex });
    if (this.state.addColor) {
      this.state.addColor(color.hex);
    }
  };

  handleEditorBgChange = (color, event) => {
    this.setState({ currentColor: color.hex });
    setLSItem("editorBgColor", color.hex);
  };

  switchColorPicker = val => {
    this.setState({
      colorSwitch: val
    });
  };

  handleCurrentFontSizeChange(fontSize) {
    this.setState({ currentFontSize: fontSize });
    if (this.state.addFontSize) {
      this.state.addFontSize(fontSize);
    }
  }

  setAddFontSize = addFontSizeFn => {
    this.setState({ addFontSize: addFontSizeFn });
  };

  setCurrentFontSize = fontSize => {
    this.setState({
      currentFontSize: fontSize
    });
  };

  render() {
    const { hasFocus, colorSwitch } = this.state;
    switch (colorSwitch) {
      case "fontColor":
        this.handleColorChange = this.handleCurrentColorChange;
        break;
      case "imgBg":
        this.handleColorChange = this.handleEditorBgChange;
        break;
      default:
        this.handleColorChange = this.handleCurrentColorChange;
        break;
    }

    return (
      <TopWrapper>
        <SideKicks hasFocus={hasFocus}>
          <div>One dum </div>
          <div>Two Dum</div>
        </SideKicks>
        <SuperHero>
          <CenterKick hasFocus={hasFocus}>
            <Logo />
          </CenterKick>
          <AwesomeEditor
            toggleFocus={this.toggleFocus}
            hasFocus={hasFocus}
            currentColor={this.state.currentColor}
            setAddColor={this.setAddColor}
            setAddFontSize={this.setAddFontSize}
            setCurrentColor={this.setCurrentColor}
            editorBgColor={this.state.editorBgColor}
            colorSwitch={this.state.colorSwitch}
            switchColorPicker={this.switchColorPicker}
            setCurrentFontSize={this.setCurrentFontSize}
          />
          <CenterKick hasFocus={hasFocus} />
        </SuperHero>
        <SideKicks hasFocus={hasFocus}>
          <SideKickRightWrapper>
            <FontSizeChanger
              currentFontSize={this.state.currentFontSize}
              handleCurrentFontSizeChange={this.handleCurrentFontSizeChange}
              addFontSize={this.state.addFontSize}
              setCurrentFontSize={this.setCurrentFontSize}
              hasFocus={this.state.hasFocus}
            />
          </SideKickRightWrapper>
          <SideKickRightWrapper>
            <ColorPicker
              color={this.state.currentColor}
              handleColorChange={this.handleColorChange}
            />
          </SideKickRightWrapper>

          <SideKickRightWrapper>
            <ColorPickerSwitch
              colorSwitch={colorSwitch}
              switchColorPicker={this.switchColorPicker}
              setCurrentColor={this.setCurrentColor}
            />
          </SideKickRightWrapper>
        </SideKicks>
      </TopWrapper>
    );
  }
}

export default PoetryEditor;

/* Styles */

const FOCUSSED_BACKGROUND = "#5d5e5f";

const tWrapNSideKicksCommonStyles = {
  flex: 1
};

const TopWrapper = g.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  ...tWrapNSideKicksCommonStyles
});

TopWrapper.displayName = "TopWrapper";

const SuperHero = g.section({
  height: "100%",
  display: "flex",
  flexDirection: "column"
});

SuperHero.displayName = "SuperHero";

const kicksCommonStyles = {
  transition: "background 0.4s"
};

const sideKicksStyle = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  ...tWrapNSideKicksCommonStyles,
  ...kicksCommonStyles
};

const CenterKick = g.div(
  {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...kicksCommonStyles
  },
  ({ hasFocus }) => ({
    background: hasFocus ? FOCUSSED_BACKGROUND : "#A7B8C9"
  })
);

CenterKick.display = "CenterKick";

const SideKicks = g.section(sideKicksStyle, ({ hasFocus }) => ({
  background: hasFocus ? FOCUSSED_BACKGROUND : "#d4d4d4"
}));

SideKicks.displayName = "SideKick";

const SideKickRightWrapper = g.div({
  padding: "10px 0"
});
