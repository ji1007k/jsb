
const variable = "test";

export default class ItemList {
    constructor() {
        console.log("ItemList instance created");
        console.log(variable);
        this.init();
    }

    // public 메서드
    init() {
        console.log("ItemList initialized");
        // fetch를 사용하여 static 폴더의 HTML 파일을 불러오기
        fetch('/html/items/item.html')  // static 파일 경로에서 html 파일 요청
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load HTML file');
                }
                return response.text();  // 응답을 HTML로 처리
            })
            .then(html => {
                // HTML을 페이지의 특정 요소에 삽입
                document.querySelector('.list-group').innerHTML = html;
                console.log(html);
            })
            .catch(error => {
                console.error('Error loading HTML:', error);
            });
    }
}