import { Divider, IconButton, InputBase, Paper } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { useDebounce } from "../../../hooks";

type Props = {
  initialValue?: string;
  onClear: VoidFunction;
  handleDebouncedValue: (value: string) => void;
};

export const Search = ({
  initialValue = "",
  handleDebouncedValue,
  onClear,
}: Props) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  const debouncedCallback = useDebounce(
    ([val]) => handleDebouncedValue(val),
    400
  );

  return (
    <Paper
      elevation={5}
      sx={{
        display: "flex",
        px: 1,
        py: 0.5,
      }}
    >
      <InputBase
        value={searchValue}
        onChange={({ currentTarget: { value } }) => {
          setSearchValue(value);
          debouncedCallback(value);
        }}
        sx={{ ml: 2, flex: 1 }}
        placeholder="Поиск"
      />

      {searchValue && (
        <>
          <IconButton
            onClick={() => {
              onClear();
              setSearchValue("");
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        </>
      )}

      <IconButton disabled>
        <SearchOutlinedIcon />
      </IconButton>
    </Paper>
  );
};
