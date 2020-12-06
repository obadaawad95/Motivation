import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./pages/Home";
import AllPosts from "./pages/AllPosts";
import Auth from "./pages/Auth";
import { AuthContext } from "./states/contexts/AuthContext";
import Myprofile from "./pages/Myprofile";
import Cat from "./pages/Cat";
import CatDetails from "./pages/CatDetails";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Postspage" component={AllPosts} />
          {token && <Route exact path="/Profilepage" component={Myprofile} />}
          <Route exact path="/cat/:catid" component={Cat} />
          <Route exact path="/catdetail/:cim/:ct/:cut" component={CatDetails} />
          {!token && <Route exact path="/LoginPage" component={Auth} />}
          {token && <Redirect to="/" />}
          {!token && <Redirect to="/LoginPage" />}
        </Switch>
      </main>
    </Router>
  );
};

export default App;
