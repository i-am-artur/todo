import { Stack, Typography } from '@mui/material';
import { feature, padding } from 'styles/variables';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ColorModeContext } from 'styles/MUI/Theme';
import { ColorMode } from 'common/theme';
import { Group, Switch, useMantineTheme } from '@mantine/core';
import { color } from 'styles/colors';
import Search from 'Layouts/App/Header/components/Search';
import User from 'Layouts/App/Header/components/User/User';

export default function Header() {
  const colorMode = useContext(ColorModeContext);
  const theme = useMantineTheme();

  return (
    <Stack
      component='header'
      ml='auto'
      mr='auto'
      spacing={feature.gap.h}
      p={padding.screen}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      color={color.primary.text}
      bgcolor={color.primary.main}
    >
      <Typography variant='logo'>Todo</Typography>
      <Search />
      <Stack spacing={feature.gap.h} direction='row'>
        <Group position='center'>
          <Switch
            onClick={colorMode.toggleMode}
            size='md'
            color={
              colorMode.mode === ColorMode.light ? theme.colors.yellow[4] : theme.colors.blue[6]
            }
            onLabel={<FontAwesomeIcon icon={faMoon} size='2x' />}
            offLabel={<FontAwesomeIcon icon={faSun} size='2x' />}
          />
        </Group>
        <User />
      </Stack>
    </Stack>
  );
}
