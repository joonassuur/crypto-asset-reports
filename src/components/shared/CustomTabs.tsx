import React from 'react';
import { Button, FormControl, ButtonGroup } from '@mui/material';
import { colors } from '../../muiTheme';

const buttonGroupStyle = {
  color: colors.primary,
  textTransform: 'none',
};

const selectedButtonGroupStyle = {
  color: colors.primary,
  backgroundColor: colors.secondary,
  textTransform: 'none',
};

interface Props {
  value: string;
  tabs: string[];
  handleChange: (offerType: string) => void;
  variant?: string;
}

function CustomTabs({ tabs, value, handleChange, variant }: Props) {
  return (
    <FormControl sx={{ marginTop: 0 }}>
      <ButtonGroup
        size="small"
        variant="outlined"
        aria-label={variant || 'tab group'}
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
