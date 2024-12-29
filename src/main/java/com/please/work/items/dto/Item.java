package com.please.work.items.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;

@Data
public class Item {
    private Long id;
    @Schema(description = "이름", example = "목도")
    private String name;
    @Schema(description = "설명", example = "가장 기본적인 무기이지만 풍진목을 구하여 대장간에 가면 목도'참으로 강화 가능")
    private String description;
    @Schema(description = "가격", example = "10")
    private Double price;
    @Schema(description = "분류", example = "무기")
    private String category;
    private String thumbnail;
    @Schema(description = "상태", example = "ACTIVE")
    private ItemStatus status;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String createdBy;
    private String updatedBy;


    // 추후 JPA 사용 시 아래 코드 활성화
    /*@PrePersist
    public void prePersist() {
        this.createdDate = LocalDateTime.now();  // 생성 시 createdDate 자동 설정
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedDate = LocalDateTime.now();  // 수정 시 updatedDate 자동 설정
    }*/
}
