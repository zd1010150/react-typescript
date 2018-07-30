import fetch from 'isomorphic-fetch';
import * as _ from 'lodash';
import {MAX_FETCH_TIMEOUT} from '../config/app.config';
import {baseUrl} from '../config/env.config';
import { getAuthorization } from './common';

export default async (type: string = 'GET', url: string = '', data: object = {}, headers: object = {}, apiDomain: string = ''):Promise<any>=> {
    url = (apiDomain || baseUrl) + url;
    const langauge = window.__store__ && window.__store__.getState() && window.__store__.getState().global.language;
    const token = getAuthorization();
    const objHeaders = new Headers({
        Accept: 'application/json',
        'Accept-Language': langauge,
        Authorization: _.isEmpty(token) ? '' : `Bearer ${token}`,
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
        let abortFn:any;
        // 这是一个可以被reject的promise
        const abortPromise = new Promise(((resolve, reject) => {
            abortFn =() => {
                reject(new Error('abort promise'));
            };
        }));
        // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        const abortablePromise = Promise.race([
            fetchPromise,
            abortPromise,
        ]);
        setTimeout(() => {
            abortFn();
        }, timeout);
        return abortablePromise;
    }

    let response: Response;
    try {
        response= await _fetch(fetch(url, requestConfig), MAX_FETCH_TIMEOUT) as Response;
        const respHeaders: Headers = response.headers;
        const contentType: string | null = respHeaders.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            return Promise.resolve({ data: responseData, statusCode: response.status });
        }
        throw new TypeError('Oops,we haven\'t get JSON! ');
    } catch (error) {
        window.console.log('error===', error);
        return error;
    }

};
