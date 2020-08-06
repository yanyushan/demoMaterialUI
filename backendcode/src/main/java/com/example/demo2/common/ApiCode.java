package com.example.demo2.common;

public enum ApiCode {

    API_OK(200, "ok"),
    API_FAILED(1001, "Operation failed!"),
    API_INVALID_USER(2001, "Invalid request!");



    private final int code;

    private final String msg;

    ApiCode(int code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public int code() {
        return this.code;
    }

    public String getMsg() {
        return this.msg;
    }
}

