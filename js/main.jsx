import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import App from './components/App';
import slightEdgeApp from './reducers/pomodoro';
import initialState from './initialState';

const store = createStore(slightEdgeApp, initialState, applyMiddleware(thunkMiddleware));

const renderApp = () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
};
renderApp();

if (module.hot) {
    module.hot.accept('./components/App', () => {
        renderApp();
    });
}