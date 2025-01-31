package com.please.work.auth.service;

import com.please.work.auth.dto.User;
import com.please.work.auth.mapper.UserMapper;
import com.please.work.utils.RSAUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.security.KeyPair;
import java.security.PrivateKey;
import java.util.Optional;

@Service
public class UserService {

    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    // RSA 키 생성 후 공개키 반환
    public String generateRSAKeyPair(HttpSession session) throws Exception {
        KeyPair keyPair = RSAUtil.generateKeyPair();
        session.setAttribute("privateKey", RSAUtil.getPrivateKeyAsString(keyPair.getPrivate())); // 개인키 저장
        return RSAUtil.getPublicKeyAsString(keyPair.getPublic()); // 공개키 반환
    }

    // 회원가입 처리
    public String signUp(String encryptedUserId, String encryptedPassword, String email, String name, String phoneNumber, String imageUrl, HttpSession session) throws Exception {
        String privateKeyString = (String) session.getAttribute("privateKey");
        PrivateKey privateKey = RSAUtil.getPrivateKeyFromString(privateKeyString);

        // RSA 개인키로 복호화
        String userId = RSAUtil.decryptWithPrivateKey(encryptedUserId, privateKey);
        String password = RSAUtil.decryptWithPrivateKey(encryptedPassword, privateKey);

        // 사용자 ID 중복 체크
        Optional<User> existingUser = userMapper.findBySocialId(userId);
        if (existingUser.isPresent()) {
            return "User ID already exists";
        }

        // 비밀번호 Bcrypt로 암호화
        String hashedPassword = BCrypt.hashpw(password, BCrypt.gensalt());

        // 사용자 저장
        User user = new User();
        user.setSocialId(userId);
        user.setPassword(hashedPassword);
        user.setEmail(email);
        user.setName(name);
        user.setPhoneNumber(phoneNumber);
//        user.setImageUrl(imageUrl);
        user.setStatus("ACTIVE");

        userMapper.insertUser(user);

        return "User registration successful";
    }

    public User signIn(User user, HttpSession session) throws Exception {
        String privateKeyString = (String) session.getAttribute("privateKey");
        PrivateKey privateKey = RSAUtil.getPrivateKeyFromString(privateKeyString);

        String socialId = RSAUtil.decryptWithPrivateKey(user.getSocialId(), privateKey);
        String password = RSAUtil.decryptWithPrivateKey(user.getPassword(), privateKey);

        Optional<User> existingUser = userMapper.findBySocialId(socialId);

        // 비밀번호 확인
        if (!existingUser.isPresent() || !BCrypt.checkpw(password, existingUser.get().getPassword())) {
            throw new RuntimeException("Invalid user ID or password");
        }

        existingUser.get().setPassword(null); // 비밀번호 제거
        return existingUser.get();
    }
}
