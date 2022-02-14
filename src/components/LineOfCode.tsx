
import React from "react";
import "../css/LineOfCode.css"
//displays a line of code
//only prop passed in is "codeString, and key"
export function LineOfCode(props){
    return (<div className="bg-light border codeLineHolder" {...props.newProps } >{props.code}</div>);
}


