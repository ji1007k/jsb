package com.please.work.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    private String socialId;        // 소셜 ID
    private String password;        // 암호화된 비밀번호
    private String name;            // 사용자 이름
    private String email;           // 이메일
    private String imageUrl;        // 이미지
    private String phoneNumber;     // 전화번호
    private String socialType;      // 소셜 타입 (default: local)
    private String status;          // 계정 상태 (default: ACTIVE)

    // getters and setters
}

