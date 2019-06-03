import React, { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useData } from "./fetch";

//https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export function Graph(props) {
  const [load, setLoad] = useState(false);
  /*retrieve data */
  const { loading, object, error } = useData({
    load: load
  });

  useInterval(() => {
    setLoad(!load);
  }, 1000);

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <Line
      data={{
        datasets: [
          {
            fill: false,
            backgroundColor: "rgba(219,68,55, 1)",
            borderColor: "rgba(219,68,55, 1)",
            //cubicInterpolationMode: "monotone",
            lineTension: 0,
            pointRadius: 0,
            pointHoverRadius: 0,
            data: object.map(item => ({
              x: new Date(item.timestamp),
              y: item.data
            }))
          }
        ]
      }}
      options={{
        legend: {
          display: false
        },
        tooltips: false,
        scales: {
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                suggestedMax: 40
              }
            }
          ],
          xAxes: [
            {
              type: "time",
              time: {
                min: props.minimumDate,
                max: new Date(),
                unit: props.type
              }
            }
          ]
        }
      }}
    />
  );
}
