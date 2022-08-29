import React from 'react';
import AppbarDrawer, { useStyles } from './AppbarDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import BookList from './Book/BookList'
import AssignList from './AssignBook/AssignList';
import { useSelector } from 'react-redux';

export default function Admin() {

  const classes = useStyles();
  const history = useHistory();
  const loggeduser = useSelector(state => state.createUsers.loggedUser);

  // Logged user Check
  if (loggeduser == null) {
    history.push('/');
  }

  return (
    <>
      <div className={classes.root}>
        <Router>
          <AppbarDrawer />
          {/* main page */}
          <main className={classes.content} >
            <Toolbar />
            <div>
              <Switch>
                <Route exact path={`/admin/booklist`} component={BookList}></Route>
                <Route exact path={`/admin/assignbook`} component={AssignList}></Route>
              </Switch>
            </div>
          </main>
        </Router>
      </div>
    </>

  );
}



