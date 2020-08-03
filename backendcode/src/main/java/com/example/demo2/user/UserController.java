package com.example.demo2.user;

import com.alibaba.fastjson.JSON;
import com.mysql.cj.x.protobuf.MysqlxExpr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;
import org.apache.log4j.Logger;
import com.alibaba.fastjson.JSONObject;

import javax.xml.crypto.Data;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger log = Logger.getLogger(UserController.class);
    @Autowired
    private UserRepository userRepository;

    //查
    @RequestMapping("/query")
    public List<User> getList() {
        return this.userRepository.findAll();
    }


    @RequestMapping("/post")
    public Object saveUser(@RequestBody JSONObject requestData) {
        User user = parseUser(requestData);
        this.userRepository.save(user);
        return this.userRepository.findAll();
    }

    @RequestMapping("/delete")//删
    public Object delUser(@RequestBody JSONObject requestData) {
        User user = parseUser(requestData);
        this.userRepository.delete(user);
        return this.userRepository.findAll();
    }

    @RequestMapping("/filter")
    public List<User> getSome(@RequestParam("lower") Integer lower, @RequestParam("upper") Integer upper) {
        return this.userRepository.findBetween(lower, upper);
    }

    private User parseUser(JSONObject requestData) {
        User user=new User();
        JSONObject jsonObj = requestData.getJSONObject("requestData").getJSONObject("msg");

        if (jsonObj.containsKey("id")) {
            Integer id = jsonObj.getInteger("id");
            user.setId(id);
        }else {
            log.warn("No user id!");
        }
        if (jsonObj.containsKey("name")) {
            String name = jsonObj.getString("name");
            user.setName(name);
        }else {
            log.warn("No user name!");
        }
        if (jsonObj.containsKey("birthday")) {
            Date birthday = jsonObj.getDate("birthday");
            if (birthday.after(new Date())) {
                log.warn("Invalid birthday!");
            }
            user.setBirthday(birthday);
        }else {
            log.warn("No user birthday!");
        }
        return user;
    }

}
