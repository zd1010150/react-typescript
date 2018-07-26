import * as _ from 'lodash';

import {MAX_FETCH_TIMEOUT} from '../config/app.config';
import {baseUrl} from '../config/env.config';
import {getAuthorization} from './common';

export default async (type: string = 'GET', url: string = '', data: object = {}, headers: object = {}, apiDomain: string = ''):Promise<any>=> {
    url = (apiDomain || baseUrl) + url;
    const langauge = window.__store__ && window.__store__.getState() && window.__store__.getState().global.language;
    const objHeaders = new Headers({
        Accept: 'application/json',
        'Accept-Language': langauge,
        Authorization: getAuthorization(),
        'Content-Type': 'application/json',
        ...headers,
    });
    const requestConfig: RequestInit ={
        cache: 'default', // should set cache to 'no-cache'
        credentials: 'include',
        headers: objHeaders,
        method: type,
        mode: 'cors',
    };

    if (type === 'GET') {
        let dataStr = ''; // 数据拼接字符串
        Object.keys(data).forEach((key) => {
            dataStr += `${key}=${data[key]}&`;
        });
        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = `${url}?${dataStr}`;
        }
    } else if (!_.isEmpty(data)) {
        Object.defineProperty(requestConfig, 'body', {
            value: JSON.stringify(data),
        });
    }

    function _fetch(fetchPromise: object, timeout: number){
        // 这是一个可以被reject的promise
        const abortPromise = new Promise(((resolve, reject) => {
            setTimeout(() => {
                throw new Error('abort promise');
            }, timeout)
        }));
        // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        return Promise.race([
            fetchPromise,
            abortPromise,
        ]);
    }

        _fetch(fetch(url, requestConfig), MAX_FETCH_TIMEOUT).then((res: Response)=>{
            const respHeaders: Headers = res.headers;
            const contentType: string | null = respHeaders.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                res.json().then((responseData)=>{
                    return Promise.resolve({data: responseData, statusCode: res.status});
                })
            }
        }).catch((err: any)=>{
            window.console.log('error===', err);
            return Promise.reject(err)
        });
};
