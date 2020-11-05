import React from "react";
import { Switch, Route, BrowserRouter, RouteComponentProps } from "react-router-dom";
import { LayoutProvider } from "./Layout/LayoutContext";
import Collection from "./Pages/Collection";
import Game from "./Pages/Game";
import Home from "./Pages/Home";

interface MatchParams {
  compressedCode: string;
}
interface MatchProps extends RouteComponentProps<MatchParams> {}

function App() {
  return (
    <>
      <BrowserRouter>
        <LayoutProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Collection" component={Collection} />
            <Route
              exact
              path="/Game/:compressedCode"
              render={({ match }: MatchProps) => (
                <Game compressedCode={decodeURI(match.params.compressedCode).replace("#", "")} />
              )}
            />
            <Route
              exact
              path="/Game/"
              render={({ location }: MatchProps) => <Game compressedCode={location.hash.substring(1)} />}
            />
          </Switch>
        </LayoutProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
