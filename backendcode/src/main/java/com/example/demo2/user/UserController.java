package com.example.demo2.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.*;
import org.apache.log4j.Logger;

import java.util.ArrayList;
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
        log.error("this is error test");
        log.debug("this is debug test");
        log.info("this is info test");
        log.warn("this is warn test");
        return this.userRepository.findAll();
    }


    @RequestMapping("/post")
    public Object saveUser(@RequestBody User user) {
        this.userRepository.save(user);
        return this.userRepository.findAll();
    }
    @RequestMapping("/delete")//删
    public Object delUser(@RequestParam("id") Integer id
    ) {
        this.userRepository.deleteById(id);
        return this.userRepository.findAll();
    }
    @RequestMapping("/filter")
    public List<User> getSome(@RequestParam("lower") Integer lower,@RequestParam("upper") Integer upper){
        return this.userRepository.findBetween(lower,upper);
    }




}
