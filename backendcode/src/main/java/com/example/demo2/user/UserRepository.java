package com.example.demo2.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(nativeQuery = true, value = "SELECT id,name FROM  user WHERE id between :lower and :upper")
    public List<User> findBetween(@Param("lower") Integer lower,
                            @Param("upper") Integer upper
                             );

}
