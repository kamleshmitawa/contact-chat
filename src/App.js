import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import "./App.css";
import { Contact } from "./components/contact/Contacts";
import { Chat } from "./components/message/Chat";
import { RoutePath } from "./RoutePath";
import { NotFound } from "./routes/NotFound";

const App = () => {
  return (
    <Router history={useHistory()}>
      <Switch>
        <Route exact component={Contact} path={RoutePath.root} />
        <Route exact component={Contact} path={RoutePath.contacts} />
        <Route exact component={Chat} path={RoutePath.chat} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
