import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Graph } from "./components/graph";

const styles = {
  card: {
    width: "75%",
    position: "absolute",
    left: "12.5%",
    top: "25%"
  }
};

function SimpleCard(props) {
  /*init props*/
  const { classes } = props;

  /*Organise type of x axes and minimum date */
  let currentDate = new Date();

  const [minimum, setMinimum] = useState({
    type: "day",
    date: currentDate.getDate() - 7,
    hour: 0,
    min: 0
  });

  let minimumDate = new Date();
  minimumDate.setDate(minimum.date);
  minimumDate.setHours(minimum.hour, minimum.min, 0);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Graph minimumDate={minimumDate} type={minimum.type} />
      </CardContent>
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          onClick={e =>
            setMinimum({
              type: "minute",
              date: currentDate.getDate(),
              hour: currentDate.getHours(),
              min: currentDate.getMinutes() - 15
            })
          }
          id="hour"
          size="small"
        >
          QUARTER
        </Button>
        <Button
          onClick={e =>
            setMinimum({
              type: "minute",
              date: currentDate.getDate(),
              hour: currentDate.getHours() - 1,
              min: currentDate.getMinutes()
            })
          }
          id="hour"
          size="small"
        >
          HOUR
        </Button>
        <Button
          onClick={e =>
            setMinimum({
              type: "hour",
              date: currentDate.getDate(),
              hour: 0,
              min: 0
            })
          }
          id="day"
          size="small"
        >
          DAY
        </Button>
        <Button
          onClick={e =>
            setMinimum({
              type: "day",
              date: currentDate.getDate() - 7,
              hour: 0,
              min: 0
            })
          }
          id="week"
          size="small"
        >
          WEEK
        </Button>
        <Button
          onClick={e =>
            setMinimum({
              type: "day",
              date: currentDate.getDate() - (currentDate.getDate() - 1),
              hour: 0,
              min: 0
            })
          }
          id="month"
          size="small"
        >
          MONTH
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
