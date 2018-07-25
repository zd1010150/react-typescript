
import fetch from 'whatwg-fetch';
import { baseUrl } from '../config/env.config';
import { MAX_FETCH_TIMEOUT } from '../config/app.config';
import { getAuthorization } from './common';

export default async (type = 'GET', url = '', data = {}, headers = {}, apiDomain = '') => {
    type = type.toUpperCase();
    url = (apiDomain || baseUrl) + url;
    const langauge = window.__store__ && window.__store__.getState() && window.__store__.getState().global.language;
    const requestConfig = {
        credentials: 'include',
        method: type,
        headers: {
            Accept: 'application/json',
            'Accept-Language': langauge,
            'Content-Type': 'application/json',
            Authorization: getAuthorization(),
            ...headers,
        },
        mode: 'cors',
        cache: 'default', // should set cache to 'no-cache'
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
    function _fetch(fetchPromise, timeout) {
        // 这是一个可以被reject的promise
        const abortPromise = new Promise(((resolve, reject) => {
            setTimeout(()=>{
                reject(new Error('abort promise'));
            }, timeout)
        }));
        // 这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
        return Promise.race([
            fetchPromise,
            abortPromise,
        ]);
    }
    let response;
    let contentType;
    try {
        response = await _fetch(fetch(url, requestConfig), MAX_FETCH_TIMEOUT);
        contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            const responseData = await response.json();
            return Promise.resolve({ data: responseData, statusCode: response.status });
        }
        throw new TypeError('Oops,we haven\'t get JSON! ');
    } catch (error) {
        console.log('error===', error);
        return error;
    }
};
