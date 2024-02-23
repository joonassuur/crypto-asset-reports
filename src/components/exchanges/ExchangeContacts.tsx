import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { List, ListItemIcon } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { Link, Box } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import {
  Link as LinkIcon,
  AccountBalance,
  ChatBubbleOutline,
  Twitter,
} from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { faker } from '@faker-js/faker';

const imageAvatar = faker.image.avatar();
function ExchangeContacts({ exchangeDetails }: { exchangeDetails: any }) {
  return (
    <List
      aria-label="contact details"
      dense
      disablePadding
      sx={{
        width: '100%',
        maxWidth: 360,
      }}
    >
      <React.Fragment>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={
              <Box display="flex" justifyContent="space-between">
                <Typography
                  variant="h5"
                  display="flex"
                  alignItems="center"
                  fontWeight="bold"
                >
                  <Avatar
                    alt={exchangeDetails.name}
                    src={imageAvatar}
                    sx={{ marginRight: '12px' }}
                  />
                  {exchangeDetails.name}
                </Typography>
              </Box>
            }
          />
        </ListItem>
        <ListItem alignItems="center">
          <ListItemIcon
            sx={{ marginTop: 0, fontSize: 14, maxWidth: 'inherit' }}
          >
            <LinkIcon />
          </ListItemIcon>
          <ListItemText>
            <Link component={RouterLink} to="#">
              {`https://www.${exchangeDetails.name}.com/`}
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemIcon
            sx={{ marginTop: 0, fontSize: 14, maxWidth: 'inherit' }}
          >
            <AccountBalance />
          </ListItemIcon>
          <ListItemText>
            <Link component={RouterLink} to="#">
              Fees
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemIcon
            sx={{ marginTop: 0, fontSize: 14, maxWidth: 'inherit' }}
          >
            <ChatBubbleOutline />
          </ListItemIcon>
          <ListItemText>
            <Link component={RouterLink} to="#">
              Chat
            </Link>
          </ListItemText>
        </ListItem>
        <ListItem alignItems="center">
          <ListItemIcon
            sx={{ marginTop: 0, fontSize: 14, maxWidth: 'inherit' }}
          >
            <Twitter />
          </ListItemIcon>
          <ListItemText>
            <Link component={RouterLink} to="#">
              {`@${exchangeDetails.name}`}
            </Link>
          </ListItemText>
        </ListItem>
      </React.Fragment>
    </List>
  );
}

export default ExchangeContacts;
