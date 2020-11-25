import React from 'react'

export default function SelectColor({color, changeColor}) {
    return (
        <>
        <span></span>
            <select
                    style={{ backgroundColor: color }}
                    value={color}
                    onChange={(event)=>{changeColor(event.target.value)}}
                >
                    <option
                        value="#fff"
                        style={{ backgroundColor: "#fff", padding: "3px 0" }}
                    >
                    </option>
                    <option
                        value="#f3ae56"
                        style={{ backgroundColor: "#f3ae56" }}
                    ></option>
                    <option
                        value="#8ae6fd"
                        style={{ backgroundColor: "#8ae6fd" }}
                    ></option>
                    <option
                        value="#45d071"
                        style={{ backgroundColor: "#45d071" }}
                    ></option>
                    <option
                        value="#eae426"
                        style={{ backgroundColor: "#eae426" }}
                    ></option>
                </select>
        </>
    )
}
