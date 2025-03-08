import ItemDetail from './itemDetail.js';
import ItemAdd from './ItemAdd.js';
import * as UIUtil from "../utils/UIUtil.js";

// 컴포 초기화해도 유지됨
const searchOption = {
    category: '무기',
}

/**
 * 아이템 목록
 */
export default class ItemList {
    COMPONENT_AREA = document.querySelector('#item-area');

    constructor() {
        console.log("ItemList instance created");
        this.init();
    }

    show() {
        UIUtil.show(this.COMPONENT_AREA);
    }

    // public 메서드
    async init() {
        await this.#initPage();
        this.initData();

        console.log("ItemList initialized");
    }

    async #initPage() {
        await this.loadHtml();
        await this.initEvent();
    }

    async loadHtml() {
        try {
            await this.loadListHtml();
        } catch (error) {
            console.error("Error loading HTML:", error);
        }
    }

    async loadListHtml() {
        try {
            const response = await fetch('/static/html/items/itemList.html');
            if (!response.ok) {
                throw new Error('Failed to load HTML file');
            }
            const html = await response.text();

            // HTML 문자열을 DocumentFragment로 변환
            const range = document.createRange();
            const fragment = range.createContextualFragment(html);

            // 변환된 fragment의 첫 번째 자식 요소를 선택
            const elementToInsert = fragment.firstElementChild;

            // 특정 위치에 element를 삽입
            // 여기서 'beforeend'로 삽입할 경우, targetElement 내부의 마지막 자식으로 삽입
            this.COMPONENT_AREA.innerHTML = '';
            this.COMPONENT_AREA.insertAdjacentElement('beforeend', elementToInsert);
        } catch (error) {
            console.error('Error loading HTML:', error);
        }
    }

    initEvent() {

        // TODO 검색 옵션 스타일 수정 (활성화/비활성화)
        // 검색
        const optionBtns = document.querySelectorAll(".search-options .badge-btn");
        optionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 모든 버튼에서 active 클래스 제거
                optionBtns.forEach((btn) => btn.classList.remove("active"));
                // 클릭된 버튼에 active 클래스 추가
                e.target.classList.add("active");

                searchOption.category = btn.innerText;
                this.initData();
            });
        });

        // 아이템 등록
        document.querySelector("#item-add-btn").addEventListener('click', () => {
            new ItemAdd(this);
        });
    }


    initData() {
        const targetElement = document.getElementById('item-card-list');
        targetElement.innerHTML = '';

        this.getDatas().then(datas => {
            console.log(datas);

            if (!datas.length) {
                console.log("No data");
                return;
            }

            this.drawDataList(datas, targetElement);
        }).catch(error => {
            console.error(error);
        });
    }

    async getDatas() {
        const queryString = new URLSearchParams(searchOption).toString();

        try {
            const response = await fetch(`/items?${queryString}`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Failed to load data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            return [];
        }
    }

    drawDataList(datas, targetElement) {
        datas.forEach(data => {
            drawData.bind(this)(data);
        });


        function drawData(data) {
            const el = UIUtil.append(makeItemCardHtml(), targetElement);
            setItemCardEvent.bind(this)();


            function makeItemCardHtml() {
                return `
                <div class="item-card">
                    <!-- 아이템 이미지 -->
                    <div class="text-center my-3 item-image">
                        <img src="${data.imageUrl}" alt="${data.name}">
                        <div class="item-name">${data.name}</div>
                        <div class="level-limit text-muted">Lv.${data.level}</div>
                    </div>
            
                    <!-- 아이템 정보 -->
                    <div class="item-info px-2">
<!--                        <h5>아이템 정보</h5>-->
                        <p class="text-muted">내구성: ${data.durability}</p>
                        <p class="text-muted">파괴력: ${data.destruction}</p>
                        <p class="text-muted">직업 제한: ${data.job}</p>
            
                        <div class="mt-3">
                            <button class="btn btn-outline-primary show-info">상세 보기</button>
                            <button class="btn btn-outline-secondary trade">거래하기</button>
                        </div>
                    </div>
            
                    <!-- 드랍 몬스터 -->
                    <div class="monster-list mx-3">
                        <div class="section-title">드랍 몬스터</div>
                        <div class="row mt-3">
                            <!-- 몬스터 사진 -->
                            <div class="col">
                                <div class="monster-card">
                                    <img src="https://homsuwixxppzxjkr.public.blob.vercel-storage.com/monsters/9e2e28c5-c0dc-40ef-9c17-2025a1566fd1-9OsUjJAK8R1AROWTVFzNLGvKpCWUZd.gif" alt="적호" class="monster-image">
                                    <small>적호</small>
                                </div>
                            </div>
                            <div class="col">
                                <div class="monster-card">
                                    <img src="https://homsuwixxppzxjkr.public.blob.vercel-storage.com/monsters/ab72f155-aa34-4fb4-a586-70a36dbc25d3-sGdHsZTBvfJD1JqxTCmJLwIrRjhSyt.gif" alt="칼든해골" class="monster-image">
                                    <small>칼든해골</small>
                                </div>
                            </div>
                            <div class="col">
                                <div class="monster-card">
                                    <img src="https://homsuwixxppzxjkr.public.blob.vercel-storage.com/monsters/60a163c9-9811-46e8-9842-c336af19be36-32r23G5YRqexyzYhpSpIOA2gpzVI8w.gif" alt="중급유령" class="monster-image">
                                    <small>중급유령</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
            }

            function setItemCardEvent() {
                el.querySelector('.show-info')
                    .addEventListener('click', async () => {
                        const latestData = await this.findDataById(data.id);
                        new ItemDetail(latestData, this);
                    });
            }
        }
    }

    async findDataById(id) {
        try {
            const response = await fetch(`/items/${id}`, {
                method: 'GET',  // HTTP 메소드 지정
            });

            if (!response.ok) {
                throw new Error('Failed to load data');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading data:', error);
            throw error;
        }
    }


}
