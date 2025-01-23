package com.please.work.notices.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.please.work.notices.dto.Notice;
import com.please.work.notices.service.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jdk.jfr.Description;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping(value = "/notices")
@Tag(name = "공지사항 API", description = "공지사항 API 컨트롤러입니다.")
public class NoticeController {
    private static final Logger logger = LoggerFactory.getLogger(NoticeController.class);

    private final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    @GetMapping
    @Operation(summary = "공지사항 목록 조회", description = "전체 공지사항 목록을 조회합니다.")
    public ResponseEntity<List<Notice>> getAllNotices(@RequestParam(required = false) String category,
                                                      @RequestParam(required = false) String keyword) {

        List<Notice> notices = noticeService.getAllNotices(category, keyword);
        return ResponseEntity.ok(notices);
    }

    @PostMapping
    @Operation(summary = "공지사항 등록", description = "공지사항을 등록합니다.")
    public ResponseEntity<String> insertNotice(@RequestParam(value = "notice") String noticeJson,
                                               @RequestParam(value = "file", required = false)MultipartFile file) {

        try {
            ObjectMapper om = new ObjectMapper();
            Notice notice = om.readValue(noticeJson, Notice.class);
            noticeService.insertNotice(notice, file);
            return ResponseEntity.ok("공지사항 등록 성공");
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping(value = "/{id}")
    @Operation(summary = "공지사항 조회", description = "공지사항을 조회합니다.")
    public ResponseEntity<Notice> getNoticeById(@PathVariable Long id) {
        Notice notice = noticeService.getNoticeById(id);
        if (notice != null) {
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping(value = "/{id}")
    @Operation(summary = "공지사항 수정", description = "공지사항을 수정합니다.")
    public ResponseEntity<Notice> updateNotice(@PathVariable("id") Long id,
                                               @RequestParam(value="notice") String noticeJson,
                                               @RequestParam(value="file", required=false) MultipartFile file) {

        try {
            ObjectMapper om = new ObjectMapper();
            Notice notice = om.readValue(noticeJson, Notice.class);
            notice.setId(id);

            Notice updatedNotice = noticeService.updateNotice(notice, file);
            return ResponseEntity.ok(updatedNotice);
        } catch (JsonProcessingException e) {
            return ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping(value = "/{id}")
    @Operation(summary = "공지사항 삭제", description = "공지사항을 삭제합니다.")
    public ResponseEntity<String> deleteNotice(@PathVariable Long id) {
        try {
            noticeService.deleteNoticeById(id);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        return ResponseEntity.ok().build();
    }

}
