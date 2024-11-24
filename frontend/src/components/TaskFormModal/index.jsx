import { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Box from "@mui/joy/Box";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { upperCase } from "lodash";

import { createTask, fetchTasks } from "@features/tasksSlice";
import { fetchUsers } from "@features/usersSlice";
import { taskStatus } from "@utils/constants";

const TaskFormModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    title: "",
    owner: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTask({ payload: formData, token }));
    setOpen(false);
    await dispatch(fetchTasks(token));
  };

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [token, dispatch]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="solid"
        sx={{ backgroundColor: "#AF2188" }}
      >
        New Task
        <AddIcon />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <Typography level="h4" component="h2" sx={{ color: "#20398A" }}>
            Create New Task
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Input
                placeholder="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <Select
                required
                placeholder="Assignnee"
                name="owner"
                value={formData.owner}
                onChange={(e, newValue) =>
                  handleSelectChange("owner", newValue)
                }
              >
                {users.map((user) => (
                  <Option key={user.id} value={user.username}>
                    <Typography> {user.username}</Typography>
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Status"
                name="status"
                defaultValue={taskStatus.PENDING}
                value={formData.status}
                onChange={(e, newValue) =>
                  handleSelectChange("status", newValue)
                }
              >
                {Object.values(taskStatus).map((status, id) => (
                  <Option key={id} value={status}>
                    <Typography>{upperCase(status)}</Typography>
                  </Option>
                ))}
              </Select>
              <Button
                sx={{ backgroundColor: "#AF2188" }}
                type="submit"
                variant="solid"
                color="success"
              >
                Submit
              </Button>
            </Box>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default TaskFormModal;
