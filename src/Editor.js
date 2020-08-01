import React, { useState } from "react";
import "./styles.css";

//TODO if, else, goto
export const Editor = () => {
  const hello = `bom bom ba dom tsippi dum
bum bum ba bom bom bou bum
dom dom ba bom bom tsuppi bum bum
duuba duuba dom dom
duuba duuba dom dom dou dum
bum bum ba dom dom bou dom bou dom
duuba duuba bum bum
duuba duuba bum bum
dum dum ba bum bum bou dum
duuba duuba dum dum
duuba duuba bom bom tsuppi dom tsuppi dom
duuba duuba dum dum bou bom bom
duuba duuba dum dum
duuba duuba dum dum bou dom bou bum
duuba duuba bum bum
duuba duuba dom dom dou dum bou bum`;

  const [code, setCode] = useState(hello);
  const [finalOutput, setFinalOutput] = useState("");
  let output = "";
  let a = 0;
  let b = 0;
  let c = 0;
  let d = 0;

  const handleChange = event => {
    //console.log(event.target.value);
    setCode(event.target.value);
  };

  const runCode = line => {
    console.log(line);
    if (line.length === 1) {
      switch (line[0][0]) {
        case "a":
          return a;
        case "b":
          return b;
        case "c":
          return c;
        case "d":
          return d;
        default:
          return line[0][0];
      }
    } else if (line[0][0] === "print_ascii" && line[0][1] === 0) {
      console.log(runCode(line.slice(1)));
      output = output + String.fromCharCode(runCode(line.slice(1)));
      return 0;
    } else if (line[0][0] === "print" && line[0][1] === 0) {
      console.log(runCode(line.slice(1)));
      output = output + runCode(line.slice(1));
      return 0;
    } else if (line[0][0] === "a" && line[1][0] === "=" && line[0][1] === 0) {
      console.log("setA");
      a = runCode(line.slice(2));
      return 0;
    } else if (line[0][0] === "b" && line[1][0] === "=" && line[0][1] === 0) {
      console.log("setB");
      b = runCode(line.slice(2));
      return 0;
    } else if (line[0][0] === "c" && line[1][0] === "=" && line[0][1] === 0) {
      console.log("setC");
      c = runCode(line.slice(2));
      return 0;
    } else if (line[0][0] === "d" && line[1][0] === "=" && line[0][1] === 0) {
      console.log("setD");
      d = runCode(line.slice(2));
      return 0;
    } else {
      if (line.length % 2 === 0) {
        console.log("error");
        return "invalid";
      } else {
        switch (line[1][0]) {
          case "+":
            return runCode(line.slice(0, 1)) + runCode(line.slice(2));
          case "-":
            return runCode(line.slice(0, 1)) - runCode(line.slice(2));
          case "*": {
            console.log(runCode(line.slice(0, 1)) * runCode(line.slice(2)));
            return runCode(line.slice(0, 1)) * runCode(line.slice(2));
          }
          case "^":
            return runCode(line.slice(0, 1)) ** runCode(line.slice(2));
          default:
            return "invalid";
        }
      }
    }
  };

  const handlePress = () => {
    a = 0;
    b = 0;
    c = 0;
    d = 0;
    output = "";
    let arr = code.split("\n");
    arr = arr.map(e => e.split(" "));
    arr.forEach(e => {
      const len = e.length;
      let i = 0;
      let e_new = [];
      while (i < len) {
        if (e[i] === e[i + 1]) {
          e_new.push(e[i] + e[i + 1]);
          i += 1;
        } else {
          e_new.push(e[i]);
        }
        i += 1;
      }
      e_new = e_new.map(e => {
        switch (e) {
          case "bombom":
            return "a";
          case "bumbum":
            return "b";
          case "domdom":
            return "c";
          case "dumdum":
            return "d";
          case "bom":
            return 0;
          case "bum":
            return 1;
          case "dom":
            return 2;
          case "dum":
            return 3;
          case "ba":
            return "=";
          case "bou":
            return "+";
          case "dou":
            return "-";
          case "tsuppi":
            return "*";
          case "tsippi":
            return "^";
          case "duuba":
            return "print";
          case "duubaduuba":
            return "print_ascii";
          default:
            return "invalid";
        }
      });
      e_new = e_new.map((e, i) => [e, i]);
      //console.log(e_new);
      runCode(e_new);
    });
    setFinalOutput(output);
  };

  return (
    <div>
      <textarea className="CodeInput" value={code} onChange={handleChange} />
      <br />
      <button onClick={handlePress}>Interpret</button>
      <br />
      <textarea className="CodeOutput" value={finalOutput} readOnly />
    </div>
  );
};
