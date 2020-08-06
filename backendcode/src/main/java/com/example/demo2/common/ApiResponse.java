package com.example.demo2.common;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
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

    public static <T> ApiResponse<T> success(T object) {
        return new ApiResponse<>(ApiCode.API_OK.code(), ApiCode.API_OK.getMsg(), object);
    }

    public static <T>ApiResponse<T> requestFail(T object) {
        return new ApiResponse<>(ApiCode.API_INVALID_USER.code(), ApiCode.API_INVALID_USER.getMsg(), object);
    }

    public static <T>ApiResponse<T> responseFail(T object) {
        return new ApiResponse<>(ApiCode.API_FAILED.code(), ApiCode.API_FAILED.getMsg(), object);
    }
}
