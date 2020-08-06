package com.example.demo2.common;

import com.alibaba.fastjson.JSONObject;
import com.example.demo2.user.User;
import com.example.demo2.user.UserController;
import org.apache.log4j.Logger;

public class ApiRequest {
    private static final Logger log = Logger.getLogger(UserController.class);

    public static User parseUser(JSONObject requestData) {
        User user=new User();
        try {
            JSONObject jsonObj = requestData.getJSONObject("requestData").getJSONObject("msg");
            user.setId(jsonObj.getInteger("id"));
            user.setName(jsonObj.getString("name").trim());
            user.setBirthday(jsonObj.getDate("birthday"));
        } catch (Exception e) {
            log.info("Parse user failed! "+e.toString());
        }
        return user;
    }
}

