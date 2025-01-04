package com.please.work.common.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

public class FileUtil {

    // 업로드할 파일을 저장할 디렉토리
    private static final String UPLOAD_DIR = "uploads/";

    // 파일을 업로드하는 메소드
    public static String uploadFile(MultipartFile file) throws IOException {
        // 파일 이름 설정
//        String fileName = file.getOriginalFilename();
        String fileName = generateUniqueFileName(file.getOriginalFilename());
        if (fileName == null || fileName.isEmpty()) {
            throw new IllegalArgumentException("파일 이름이 유효하지 않습니다.");
        }

        // 저장할 파일 경로
        Path path = Paths.get(UPLOAD_DIR + fileName);

        // 디렉토리가 없다면 생성
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // 파일을 저장
        Files.write(path, file.getBytes());

        return UPLOAD_DIR + fileName; // 업로드된 파일 이름 반환
    }

    public static String generateUniqueFileName(String originalFileName) {
        String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
        return UUID.randomUUID().toString() + extension; // 랜덤한 UUID를 파일 이름으로 사용
    }

    // 파일의 MIME 타입을 확인하는 메소드 (예시)
    public static boolean isValidFileType(MultipartFile file) {
        // MIME 타입을 확인하여 유효한 파일 유형인지 검사 (예: 이미지 파일만 허용)
        String mimeType = file.getContentType();
        return mimeType != null && mimeType.startsWith("image/");
    }

    // 파일이 유효한지 검사하는 메소드
    public static boolean isValidFile(MultipartFile file) {
        return file != null && !file.isEmpty() && isValidFileType(file);
    }

    // 파일을 삭제하는 메소드
    public static void deleteFile(String filePath) {
        try {
            Files.deleteIfExists(Paths.get(filePath));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
