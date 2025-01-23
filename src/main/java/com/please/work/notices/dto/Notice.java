package com.please.work.notices.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Notice {
    @Schema(description = "공지사항 ID", example = "1")
    private Long id;

    @Schema(description = "제목", example = "업데이트 내용 공지")
    private String title;

    @Schema(description = "내용", example = "공지사항 내용입니다.")
    private String content;

    @Schema(description = "상태", example = "ACTIVE")
    private NoticeStatus status;

    @Schema(description = "생성자ID", example = "ADMIN")
    private String createdBy;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @Schema(description = "아이템 생성일", example = "2025-01-23T12:30:00.000Z")
    private Date createdDate;

    @Schema(description = "수정자ID", example = "ADMIN")
    private String updatedBy;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @Schema(description = "수정일자", example = "2025-01-23T16:30:00.000Z")
    private Date updatedDate;
}
