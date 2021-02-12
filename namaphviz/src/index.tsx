import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './app/App';
import {Vizthemelist} from "./features/vizthemelist/Vizthemelist"
import {Indicatorlist} from './features/indicatorlist/Indicatorlist'
import {Mapcontroller} from './features/mapcontroller/Mapcontroller'
import {Seekbar} from './features/seekbar/Seekbar'
import {DeckMap} from './features/deckgl/Deckgl'

import { store } from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';


// import ParentSize from '@visx/responsive/lib/components/ParentSize'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DeckMap />
      <Vizthemelist />
      <Indicatorlist />
      <Mapcontroller />
      <Seekbar />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
