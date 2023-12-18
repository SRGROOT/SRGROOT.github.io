import styled from "@emotion/styled";
import { Box, IconButton, TextField } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

const StyledInput = styled(TextField)(
  () => `
  &  {
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    input {
        text-align: center;
    }
  }
  `
);

type Props = {
  value?: number;
  onAddButtonClick: VoidFunction;
  onDecrementButtonClick: VoidFunction;
  onChangeValue: (value: number) => void;
};

export const Counter = ({
  value,
  onAddButtonClick,
  onDecrementButtonClick,
  onChangeValue,
}: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <IconButton
        onClick={onDecrementButtonClick}
        size="small"
        color="secondary"
      >
        <RemoveRoundedIcon />
      </IconButton>
      <StyledInput
        variant="standard"
        type="number"
        onChange={({ currentTarget: { value } }) => {
          /**
           * Свойства max, min etc. не работают
           */

          const amount = +value;

          if (amount < 50) onChangeValue(+value);
        }}
        sx={{ width: "30px" }}
        value={value}
        inputMode="numeric"
        color="secondary"
      />
      <IconButton onClick={onAddButtonClick} size="small" color="secondary">
        <AddRoundedIcon />
      </IconButton>
    </Box>
  );
};
