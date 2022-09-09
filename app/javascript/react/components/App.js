import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CharacterLibrary from './character-library/CharacterLibrary'
import CharacterPage from './character-sheet/CharacterPage'
import NewCharacterForm from './character-form/NewCharacterForm'
import CampaignLibrary from './campaign-manager/CampaignLibrary'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/characters" component={CharacterLibrary} />
        <Route exact path="/characters/new" component={NewCharacterForm} />
        <Route exact path="/characters/:id" component={CharacterPage} />
        <Route exact path="/campaigns" component={CampaignLibrary} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
