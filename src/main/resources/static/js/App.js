import ItemList from "./items/itemList.js";

// App 클래스
export default class App {
    constructor() {
        console.log("App instance created");
    }

    // public 메서드 (JavaScript에서 클래스 메서드는 기본적으로 public 접근 수준)
    init() {
        console.log("App initialized");
        this.#privateMethod(); // 내부에서는 호출 가능

        const itemList = new ItemList();
    }

    // private 메서드
    #privateMethod() {
        console.log("This is a private method");
    }
}