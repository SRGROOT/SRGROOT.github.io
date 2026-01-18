import { Divider, IconButton, InputBase, Paper } from "@mui/material";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { useDebounce } from "../../../hooks";

type Props = {
  initialValue?: string;
  onClear: VoidFunction;
  handleDebouncedValue: (value: string) => void;
  placeholder?: string;
};

export const Search = ({
  initialValue = "",
  handleDebouncedValue,
  onClear,
  placeholder = "Поиск",
}: Props) => {
  const [searchValue, setSearchValue] = useState(initialValue);

  const debouncedCallback = useDebounce(
    ([val]) => handleDebouncedValue(val),
    400
  );

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        px: 1,
        py: 0.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        "&:focus-within": {
          borderColor: "primary.main",
          boxShadow: "0 0 0 2px rgba(47, 111, 0, 0.1)",
        },
        transition: "all 0.2s ease-in-out",
      }}
    >
      <InputBase
        value={searchValue}
        onChange={({ currentTarget: { value } }) => {
          setSearchValue(value);
          debouncedCallback(value);
        }}
        sx={{ ml: 2, flex: 1 }}
        placeholder={placeholder}
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
