package com.please.work.index.controller;

import com.please.work.auth.dto.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

@Slf4j
@Controller
@Tag(name = "인덱스 API", description = "컨트롤러에 대한 설명입니다.")
public class IndexController {

    @Operation(summary = "인덱스 페이지로 이동")
    @GetMapping(value = {"/", "/index"})
//    public String index(Model model, HttpSession session) {
    public String index(Model model, @SessionAttribute(name = "user", required = false) User user) {
        log.info("Index page accessed");
        model.addAttribute("message", "Hello, World!");
        model.addAttribute("user", user);
//        model.addAttribute("user", session.getAttribute("user"));
        return "main/index";
    }

}
