package com.please.work.items.mapper;

import com.please.work.items.dto.Item;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ItemMapper {

    // 모든 Item 조회
//    @Select("SELECT * FROM items ORDER BY id, category")
    List<Item> findAll(@Param("category") String category);

    // Item 조회. @Param을 사용하여 파라미터 명시
    @Select("SELECT * FROM items WHERE id = #{id}")
//    @Options(useCache = true)
    Item findById(@Param("id") Long id);

    // Item 추가
    int insertItem(Item item);

    // Item 업데이트
    int updateItem(Item item);

    // Item 삭제
    int deleteById(@Param("id") Long id);
}
