package com.please.work.auth.mapper;

import com.please.work.auth.dto.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.Optional;

@Mapper
public interface UserMapper {


    // 사용자 ID로 조회
    @Select("SELECT * FROM users WHERE social_id = #{socialId}")
    Optional<User> findBySocialId(String socialId);

    // 사용자 정보 저장
//    @Insert("INSERT INTO users (social_id, password, email, name, phone_number, image_url, status) " +
//            "VALUES (#{socialId}, #{password}, #{email}, #{name}, #{phoneNumber}, #{imageUrl}, #{status})")
    void insertUser(User user);

}
