import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import { IconButton } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Cached from "@material-ui/icons/Cached";

import { useAuthContext } from "../../context/Auth";
import { Link } from "react-router-dom";

const drawerWidth = 280;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      backgroundColor: "#03185a",
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 0.5),
      ...theme.mixins.toolbar,
    },
    icon: {
      minWidth: theme.spacing(5) + 1,
    },
  })
);

interface IProps {
  moderator: IRoles;
}

const SideBar = (props: IProps) => {
  const { moderator: typeUserProps } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { signOut } = useAuthContext();

  const menuSideaBar = [
    {
      id: 1,
      text: "Home",
      icon: <HomeIcon />,
      link: "/",
      userType: typeUserProps,
    },
    {
      id: 2,
      text: "Operations",
      icon: <EventAvailableIcon />,
      link: "/operations",
      userType: "ROLE_MODERATOR",
    },
    {
      id: 3,
      text: "Payments",
      icon: <Cached />,
      link: "/payments",
      userType: "ROLE_USER",
    },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={() => setOpen(!open)}>{open ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        </div>
        <Divider />
        <List>
          {menuSideaBar.map((item, index) => {
            const { text, id, icon, link, userType } = item;
            if (userType === typeUserProps) {
              return (
                <ListItem color="inherit" key={id} component={Link} to={link} button>
                  <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              );
            }
            return "";
          })}
          <ListItem component={Link} to="/login" onClick={() => signOut()} button>
            <ListItemIcon className={classes.icon}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
};
export default SideBar;
