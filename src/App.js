import React from "react";
import "./styles.css";
import "./Editor.js";
import { Editor } from "./Editor.js";

export default function App() {
  return (
    <div className="App">
      <h1>2B++ editor</h1>
      <Editor />
    </div>
  );
}
