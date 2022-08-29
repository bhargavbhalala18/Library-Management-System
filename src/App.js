import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreateUser from './component/pages/CreateUser';
import Login from './component/pages/Login';
import Admin from './component/pages/Admin/Admin'
import User from './component/pages/User/User';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={CreateUser}></Route>
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/user' component={User}></Route>
        <Route exact path='/admin/booklist' component={Admin}></Route>
      </Switch>
    </Router>
  );
}

export default App;

