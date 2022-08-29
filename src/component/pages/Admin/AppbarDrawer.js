import React from 'react';
import customerIcon from '../../../images/customer.png';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import ListRoundedIcon from '@material-ui/icons/ListRounded';
import AssignmentRoundedIcon from '@material-ui/icons/AssignmentRounded';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ListItemText } from '@material-ui/core';
import { logoutUser } from '../../../Action/userAction';


const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    backgroundColor: '#6255a5'
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#806eda'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    maxWidth: '100vw',
    padding: theme.spacing(3),
  },
}));

export default function AppbarDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const loggeduser = useSelector((state) => state.createUsers.loggedUser);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItem>
          <figure className='text-center d-flex flex-column justify-content-center ml-3'>
            <img className='text-center border border-5 rounded-circle border-dark mb-3' src={customerIcon} alt="users" />
            <h4 className='nav-text text-black-50'>{loggeduser ? loggeduser.name : ''}</h4>
          </figure>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem key='BookList'>
          <ListItemIcon><ListRoundedIcon /></ListItemIcon>
          <ListItemText>
            <NavLink className='nav-text' to={`/admin/booklist`}>BookList</NavLink>
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem key='Assigned Booklist'>
          <ListItemIcon><AssignmentRoundedIcon /></ListItemIcon>
          <ListItemText>
            <NavLink className='nav-text' to={`/admin/assignbook`}>Assign Book</NavLink>
          </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const dispatch = useDispatch();
  const history = useHistory();

  // dispatch logout action
  const logOut = () => {
    dispatch(logoutUser());
    history.push('/');
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>

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
            <i className='fa fa-book text-white' />Library Management
          </Typography>

          <button onClick={logOut} className="btn btn-outline-light rounded-pill px-4 mr-5 ml-auto">Logout</button>
        </Toolbar>

      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
    </>
  );
}


