import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getTagsAsync,
  searchTag,
  selectMultiTag,
} from "../../filter/filterSlice";
import { useEffect } from "react";
import { Chip, Stack, Box, Typography } from "@mui/material";
import styles from "./TagFilter.module.css";

const TagFilter = () => {
  const dispatch = useAppDispatch();
  const tags: string[] = useAppSelector(selectMultiTag);

  useEffect(() => {
    dispatch(getTagsAsync());
  }, []);

  const onSearchTagChange = (value: string) => {
    dispatch(searchTag({ tag: value }));
  };

  return (
    <>
      <Box
        className={styles.boxHeader}
        maxHeight='xl'
      >
        <Typography
          className={styles.chipFirst}>
            Popular Tags
          </Typography>

        <Stack direction="row" gap={0.4} display={"flex"} flexWrap={"wrap"}>
          {tags.map((tag) => (
            <Chip
              className={styles.chipSecond}
              key={tag}
              label={tag}
              size="small"
              onClick={() => onSearchTagChange(tag)}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};
export default TagFilter;
