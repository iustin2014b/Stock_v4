import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import InputSymbol from "./Components/InputSymbol";
import ChartLine from "./Components/ChartLine";
import DropdownTime from "./Components/DropdownTime";
import helperAPI_URL from "./helper/helperAPI";
import helperValues from "./helper/helperValues";
import helperDates from "./helper/helperDates";

function App() {
  const [dataAPI, setDataAPI] = useState(null);
  const [companySymbol, setCompanySymbol] = useState("");
  const [intervalTime, setIntervalTime] = React.useState("hour");
  const [msg, setMsg] = useState("Enter a company symbol");
  //Use effect to triger fetch- function
  useEffect(() => {fetchStockDates();}, [companySymbol + intervalTime]);
  //Fetch function
  const fetchStockDates = async () => {
    const data = [];
    if (companySymbol.length > 1)
      try {
        const response = await fetch(helperAPI_URL(intervalTime, companySymbol));
        if (response.ok) {
          setDataAPI(await response.json())  
          setMsg("Stock chart of " + companySymbol );
        } else setMsg("Error response from site");
      } catch (error) {
        setMsg("Error fetch data");
        throw Error(error);
      }
  };
  //Button click handler
  function handleButtonClick() {
    setCompanySymbol(document.getElementById("inputBox").value);
    setIntervalTime(document.getElementById("dropboxTime").value);
    document.getElementById("inputBox").value = "";
  }
  //Text input change handler
  function handleChangeInput(e) {
    setCompanySymbol("");
    setMsg("Enter a company symbol");
  }
  //return from App
  return (
    <div>
      <DropdownTime />
      <InputSymbol
        onChange={handleChangeInput}
        onClick={handleButtonClick}
        companySymbol={companySymbol}
      />
      <p>${msg}</p>
      {companySymbol.length != 0 && dataAPI != null && <ChartLine
        dates={helperDates(dataAPI)}
        values={helperValues(dataAPI)}
        inputName={companySymbol}
      />}
    </div>
  );
}
export default App;