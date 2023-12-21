import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getTagsAsync,
  searchTag,
  selectMultiTag,
} from "../../filter/filterSlice";
import { SetStateAction, useEffect, useState } from "react";
import { Chip, Stack, Box } from "@mui/material";

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

      <Box display={'flex'} flexDirection={"column"} sx={{gap: '1rem'}} justifyContent={'flex-start'}>
        <Chip label={"Popular Tag"} variant="outlined" />
        <Stack direction="row" spacing={1} display={"flex"} flexWrap={"wrap"}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onClick={()=>onSearchTagChange(tag)}
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
      </Box>
    </>
  );
};
export default TagFilter;
