package com.please.work.notices.mapper;

import com.please.work.notices.dto.Notice;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface NoticeMapper {
    List<Notice> getAllNotices(@Param("category") String category,
                               @Param("keyword") String keyword);

    void insertNotice(Notice notice);

    @Select("SELECT * FROM notices WHERE 1=1 AND id = #{id}")
    Notice getNoticeById(@Param("id") Long id);

    void updateNotice(Notice notice);

    @Delete("DELETE FROM notices WHERE 1=1 AND id = #{id}")
    void deleteNoticeById(@Param("id") Long id);

}
