package com.example.demo2.common;

import com.alibaba.fastjson.JSONObject;
import com.example.demo2.user.User;
import com.example.demo2.user.UserController;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.log4j.Logger;

@JsonPropertyOrder({"code", "msg", "user"})
public class ApiRequest {
    private boolean success;
    private User user;


    private static final Logger log = Logger.getLogger(UserController.class);

    public static ApiRequest parseUser(JSONObject requestData) {
        User user=new User();
        try {
            JSONObject jsonObj = requestData.getJSONObject("requestData").getJSONObject("msg");
            //int a=1/0;//2001
            user.setId(jsonObj.getInteger("id"));
            user.setName(jsonObj.getString("name").trim());
            user.setBirthday(jsonObj.getDate("birthday"));
        } catch (Exception e) {
            log.info("Parse user failed! "+e.toString());
            return new ApiRequest(false, user);
        }
        return new ApiRequest(true, user);
    }


    public ApiRequest(boolean success, User user) {
        this.success = success;
        this.user = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public User getUser() {
        return user;
    }

    public static Logger getLog() {
        return log;
    }
}

