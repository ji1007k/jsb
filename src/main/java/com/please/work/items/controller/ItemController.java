package com.please.work.items.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.please.work.common.utils.FileUtil;
import com.please.work.items.dto.Item;
import com.please.work.items.service.ItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor    // 생성자를 통한 필수 의존성 주입 코드 생략 가능
@Tag(name = "아이템 API", description = "컨트롤러에 대한 설명입니다.")
@RequestMapping("/items")
public class ItemController {

    private final ItemService itemService;

    /**
     * 생성자를 통한 필수 의존성 주입 (최신 트렌드)
     */
    /*public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }*/

    // 모든 아이템 조회
    @Operation(summary = "모든 아이템 조회", description = "모든 아이템을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<Item>> findAll(@RequestParam(required = false) String category) {
        List<Item> items = itemService.findAll(category);
        return ResponseEntity.ok(items);
    }

    // 아이템 ID로 조회
    @Operation(summary = "아이템 조회", description = "파라미터로 받은 id에 해당하는 아이템을 조회합니다.")
    @Parameter(name = "id", description = "조회할 아이템 ID", required = true)
    @GetMapping("/{id}")
    public ResponseEntity<Item> findById(@PathVariable Long id) {
        Item item = itemService.findById(id);
        if (item != null) {
            return ResponseEntity.ok(item);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 아이템 삽입
    // 요청 본문에 JSON 형식으로 아이템 데이터를 받을 때 @RequestBody를 사용
    @Operation(summary = "아이템 삽입", description = "아이템을 삽입합니다.")
    @Parameters({
            @Parameter(name = "name", description = "이름", example = "아이템 이름"),
            @Parameter(name = "description", description = "설명", example = "아이템 설명"),
            @Parameter(name = "price", description = "가격", example = "0"),
            @Parameter(name = "category", description = "분류", example = "무기"),
            @Parameter(name = "createdBy", description = "등록자", example = "JIKIM")
    })
//    @PatchMapping(value = "/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @PostMapping("/")
    public ResponseEntity<String> insertItem(@RequestParam("item") String itemJson,
                                           @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Item item = objectMapper.readValue(itemJson, Item.class);

            itemService.insertItem(item, file);
            return ResponseEntity.ok("아이템 등록 성공");
        } catch (JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @Operation(summary = "아이템 업데이트", description = "아이템을 업데이트합니다.")
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable String id,
                                           @RequestParam("item") String itemJson,
                                           @RequestParam(value = "file", required = false) MultipartFile file) {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            Item item = objectMapper.readValue(itemJson, Item.class);
            item.setId(Long.parseLong(id));

            Item updatedItem = itemService.updateItem(item, file);
            return ResponseEntity.ok(updatedItem);
        } catch (IOException e) {   // JSON 파싱 실패
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        } catch (Exception e) { // 기타 예외
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // TODO
    @Operation(summary = "아이템 삭제", description = "아이템을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable Long id) {
        itemService.deleteById(id);
        return ResponseEntity.ok("아이템 삭제 성공");
    }
}
