import React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Cached from "@material-ui/icons/Cached";
import EventNoteIcon from "@material-ui/icons/EventNote";
import Link from "@material-ui/core/Link";

import { useAuthContext } from "../../context/Auth";

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
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const SideBar = ({ moderator }: { moderator: 'MODERATOR' | 'USER' }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { signOut } = useAuthContext();

  const moderatorMenu = [
    {
      id: 1,
      text: "Cadastrar usuários",
      icon: <AccountCircleIcon />,
      link: "/register",
    },
    {
      id: 2,
      text: "Lista de contas",
      icon: <EventAvailableIcon />,
      link: "/accounts",
    },
    {
      id: 3,
      text: "Transferencias",
      icon: <Cached />,
      link: "/transfers",
    }
  ];
  
  const userMenu = [
    {
      id: 1,
      text: "Extrato",
      icon: <EventAvailableIcon />,
      link: "/operations"
      
    },
    {
      id: 2,
      text: "Transferencias",
      icon: <Cached />,
      link: "/transfers",
      
    },
    {
      id: 3,
      text: "Ultimas movimentações",
      icon: <EventNoteIcon />,
      link: "/latest",
      
    },
  ];
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
          <Box display="flex" flexGrow={1} alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Beer Coin
            </Typography>
          </Box>

          <IconButton
            color="inherit"
            aria-label="exit app"
            onClick={() => signOut()}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        {moderator === 'MODERATOR' ? (
          <List>
            {moderatorMenu.map((item, index) => {
              const { text, id, icon, link } = item;
              return (
                <Link href={link}>
                  <ListItem button key={id}>
                    <ListItemIcon> {icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              );
            })}
          </List>
        ) : (
          <List>
              {userMenu.map((item, index) => {
                const { text, id, icon, link } = item;
                return (
                  <Link href={link}>
                    <ListItem button key={id}>
                      <ListItemIcon> {icon}</ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          )}
        <Divider />
      </Drawer>
    </div>
  );
}
export default SideBar;