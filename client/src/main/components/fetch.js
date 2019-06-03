import { useState, useEffect } from "react";

export function useData(props) {
  const [loading, setLoading] = useState(true);
  const [object, setObject] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData(props)
      .then(object => {
        setObject(object);
        setLoading(false);
      })
      .catch(e => {
        setError(e);
        setLoading(false);
      });
  }, [props.load]);

  return {
    loading,
    object,
    error: null
  };
}

function getData(props) {
  const URL =
    "https://sheets.googleapis.com/v4/spreadsheets/1JTKUDwlY5NfHhKxMLDh5pMiAmZPXybjTqDvMvZZQvoQ/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=AIzaSyBS3eu0OnvXESI1lFH5Hx4gjv_2-nguCqI";

  return fetch(URL)
    .then(res => res.json())
    .then(data => {
      let batchRowValues = data.valueRanges[0].values;
      const rows = [];
      for (let i = 1; i < batchRowValues.length; i++) {
        let rowObject = {};
        for (let j = 0; j < batchRowValues[i].length; j++) {
          rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
        }
        rows.push(rowObject);
      }
      rows.sort((a, b) => a.x - b.x);
      return rows;
    });
}
