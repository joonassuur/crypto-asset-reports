import React from 'react';
import { List, Drawer, Toolbar } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { faker } from '@faker-js/faker';
import { colors } from '../../muiTheme';

interface NewsMenuItem {
  author: string;
  title: string;
  content: string;
  avatar: string;
}

const newsMenuItems: NewsMenuItem[] = Array.from({ length: 10 }, () => {
  return {
    author: faker.internet.userName(),
    title: faker.lorem.sentence({ min: 3, max: 5 }),
    content: faker.lorem.sentence({ min: 3, max: 15 }),
    avatar: faker.image.avatar(),
  };
});

function NewsMenu({ id }: { id: string }) {
  return (
    <Drawer
      anchor="right"
      variant="permanent"
      sx={{
        zIndex: 1,
        display: { xs: 'none', lg: 'block' },
        '& .MuiDrawer-paper': {
          borderLeft: 0,
          boxSizing: 'border-box',
        },
      }}
      open
    >
      <Toolbar />
      <Toolbar
        sx={{
          backgroundColor: colors.lightgray2,
        }}
      >
        <Typography variant="h6">{id ? `${id} news` : 'News'}</Typography>
      </Toolbar>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          background: colors.lightgray2,
        }}
      >
        {newsMenuItems.map((item, index) => (
          <React.Fragment key={`${item.title}-${index}`}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={item.author} src={item.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      @{item.author}
                    </Typography>{' '}
                    {item.content}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default NewsMenu;
