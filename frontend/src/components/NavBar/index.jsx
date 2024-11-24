import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { isAdmin } from "@utils";
import { logout } from "@features/authSlice";
import TaskFormModal from "@components/TaskFormModal";
import UserFormModal from "@components/UserFormModal";

export default function NavBar() {
  const dispatch = useDispatch();
  const { role, token } = useSelector((state) => state.auth);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 0.1rem",
        borderBottom: "1px solid #1D4ED8",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        marginLeft: "0.5rem",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", marginLeft: "1rem" }}>
        <Typography
          level="h1 "
          sx={{ fontSize: "2rem", fontWeight: "bold", color: "#20398A" }}
        >
          Juno
        </Typography>
      </Link>
      {token && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {isAdmin(role) && (
            <>
              <Link to="/users">
                <Button
                  variant="outlined"
                  color="primary"
                  startDecorator={<SupervisorAccountIcon />}
                >
                  Users
                </Button>
              </Link>
              <TaskFormModal />
              <UserFormModal />
            </>
          )}
          <Button
            variant="outlined"
            color="danger"
            sx={{ marginRight: "1.5rem" }}
            startDecorator={<LogoutIcon />}
            onClick={() => dispatch(logout())}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
}
