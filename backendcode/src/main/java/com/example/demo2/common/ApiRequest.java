package com.example.demo2.common;

import com.alibaba.fastjson.JSONObject;
import com.example.demo2.user.User;
import com.example.demo2.user.UserController;
import org.apache.log4j.Logger;

import java.util.Date;

public class ApiRequest {
    private static final Logger log = Logger.getLogger(UserController.class);

    public static User parseUser(JSONObject requestData) {
        JSONObject jsonObj = requestData.getJSONObject("requestData").getJSONObject("msg");

        Integer id = jsonObj.getInteger("id");
        String name = jsonObj.getString("name");
        Date birthday = jsonObj.getDate("birthday");
        if (birthday.after(new Date())) {
            log.warn("Invalid birthday!");
        }

        return new User(id,name,birthday);
    }
}

