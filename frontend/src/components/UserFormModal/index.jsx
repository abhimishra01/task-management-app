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

import { fetchUsers } from "@features/usersSlice";
import { userRole } from "@utils/constants";
import { registerThunk } from "@features/authSlice";

const UserFormModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user",
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
    await dispatch(registerThunk({ payload: formData, token }));
    setOpen(false);
    dispatch(fetchUsers(token));
  };

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [token, dispatch]);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="solid"
        sx={{ backgroundColor: "#21388A" }}
      >
        New User
        <AddIcon />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <Typography level="h4" component="h2" sx={{ color: "#fafafa" }}>
            Create New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Input
                placeholder="UserName"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                required
                sx={{ flexGrow: 1 }}
              />
              <Select
                required
                placeholder="Status"
                name="status"
                value={formData.role}
                onChange={(e, newValue) => handleSelectChange("role", newValue)}
              >
                {Object.values(userRole).map((status, id) => (
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

export default UserFormModal;
