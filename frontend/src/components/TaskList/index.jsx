import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import IconButton from "@mui/joy/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import { Select, Option } from "@mui/joy";
import { isEmpty, upperCase } from "lodash";

import { deleteTask, fetchTasks, updateTask } from "@features/tasksSlice";
import { taskStatus } from "@utils/constants";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const { token } = useSelector((state) => state.auth);

  const [editMode, setEditMode] = useState({});
  const [editValues, setEditValues] = useState({
    title: "",
    owner: "",
    status: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDeleteTask = async (id) => {
    await dispatch(deleteTask({ id, token }));
    await dispatch(fetchTasks(token));
  };

  const handleEditClick = (id, title, assignee, status) => {
    setEditMode((prev) => ({ ...prev, [id]: true }));
    setEditValues((prev) => ({
      ...prev,
      [id]: { title, assignee, status }, // Include status here
    }));
  };

  const handleSaveClick = async (id) => {
    const updatedTask = editValues[id];

    await dispatch(
      updateTask({
        id,
        payload: {
          title: updatedTask.title,
          status: updatedTask.status,
        },
        token,
      })
    );
    setEditMode((prev) => ({ ...prev, [id]: false }));
    await dispatch(fetchTasks(token));
  };

  const handleInputChange = (id, field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSelectChange = (id, newValue) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], status: newValue }, // Update the status of the specific task
    }));
  };

  if (loading) return <Typography>Loading tasks...</Typography>;
  if (error) return <Typography color="danger">Error: {error}</Typography>;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        m: "auto",
        mt: "3rem",
        alignItems: "center",
      }}
    >
      <Typography
        level="h1"
        sx={{ fontSize: "2rem", fontWeight: "bold", color: "#20398A" }}
      >
        Tasks
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mt: "1rem",
        }}
      >
        {isEmpty(tasks) ? (
          <Typography>No tasks available!</Typography>
        ) : (
          <List>
            {Object.values(tasks).map((task) => (
              <ListItem
                key={task.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  {editMode[task.id] ? (
                    <>
                      <Input
                        size="sm"
                        value={editValues[task.id]?.title || ""}
                        onChange={(e) =>
                          handleInputChange(task.id, "title", e.target.value)
                        }
                        sx={{ mb: 1 }}
                      />
                    </>
                  ) : (
                    <>
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          color: "#20398A",
                          textDecoration:
                            task.status === taskStatus.completed
                              ? "line-through"
                              : "none",
                        }}
                      >
                        {task.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          textDecoration: task.completed
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {task.assignee}
                      </Typography>
                    </>
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {editMode[task.id] ? (
                    <Select
                      value={editValues[task.id]?.status || ""}
                      onChange={(e, newValue) =>
                        handleSelectChange(task.id, newValue)
                      }
                    >
                      {Object.values(taskStatus).map((status, id) => (
                        <Option key={id} value={status}>
                          <Typography> {status}</Typography>
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Typography>{upperCase(task.status)}</Typography>
                  )}
                  {editMode[task.id] ? (
                    <IconButton
                      size="sm"
                      variant="outlined"
                      onClick={() => handleSaveClick(task.id)}
                    >
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="sm"
                      variant="outlined"
                      onClick={() =>
                        handleEditClick(
                          task.id,
                          task.title,
                          task.assignee,
                          task.status
                        )
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default TaskList;
