import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout";
import Collection from "./Pages/Collection";
import Game from "./Pages/Game";
import Home from "./Pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Collection" component={Collection} />
            <Route exact path="/Game/:compressedCode" component={Game} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
