import React, { useEffect, useState } from "react";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG7P1tkuzB5lwh3ea0M7k3XQlcHLMSvOKNIODmWBQ_0s3xzzEWSnnpND467kse-EUSXkuS3JvFKZXQ/pub?output=csv";
// const SHEET_URL_HOJA_2 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSG7P1tkuzB5lwh3ea0M7k3XQlcHLMSvOKNIODmWBQ_0s3xzzEWSnnpND467kse-EUSXkuS3JvFKZXQ/pub?gid=94325495&output=csv";

const fetchSheetData = async (url) => {
  const response = await fetch(url);
  const csvText = await response.text();
  let rows = [];
  csvText.split("\n").forEach((row, index) => {
    const rowsSplit = row.split(",")
    if (index !== 0) {
      rows.push({
        category: rowsSplit[0],
        gid: rowsSplit[1]
      })
    }
  });
  return rows;
};

function App() {
  const [main, setMain] = useState([])
  useEffect(() => {
    fetchSheetData(SHEET_URL).then((data) => {
      console.log(data);
      setMain(data)
    }
    );
  }, []);

  return (
    <div>
      <h1>Gerencia Administrativa</h1>
      {main.map((item) => (
          <div key={item.gid}>
            <button>{item.category}</button>
          </div>
        ))
      }
    </div>
  );
}

export default App;
