import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/joy";

import TaskList from "@components/TaskList";
import { fetchTasks } from "@features/tasksSlice";

const Dashboard = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks(token));
  }, [dispatch, token]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <TaskList tasks={tasks} />
    </Box>
  );
};

export default Dashboard;
