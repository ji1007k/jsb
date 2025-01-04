/**
 * 아이템 관련 HTML을 생성 함수
 */

// 아이템 수정화면 HTML
export function makeItemUptHtml() {
    return `
    <div class="w-100 bg-opacity-70 p-0 rounded-lg">
        <table class="table table-borderless mb-0 align-middle text-white">
            <thead>
                <colgroup>
                    <col style="width: 20%">
                    <col style="width: 30%">
                    <col style="width: 20%">
                    <col style="width: 30%">
                </colgroup>
            </thead>
            <tbody>
                <tr>
                    <td><label for="name" class="">이름</label></td>
                    <td colspan="3"><input type="text" class="form-control" id="name" name="name" value="목도"></td>
                </tr>
                <tr>
                    <td><label for="durability" class="">내구성</label></td>
                    <td colspan="3"><input type="text" class="form-control" id="durability" name="durability" value="1000 / 1000 (100%)"></td>
                </tr>
                <tr>
                    <td><label for="destruction" class="">파괴력</label></td>
                    <td colspan="3"><input type="text" class="form-control" id="destruction" name="destruction" value="S: 5m10, L: 5m10"></td>
                </tr>
                <tr>
                    <td><label for="weapon" class="">무장</label></td>
                    <td><input type="number" class="form-control" id="weapon" name="weapon" value="0"></td>
                    <td><label for="hit" class="">Hit</label></td>
                    <td><input type="number" class="form-control" id="hit" name="hit" value="0"></td>
                </tr>
                <tr>
                    <td><label for="dam" class="">Dam</label></td>
                    <td><input type="number" class="form-control" id="dam" name="dam" value="0"></td>
                    <td><label for="job" class="">직업</label></td>
                    <td><input type="text" class="form-control" id="job" name="job" value="공용"></td>
                </tr>
                <tr>
                    <td><label for="level" class="">레벨</label></td>
                    <td><input type="text" class="form-control" id="level" name="level" value="0"></td>
                    <td><label for="strengthLimit" class="">힘 제한</label></td>
                    <td><input type="number" class="form-control" id="strengthLimit" name="strengthLimit" value="0"></td>
                </tr>
                <tr>
                    <td><label for="agilityLimit" class="">민첩 제한</label></td>
                    <td><input type="number" class="form-control" id="agilityLimit" name="agilityLimit" value="0"></td>
                    <td><label for="intellectLimit" class="">지력 제한</label></td>
                    <td><input type="number" class="form-control" id="intellectLimit" name="intellectLimit" value="0"></td>
                </tr>
                <tr>
                    <td><label for="repairable" class="">수리</label></td>
                    <td>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="repairable" name="repairable">
                          <label class="form-check-label" for="repairable"></label>
                        </div>
                    </td>
                    <td><label for="dropable" class="">떨굼</label></td>
                    <td>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="dropable" name="dropable">
                          <label class="form-check-label" for="dropable"></label>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td><label for="tradable" class="">거래</label></td>
                    <td>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" id="tradable" name="tradable">
                          <label class="form-check-label" for="tradable"></label>
                        </div>
                    </td>
                    <td><label for="price" class="">가격</label></td>
                    <td><input type="number" class="form-control" id="price" name="price" value="10"></td>
                </tr>
                <tr>
                    <td colspan="4">
                        <label for="description" class="form-label">설명</label>
                        <textarea class="form-control" id="description" name="description" rows="3">가장 기본적인 무기이지만 풍진목을 구하여 대장간에 가면 목도'참으로 강화 가능</textarea>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    `;
}

// 아이템 상세 HTML
export function makeItemDtlHtml(data) {
    return `
    <div class="w-100 bg-primary bg-opacity-70 p-4 rounded-lg">
        <div class="text-white">
            <p class="fs-4">${data.name}</p>
    
            <!-- 상세 보기 정보 -->
            <div id="item-details">
                <div class="mt-3 d-flex justify-content-between">
                    <p>내구성:</p><p>${data.durability}</p>
                </div>
                <div class="mt-3">
                    <div class="d-flex justify-content-between">
                        <p>파괴력</p><p>${data.destruction}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p></p><p>${data.destruction}</p>
                    </div>
                </div>
    
                <div class="d-flex justify-content-between mt-3">
                    <p>무장: ${data.weapon}</p>
                    <p>Hit: ${data.hit}</p>
                    <p>Dam: ${data.damage}</p>
                </div>
    
                <div class="mt-3">
                    <div class="d-flex justify-content-between">
                        <p>직업:</p><p>${data.job}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>레벨:</p><p>${data.level}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>힘 제한:</p><p>${data.strengthLimit}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>민첩 제한:</p><p>${data.agilityLimit}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                        <p>지력 제한:</p><p>${data.intellectLimit}</p>
                    </div>
                </div>
    
                <div class="mt-3">
                    <p>수리: ${data.repairable}</p>
                    <p>떨굼: ${data.dropable}</p>
                    <p>거래: ${data.tradable}</p>
                </div>
    
                <div class="mt-3">
                    <p>가격: ${data.price}전</p>
                </div>
    
                <div class="mt-3">
                    <p>${data.description}</p>
                </div>
            </div>
        </div>
    </div>
    `;
}