package com.example.demo2.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
@Data
//@AllArgsConstructor
@JsonPropertyOrder({"code", "msg", "data"})
public class ApiResponse<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    private int code;
    private String msg;
    private T data;

    public ApiResponse(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static ApiResponse<Object> success() {
        return new ApiResponse<>(ApiCode.API_OK.code(), ApiCode.API_OK.getMsg(), "");
    }

    public static <T> ApiResponse<T> success(T object) {
        return new ApiResponse<>(ApiCode.API_OK.code(), ApiCode.API_OK.getMsg(), object);
    }


    public static ApiResponse<Object> fail(ApiCode apiCode) {
        return new ApiResponse<>(apiCode.code(), apiCode.getMsg(), "");
    }
}
