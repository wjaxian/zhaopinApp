import React from 'react';
import ReactDOM from 'react-dom';
import {
    createStore,
    applyMiddleware,
    compose
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
    BrowserRouter,
    Route,
    // Redirect,
    Switch
} from "react-router-dom";
import reducers from "./reducer";
import registerServiceWorker from './registerServiceWorker';
import "./http";

import Login from "./container/login/login";
import Register from "./container/register/register";
import AuthRoute from "./components/authroute/authroute";
import BossInfo from "./container/bossinfo/bossinfo";
import GeniusInfo from "./container/geniusinfo/geniusinfo";

import "./static/fronts/iconfont.css";
import "./static/css/main.css";

//从window对象中获取redux谷歌浏览器插件对象如果存在就使用
const reduxDevTools = window.devToolsExtension()||(f=>f);
const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevTools
));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>{/* 登录验证组件 */}
                <Switch>
                    <Route path="/geniusInfo" component={GeniusInfo}/>
                    <Route path="/bossinfo" component={BossInfo}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

