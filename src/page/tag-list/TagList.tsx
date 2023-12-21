import * as React from "react";
import { Chip, Stack } from "@mui/material";

interface OwnProps {
  tags: string[];
}

const TagList = ({ tags }: OwnProps) => {
  return (
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          variant="outlined"
          sx={{
            textTransform: "none",
            fontSize: "0.8rem",
            fontWeight: 300,
            color: "#aaa",
            cursor: "pointer",
          }}
          
        />
      ))}
    </Stack>
  );
};
export default TagList;
