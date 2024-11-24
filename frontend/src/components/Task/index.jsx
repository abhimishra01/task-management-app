import React from "react";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Checkbox from "@mui/joy/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";

const Task = ({ title, userName, completed, onDelete, onToggle }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: "600px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        margin: "0.5rem auto",
        backgroundColor: completed ? "gray.100" : "white",
        opacity: completed ? 0.7 : 1,
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: "bold",
            textDecoration: completed ? "line-through" : "none",
          }}
        >
          {title}
        </Typography>
        <Typography sx={{ fontSize: "0.8rem", color: "gray.600" }}>
          Assigned to: {userName}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Checkbox
          label="Completed"
          size="sm"
          checked={completed}
          onChange={onToggle}
        />
        <IconButton
          disabled={!completed}
          variant="outlined"
          size="sm"
          onClick={onDelete}
          aria-label="Delete Task"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default Task;
