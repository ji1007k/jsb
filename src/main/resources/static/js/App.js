import * as UIUtil from "./utils/UIUtil.js";
import ItemList from "./items/itemList.js";
import NoticeList from "./notices/noticeList.js";

// App 클래스
export default class App {
    activeNavItem = new ItemList(); // 기본 활성화 메뉴 : 아이템 목록

    constructor() {
        console.log("App instance created");
    }

    // public 메서드 (JavaScript에서 클래스 메서드는 기본적으로 public 접근 수준)
    init() {
        console.log("App initialized");
        this.#privateMethod(); // 내부에서는 호출 가능
        this.initNavigationEvent();

    }

    // private 메서드
    #privateMethod() {
        console.log("This is a private method");
    }

    initNavigationEvent() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                console.log(item.id);

                // 화면 초기화
                UIUtil.hide(document.querySelectorAll('.list-group'));
                UIUtil.removeChildren(document.querySelectorAll('.list-group'));

                if (item.id === 'nav-item-home') {
                    console.log("Home clicked");
                    document.href = "/"; // 홈으로 이동
                } else if (item.id === 'nav-item-items') {
                    this.activeNavItem = new ItemList();
                } else if (item.id === 'menu-item-notices') {
                    this.activeNavItem = new NoticeList();
                }

                this.activeNavItem.show();
            });
        });
    }
}