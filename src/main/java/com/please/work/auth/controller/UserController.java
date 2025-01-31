package com.please.work.auth.controller;

import com.please.work.auth.dto.User;
import com.please.work.auth.service.UserService;
import com.please.work.utils.RSAUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.security.PrivateKey;
import java.util.Optional;

@Controller
@RequestMapping(value = "/auth")
public class UserController {
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value="/signup")
    public String goToSignUpPage() {
        return "auth/signUp";
    }

    @GetMapping(value="/signin")
    public String goToSignInPage() {
        return "auth/signIn";
    }

    // RSA 공개키 반환
    @PostMapping("/generate-rsa-keys")
    public ResponseEntity<String> generateRSAKeys(HttpSession session) throws Exception {
//        RecordELResolver recordELResolver = new RecordELResolver();

        return ResponseEntity.ok(userService.generateRSAKeyPair(session));
    }

    // 회원가입 처리
    @PostMapping("/sign-up")
    public String signUp(@RequestBody User user, HttpSession session) {
        try {
            userService.signUp(
                user.getSocialId(),
                user.getPassword(),
                user.getEmail(),
                user.getName(),
                user.getPhoneNumber(),
                user.getImageUrl(),
                session
            );
        } catch (Exception e) {
            // 세션에서 개인키 제거
            session.removeAttribute("privateKey");
            throw new RuntimeException(e);
        }

        return "redirect:/signin";
    }

    // 로그인 처리
    @PostMapping(value = "/sign-in")
    public String signIn(@RequestBody User user, HttpSession session){

        try {
            User signedInUser = userService.signIn(user, session);
            session.setAttribute("user", signedInUser);
            session.setAttribute("loginId", signedInUser.getSocialId());

            return "redirect:/";    // index 페이지로 이동
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // TODO Session already invalidated 처리
    @GetMapping(value = "/signout")
    public String signOut(HttpSession session) {
        // 세션 무효화
        session.invalidate();
        // 모든 사용자(세션)가 공유하는 데이터 변경할 때
//        session.getServletContext().setAttribute("data", null);

        return "redirect:/";
    }
}
