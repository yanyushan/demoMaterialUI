package com.example.demo2.user;

import com.alibaba.fastjson.JSON;
import com.example.demo2.common.ApiResponse;
import com.example.demo2.common.ApiRequest;
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
import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {
    private static final Logger log = Logger.getLogger(UserController.class);
    @Autowired
    private UserRepository userRepository;

    //查
    @RequestMapping("/query")
    public ApiResponse<List<User>> getList() {
        return ApiResponse.success(userRepository.findAll());
    }

    @RequestMapping("/post")
    public ApiResponse<User> saveUser(@RequestBody JSONObject requestData) {
        @Valid User user = ApiRequest.parseUser(requestData);
        this.userRepository.save(user);
        return ApiResponse.success(user);
    }

    @RequestMapping("/delete")//删
    public ApiResponse<User> delUser(@RequestBody JSONObject requestData) {
        User user = ApiRequest.parseUser(requestData);
        this.userRepository.delete(user);
        return ApiResponse.success(user);
    }

    @RequestMapping("/filter")
    public ApiResponse<List<User>> getSome(@RequestParam("lower") Integer lower, @RequestParam("upper") Integer upper) {
        return ApiResponse.success(userRepository.findBetween(lower, upper));
    }


}
