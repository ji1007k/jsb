package com.please.work.items.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@JsonIgnoreProperties(ignoreUnknown = true) // JSON에 포함된 필드만 객체에 매핑
@NoArgsConstructor
@Data
public class Item {
    @Schema(description = "아이템 ID", example = "1")
    private Long id;

    @Schema(description = "아이템 이름", example = "목도")
    private String name = "이름 없음";

    @Schema(description = "아이템 분류", example = "무기")
    private String category;

    @Schema(description = "내구성", example = "6000 / 6000 (100%)")
    private String durability;

    @Schema(description = "파괴력", example = "15m25")
    private String destruction;

    @Schema(description = "무장", example = "0")
    private Integer weapon;

    @Schema(description = "히트", example = "0")
    private Integer hit;

    @Schema(description = "데미지", example = "0")
    private Integer damage;

    @Schema(description = "직업", example = "공용")
    private String job;

    @Schema(description = "레벨 제한", example = "0")
    private String level;

    @Schema(description = "힘 제한", example = "10")
    private Integer strengthLimit;

    @Schema(description = "민첩 제한", example = "0")
    private Integer agilityLimit;

    @Schema(description = "지력 제한", example = "0")
    private Integer intellectLimit;

    @Schema(description = "수리 가능 여부", example = "true")
    private Boolean repairable;

    @Schema(description = "떨굼 가능 여부", example = "true")
    private Boolean dropable;

    @Schema(description = "거래 가능 여부", example = "true")
    private Boolean tradable;

    @Schema(description = "아이템 가격", example = "60")
    private Integer price;

    @Schema(description = "아이템 설명", example = "익숙해지기 위해 꽤 시간을 들여야 하는 무거운 목도")
    private String description;

    @Schema(description = "아이템 이미지 URL", example = "uploads/1f4a09db-8f07-4ee1-8c45-69dbf13b44f7.png")
    private String imageUrl;

    @Schema(description = "아이템 상태", example = "ACTIVE")
    private ItemStatus status;

    // 한국 표준시 (KST)에 맞춘 시간 처리 (타임존 정보를 신경쓰지 않음)
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @Schema(description = "아이템 생성일", example = "2025-01-03T12:30:00.000Z")
    private LocalDateTime createdDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
    @Schema(description = "아이템 수정일", example = "2025-01-03T12:30:00.000Z")
    private LocalDateTime updatedDate;

    @Schema(description = "아이템 생성자", example = "admin")
    private String createdBy;

    @Schema(description = "아이템 수정자", example = "admin")
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
