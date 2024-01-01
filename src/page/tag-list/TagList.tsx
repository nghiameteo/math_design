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
          size="small"
          sx={{
            color: "#aaa",
            cursor: "pointer",
          }}
        />
      ))}
    </Stack>
  );
};
export default TagList;
