"use strict";

const _url = new WeakMap();
const _options = new WeakMap();
const _headers = new WeakMap();

class MockHttpClient {
    constructor(url, options) {
        this.options = options;
        this.url = url;
        this.headers = {};
    }
    
    get url() {
        return _url.get(this);
    }
    set url(value){
        _url.set(this,value);
    }
    
    get options() {
        return _options.get(this);
    }
    set options(value) {
        _options.set(this,value);
    }
    
    get headers() {
        return _headers.get(this);
    }
    set headers(value) {
        _headers.set(this,value);
    }
    
    header(key,value) {
        this.headers[key] = value;
        return this;
    }
    
    get(callback) {
        ///NEEDS TO RETURN SOME OBJECT THAT MEETS HTTP RESPONSE
        callback(new Error("Not Currently Implemented"),null,null);
    }
    
    post(callback) {
        callback(new Error("Post is not fully implemented"),null,null);
    }
    
    put(callback) {
        callback(new Error("Put is not fully implemented"),null,null);
    }
    
}

module.exports = MockHttpClient;