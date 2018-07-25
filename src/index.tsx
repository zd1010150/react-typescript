/* tslint:disable:interface-name */
import 'antd/dist/antd.less';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

declare global {
    interface Window { __store__: any; }
}
window.__store__ = {};


// 在非生成环境，都打印redux中的state,以便于跟踪调试，在非生产环境中都写入固定cookie用于调试

if (process.env.NODE_ENV !== 'production') {
    // store.subscribe(() => {
    //     console.log('redux store ===', store.getState());
    // });
}



ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
