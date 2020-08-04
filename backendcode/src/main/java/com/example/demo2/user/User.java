package com.example.demo2.user;


import lombok.*;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;

import javax.persistence.*;
import java.util.Date;

@Table(name = "user")
@Entity
@Data
@ToString
@Accessors(chain = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private Date birthday;

    public Integer getId() {
        return id;
    }


    public String getName() {
        return name;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public User() {
    }

    public User(Integer id, String name, Date birthday) {
        this.id = id;
        this.name = name;
        this.birthday = birthday;
    }
}