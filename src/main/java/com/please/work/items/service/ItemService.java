package com.please.work.items.service;

import com.please.work.items.dto.Item;
import com.please.work.items.mapper.ItemMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Item insertItem(Item item) {
        itemMapper.insertItem(item);    // 인서트 후 자동으로 생성된 id가 item에 담김
        return itemMapper.findById(item.getId());
    }

    // Item 업데이트
    @Transactional
    public Item updateItem(Item item) throws IOException {
        itemMapper.updateItem(item);
        return itemMapper.findById(item.getId());
    }

    // Item 삭제
    public int deleteById(Long id) {
        return itemMapper.deleteById(id);
    }

}
