import { useState } from "react";
import JuicyButton from "../juicybutton";
import { useProject } from "../providers/ProjectProvider";
import AverageAge from "../charts/average_age";
import React from "react";
import { GraphProps } from "../interfaces/route_props";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { JSX } from "react/jsx-runtime";
import Resolution from "../charts/resolution_time";
import Burndown from "../charts/burndown";
import BacklogStatus from "../charts/backlog_status";
import CloseToDueDateChart from "../charts/CloseToDueDateChart";
import OverviewGraph from "../charts/overview";
import { time_diff } from "../charts/common";

const Box = (props: GraphProps) => {
  return (
    <>
      <div className="bg-secondary flex flex-col gap-4 h-full">
        <p className="flex-1 self-center">{props.title}</p>
        <div className="flex-initial grow self-center w-full h-full">
          {props.children}
        </div>
      </div>
    </>
  );
};

const Graphs = () => {
  let today = new Date();

  const [graph, setGraph] = useState<React.ReactElement>(<div>{null}</div>);
  const [startDate, setStartDate] = useState<Date>(today);
  const [endDate, setEndDate] = useState<Date>(today);
  const [deadline, setDeadline] = useState<Date>(today);

  const onClick = (
    graph:
      | JSX.Element
      | ((
          prevState: React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
          >,
        ) => React.ReactElement<
          any,
          string | React.JSXElementConstructor<any>
        >),
  ) => {
    setGraph(graph);
  };

  const { activeProjects } = useProject();
  let projects = Object.values(activeProjects)
    .flat()
    .filter((project) => project.checked);

  let issues = projects.map((project) => project.issues).flat();

  return (
    <>
      <div className="bg-background flex-1 flex flex-col place-items-center justify-between gap-5">
        <div className="flex flex-row justify-around gap-20">
          <div className="flex flex-col">
            <p className="flex-1 self-center text-sm">Start Date</p>
            <DatePicker
              className="flex-initial"
              selected={startDate}
              onChange={(date) => (date ? setStartDate(date) : null)}
              maxDate={today}
            />
          </div>
          <div className="flex flex-col">
            <p className="flex-1 self-center text-sm">End Date</p>
            <DatePicker
              className="flex-initial"
              selected={endDate}
              onChange={(date) => (date ? setEndDate(date) : null)}
            />
          </div>
          <div className="flex flex-col">
            <p className="flex-1 self-center text-sm">Deadline</p>
            <DatePicker
              className="flex-initial"
              selected={deadline}
              onChange={(date) => (date ? setDeadline(date) : null)}
              minDate={today}
            />
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3">
          <JuicyButton
            className="bg-text"
            onClick={() => {
              onClick(
                <Box title="Average Age">
                  <AverageAge issues={issues} />
                </Box>,
              );
            }}
          >
            Average Age
          </JuicyButton>
          <JuicyButton
            className="bg-text"
            onClick={() => {
              onClick(
                <Box title="Average Completion Time">
                  <Resolution
                    issues={issues}
                    startDate={startDate}
                    endDate={today}
                  />
                </Box>,
              );
            }}
          >
            Average Completion Time
          </JuicyButton>
          <JuicyButton
            className="bg-text"
            onClick={() => {
              onClick(
                <Box title="Burndown">
                  <Burndown
                    numIssues={issues.length}
                    startDate={startDate}
                    endDate={endDate}
                    issues={issues}
                  />
                </Box>,
              );
            }}
          >
            Burndown
          </JuicyButton>
          <JuicyButton
            className="bg-text"
            onClick={() => {
              onClick(
                <Box title="Backlog Status">
                  <BacklogStatus issues={issues} startDate={startDate} />
                </Box>,
              );
            }}
          >
            Backlog Status
          </JuicyButton>
          <JuicyButton
            className="bg-text"
            onClick={() => {
              onClick(
                <Box title="Overview">
                  <OverviewGraph issues={issues} />
                </Box>,
              );
            }}
          >
            Overview
          </JuicyButton>
          <JuicyButton
            className="bg-text"
            onClick={() => {
              onClick(
                <Box title="Issues Close To Due Date">
                  <CloseToDueDateChart
                    issues={issues}
                    daysThreshold={time_diff(today, deadline)}
                  />
                </Box>,
              );
            }}
          >
            Issues Close To Due Date
          </JuicyButton>
        </div>
        <div className="bg-black w-3/4 h-full">{graph}</div>
      </div>
    </>
  );
};

export default Graphs;
