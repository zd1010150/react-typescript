/* tslint:disable:interface-name */
import 'antd/dist/antd.less';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'src/assets/less/index.less';
import App from './App';
import { ErrorNotification } from './components/ui/index';
import I18n from './i18n/index';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

declare global {
    interface Window {
        __store__: any,
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
    }
}

const store = configureStore();

// 在非生成环境，都打印redux中的state,以便于跟踪调试，在非生产环境中都写入固定cookie用于调试
if (process.env.NODE_ENV !== 'production') {
    store.subscribe(() => {
        window.console.log('redux store ===', store.getState());
    });
}
window.__store__ = store;
ErrorNotification(store);

ReactDOM.render(
    <Provider store={store}>
        <I18n>
            <BrowserRouter>
               <App />
            </BrowserRouter>
        </I18n>
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
