import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
// import GCodeMode from './GCodeMode';
import "ace-builds/src-noconflict/mode-gcode.js"
// import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-chaos";
import 'ace-builds/src-noconflict/mode-gcode';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/ext-language_tools';
import "ace-builds/src-noconflict/mode-custom";
import "ace-builds/src-noconflict/theme-monokai";

function onChange(newValue) {
  console.log(newValue);
}



function Editor(){
  
  return (
    <AceEditor
    mode="gcode"
    theme="monokai"
    onChange={onChange}
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true, $highlightPending: true }}
  />
  )
}

export default Editor