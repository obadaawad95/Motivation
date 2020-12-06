import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AllArticles from "./pages/AllArticles";
import AllBooks from "./pages/AllBooks";
import AllVideos from "./pages/AllVideos";
import AllPosts from "./pages/AllPosts";
import AllComments from "./pages/AllComments";
import AllUsers from "./pages/AllUsers";
import AddArticle from "./pages/AddArticle";
import AddBook from "./pages/AddBook";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { NavLink } from "react-router-dom";
import AddVideo from "./pages/AddVideo";
import Aboutus from "./pages/AboutUs";
import AllCat from "./pages/AllCat";
import AddCat from "./pages/AddCat";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      backgroundColor: "#B93946",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#868585",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const NavDrawer = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <NavLink to="/articles" className="nav-link">
          <ListItem button key={"Articles"}>
            <ListItemText primary={"Articles"} />
          </ListItem>
        </NavLink>
        <NavLink to="/books" className="nav-link">
          <ListItem button key={"Books"}>
            <ListItemText primary={"Books"} />
          </ListItem>
        </NavLink>
        <NavLink to="/videos" className="nav-link">
          <ListItem button key={"Videos"}>
            <ListItemText primary={"Videos"} />
          </ListItem>
        </NavLink>
        <NavLink to="/cats" className="nav-link">
          <ListItem button key={"Categories"}>
            <ListItemText primary={"Categories"} />
          </ListItem>
        </NavLink>
        <NavLink to="/aboutus" className="nav-link">
          <ListItem button key={"Aboutus"}>
            <ListItemText primary={"Aboutus"} />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      <List>
        <NavLink to="/users" className="nav-link">
          <ListItem button key={"Users"}>
            <ListItemText primary={"Users"} />
          </ListItem>
        </NavLink>
        <NavLink to="/posts" className="nav-link">
          <ListItem button key={"Posts"}>
            <ListItemText primary={"Posts"} />
          </ListItem>
        </NavLink>
        <NavLink to="/comments" className="nav-link">
          <ListItem button key={"Comments"}>
            <ListItemText primary={"Comments"} />
          </ListItem>
        </NavLink>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          style={{ backgroundColor: " B93946" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              MOTIVEHUB
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="center">
            <main>
              <Switch>
                <Route exact path="/articles" component={AllArticles} />
                <Route exact path="/books" component={AllBooks} />
                <Route exact path="/videos" component={AllVideos} />
                <Route exact path="/aboutus" component={Aboutus} />
                <Route exact path="/cats" component={AllCat} />
                <Route exact path="/users" component={AllUsers} />
                <Route exact path="/posts" component={AllPosts} />
                <Route exact path="/comments" component={AllComments} />
                <Route exact path="/addarticle" component={AddArticle} />
                <Route exact path="/addbook" component={AddBook} />
                <Route exact path="/addvideo" component={AddVideo} />
                <Route exact path="/addcat" component={AddCat} />
                <Redirect to="/articles" />
              </Switch>
            </main>
          </div>
        </main>
      </div>
    </Router>
  );
};
NavDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavDrawer;
