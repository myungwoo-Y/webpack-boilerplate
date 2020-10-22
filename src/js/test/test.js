// node 환경에서는 fetch 를 제공하지 않아서 추가
global.fetch = require('node-fetch-polyfill');


export {};
