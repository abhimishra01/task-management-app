import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import { isEmpty } from "lodash";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/joy";

import { fetchUsers, deleteUser } from "@features/usersSlice";

const UsersList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

  const handleDelete = async (id) => {
    await dispatch(deleteUser({ id, token }));
    await dispatch(fetchUsers(token));
  };

  if (loading) return <Typography>Loading users...</Typography>;
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
        level="h1 "
        sx={{ fontSize: "2rem", fontWeight: "bold", color: "#20398A" }}
      >
        Application Users
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          mt: "1rem",
        }}
      >
        {isEmpty(users) ? (
          <Typography>No users available!</Typography>
        ) : (
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      color: "#20398A",
                    }}
                  >
                    {user.username}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    {user.role}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <IconButton
                    size="sm"
                    variant="outlined"
                    onClick={() => handleDelete(user.id)}
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

export default UsersList;
