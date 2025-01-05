package com.please.work.items.service;

import com.please.work.common.utils.FileUtil;
import com.please.work.items.dto.Item;
import com.please.work.items.mapper.ItemMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ItemService {

    private final ItemMapper itemMapper;

    public ItemService(ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    // 모든 Item 조회
    public List<Item> findAll(String category) {
        return itemMapper.findAll(category);
    }

    // Item 조회
    public Item findById(Long id) {
        return itemMapper.findById(id);
    }

    // Item 추가
    @Transactional
    public Item insertItem(Item item, MultipartFile file) throws IOException {
        String filePath = "";
        try {
            if (file != null && !file.isEmpty()) {
                // 파일 업로드 후 경로를 imageUrl에 설정
                filePath = FileUtil.uploadFile(file);
                item.setImageUrl(filePath); // imageUrl 필드에 파일 경로 설정
            }

            itemMapper.insertItem(item);    // 인서트 후 자동으로 생성된 id가 item에 담김
            return itemMapper.findById(item.getId());
        } catch (Exception e) {
            if (filePath != null) {
                FileUtil.deleteFile(filePath);
            }
            throw e;
        }
    }

    // Item 업데이트
    @Transactional
    public Item updateItem(Item item, MultipartFile file) throws IOException {
        String tempFilePath = null; // 임시로 업로드한 파일 경로
        String oldFilePath = null; // 이전 파일 경로 (롤백 시 삭제하지 않도록)

        try {
            // 1. 기존 아이템 정보 조회
            Item oldItem = findById(item.getId());
            oldFilePath = oldItem.getImageUrl();

            // 2. 파일 업로드 처리
            if (file != null && !file.isEmpty()) {
                tempFilePath = FileUtil.uploadFile(file); // 새 파일 업로드
                item.setImageUrl(tempFilePath); // 아이템에 새 이미지 경로 설정
            }

            // 3. 아이템 정보 업데이트(DB 작업)
            itemMapper.updateItem(item);

            // 4. 정상 완료 후 이전 파일 삭제
            if (oldFilePath != null && !oldFilePath.isEmpty()) {
                FileUtil.deleteFile(oldFilePath);
            }

            return itemMapper.findById(item.getId());
        } catch (Exception e) {
            // 에러 발생 시 업로드된 새 파일 삭제
            if (tempFilePath != null) {
                FileUtil.deleteFile(tempFilePath);
            }
            throw e; // 예외를 다시 던져 트랜잭션 롤백
        }
    }

    // Item 삭제
    @Transactional
    public void deleteById(Long id) {
        String filePath = "";

        try {
            Item item = findById(id);
            filePath = item.getImageUrl();

            itemMapper.deleteById(id);

            // 정보 정상 삭제 후 파일 삭제
            if (filePath != null && !filePath.isEmpty()) {
                FileUtil.deleteFile(filePath);
            }
        } catch (Exception e) {
            throw e;
        }
    }

}
