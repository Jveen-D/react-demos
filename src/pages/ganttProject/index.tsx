import React from "react";
import useStyles from "./styles";
import Gantt from "./gantt";
type GanttProjectProps = {};

const GanttProject: React.FC<GanttProjectProps> = (props) => {
  const { styles } = useStyles();
  const ganttRef = React.useRef(null);

  React.useEffect(() => {
    let tasks = [
      {
        start: "2024-05-29",
        end: "2024-05-31",
        name: "Redesign website",
        id: "Task -1",
        progress: 30,
      },
      {
        start: "2024-04-01",
        end: "2024-04-01",
        name: "Redesign website",
        id: "Task 0",
        progress: 30,
      },
      {
        start: "2024-03-26",
        // Utilizes duration
        duration: "6d",
        name: "Write new content",
        id: "Task 1",
        progress: 5,
        important: true,
      },
      {
        start: "2024-04-04",
        end: "2024-04-08",
        name: "Apply new styles",
        id: "Task 2",
        progress: 80,
        dependencies: "Task 1",
      },
      {
        start: "2024-04-08",
        end: "2024-04-09",
        name: "Review",
        id: "Task 3",
        progress: 5,
        dependencies: "Task 2",
      },
      {
        start: "2024-04-08",
        end: "2024-04-10",
        name: "Deploy",
        id: "Task 4",
        progress: 0,
        // dependencies: 'Task 2'
      },
      {
        start: "2024-04-21",
        end: "2024-04-29",
        name: "Go Live!",
        id: "Task 5",
        progress: 0,
        dependencies: "Task 2",
        custom_class: "bar-milestone",
      },
      // {
      // 	start: '2014-01-05',
      // 	end: '2019-10-12',
      // 	name: 'Long term task',
      // 	id: "Task 6",
      // 	progress: 0
      // }
    ];
    tasks = [
      ...tasks,
      ...Array.from({ length: tasks.length * 3 }, (_, i) => ({
        ...tasks[i % 3],
        id: i,
      })),
    ];
    if (ganttRef.current) {
      new Gantt(ganttRef.current, tasks, {
        on_click: (task) => {
          console.log("Click", task);
        },
        view_mode: "Day",
        view_mode_padding: { DAY: "3d" },
        popup: false,
      });
    }
  }, [ganttRef.current]);

  return (
    <div className={styles.GanttProject}>
      <div ref={ganttRef}></div>;
    </div>
  );
};

export default GanttProject;
