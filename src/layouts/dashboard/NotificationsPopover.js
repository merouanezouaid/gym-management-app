import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";
import { noCase } from "change-case";
import { useRef, useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Axios from "axios";
import { set, sub, formatDistanceToNow, compareAsc } from "date-fns";
// material
import { alpha } from "@mui/material/styles";
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";
// utils
import { mockImgAvatar } from "../../utils/mockImages";
// components
import Iconify from "../../components/Iconify";
import Scrollbar from "../../components/Scrollbar";
import MenuPopover from "../../components/MenuPopover";

// ----------------------------------------------------------------------



function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography
        component="span"
        variant="body2"
        sx={{ color: "text.secondary" }}
      >
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === "order_placed") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "order_shipped") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "mail") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === "chat_message") {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="/static/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: <img alt={notification.title} src={notification.avatar} />,
    title,
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      to="#"
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
        ...(notification.isUnRead && {
          bgcolor: "action.selected",
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "background.neutral" }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <Iconify
              icon="eva:clock-fill"
              sx={{ mr: 0.5, width: 16, height: 16 }}
            />
            {formatDistanceToNow(new Date(notification.createdAt))}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/notifications`).then((response) => {
      setNotifications(response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    });
  }, [open]);

  const handleNotifications = () => {
    Axios.get(`${process.env.REACT_APP_API_URL}/api/payment`).then((response) => {
      response.data.forEach((item) => {
        const { member, date, months, credit } = item;
        const d = new Date(date); // we convert the date string to date type
        const today = new Date(Date.now()); // today's date
        const expiredDate = new Date(d.setMonth(d.getMonth() + months));
        if (compareAsc(today, expiredDate) !== -1) {
          const idFound = notifications.some(el => el.member === member._id);
          // console.log(idFound)
          if(!idFound){
            Axios.post(`${process.env.REACT_APP_API_URL}/api/notifications`,
              {
                title: `${member.firstName} ${member.lastName}`,
                description:
                  credit > 0
                    ? `still has ${credit} DHS to pay`
                    : "membership has ended",
                avatar: credit > 0
                ? "/static/icons/ic_notification_credit.png"
                : "/static/icons/ic_notification_renew.png",
                member: member._id,
                type: `payment_ended${credit > 0 ? `with_credit` : ""}`,
                createdAt: today,
                isUnRead: true,
              }
            );
          }
          
          // setNotifications([
          //   ...notifications,
          //   {
          //     title: `${member.firstName} ${member.lastName} ${
          //       credit > 0 ? `need to pay` : `noneed`
          //     } should pay for the next month!!`,
          //     description: "Hello World",
          //   },
          // ]);
          // if (credit > 0) {
          //   console.log(`You need to pay ${credit} DHS`);
          // }
        } else {
          // console.log(formatDistanceToNow(expiredDate, {addSuffix: true}));
        }
      });
      console.log(notifications);
    });
  };

  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  const handleOpen = () => {
    handleNotifications();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        size="large"
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.focusOpacity
              ),
          }),
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: "auto" } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
              />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ py: 1, px: 2.5, typography: "overline" }}
              >
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple component={RouterLink} to="#">
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
