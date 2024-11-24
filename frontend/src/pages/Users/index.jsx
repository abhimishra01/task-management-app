import { useEffect } from "react";
import { Box } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers } from "@features/usersSlice";
import UserList from "@components/UserList";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        m: "auto",
        mt: "3rem",
      }}
    >
      <UserList users={users} />
    </Box>
  );
};

export default Users;
