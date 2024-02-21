import { CircularProgress } from "@mui/material";

export const Loading = ({ style }) => {
  return (
    <div
      style={
        (style = {
          height: "100%",
          minHeight: "calc(100vh - var(--difference-value))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...style,
        })
      }
    >
      <CircularProgress color="primary" />
    </div>
  );
};
