import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CharacterLibrary from './CharacterLibrary'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/characters" component={CharacterLibrary} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
