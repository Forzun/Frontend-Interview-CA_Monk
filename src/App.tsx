import { Route, Switch } from "wouter"
import Home from "./pages/home"
import { Toaster } from "sonner"


export default function App() {

  return (
      <main>
          <Toaster />
          <Router />
      </main>
  )
}


function Router(){ 
  return( 
    <Switch> 
      <Route path={"/"} component={Home} />
      <Route path="/blog/:id" component={Home} />
    </Switch>
  )
}

