import React from 'react';
import { Button, FormControl, ButtonGroup } from '@mui/material';
import { colors } from '../muiTheme';

interface Props {
  value: string;
  tabs: string[];
  handleChange: (offerType: string) => void;
}

const buttonGroupStyle = {
  color: colors.primary,
  textTransform: 'none',
};

const selectedButtonGroupStyle = {
  color: colors.primary,
  backgroundColor: colors.secondary,
  textTransform: 'none',
};

function CustomTabs({ tabs, value, handleChange }: Props) {
  return (
    <FormControl sx={{ marginTop: 0 }}>
      <ButtonGroup
        size="small"
        variant="outlined"
        aria-label="small outlined button group"
      >
        {tabs.map((tab) => {
          return (
            <Button
              key={tab}
              sx={value === tab ? selectedButtonGroupStyle : buttonGroupStyle}
              onClick={() => {
                handleChange(tab);
              }}
            >
              {tab}
            </Button>
          );
        })}
      </ButtonGroup>
    </FormControl>
  );
}

export default CustomTabs;
