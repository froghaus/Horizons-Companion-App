import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CharacterLibrary from './character-library/CharacterLibrary'
import CharacterPage from './character-sheet/CharacterPage'
import NewCharacterForm from './character-form/NewCharacterForm'
import CampaignLibrary from './campaign-manager/CampaignLibrary'
import CampaignShow from './campaign-sheet/CampaignShow'

export const App = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/characters" component={CharacterLibrary} />
        <Route exact path="/characters/new" component={NewCharacterForm} />
        <Route exact path="/characters/:id" component={CharacterPage} />
        <Route exact path="/campaigns" component={CampaignLibrary} />
        <Route exact path="/campaigns/:id" component={CampaignShow} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
