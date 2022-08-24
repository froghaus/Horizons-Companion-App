import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CharacterLibrary from './character-library/CharacterLibrary'
import CharacterPage from './character-sheet/CharacterPage'
import NewCharacterForm from './character-form/NewCharacterForm'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/characters" component={CharacterLibrary} />
        <Route exact path="/characters/new" component={NewCharacterForm} />
        <Route exact path="/characters/:id" component={CharacterPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
