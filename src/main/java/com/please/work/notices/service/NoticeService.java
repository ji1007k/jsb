package com.please.work.notices.service;

import com.please.work.common.utils.FileUtil;
import com.please.work.notices.controller.NoticeController;
import com.please.work.notices.dto.Notice;
import com.please.work.notices.mapper.NoticeMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class NoticeService {
    private final NoticeMapper noticeMapper;

    public NoticeService(NoticeMapper noticeMapper) {
        this.noticeMapper = noticeMapper;
    }

    public List<Notice> getAllNotices(String category, String keyword) {
        return noticeMapper.getAllNotices(category, keyword);
    }

    public Notice insertNotice(Notice notice, MultipartFile file) {
        String filePath = "";
        if (file != null && !file.isEmpty()) {
//            filePath = FileUtil.uploadFile(file);
            // TODO 첨부파일 정보 저장
            //  ...
        }

        noticeMapper.insertNotice(notice);
        return getNoticeById(notice.getId());
    }

    public Notice getNoticeById(Long id) {
        return noticeMapper.getNoticeById(id);
    }

    public Notice updateNotice(Notice notice, MultipartFile file) {
        // TODO 파일 업데이트 (기존파일 삭제 후 새로운 파일 저장)

        noticeMapper.updateNotice(notice);

        return getNoticeById(notice.getId());
    }

    public void deleteNoticeById(Long id) {
        noticeMapper.deleteNoticeById(id);
    }
}