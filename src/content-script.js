const data = {
    targetText: undefined,
    trimmedText: undefined
};

// 최초 로딩, 텍스트 영역 초기화.
(function () {
    appendTextArea();
    init();
    const targetHead = document.querySelector(`title`);
    let observer = new MutationObserver(() => {
        init();
    });
    const config = {
        attributes: true,
        childList: true,
        characterData: true
    };
    observer.observe(targetHead, config);
})();

// 단순 토글만 하고 init 으로 기능 이전.
function onClickCheatBtn() {
    // getTargetText(data);
    //
    // if (data.targetText) {
    //     data.trimmedText = trimHTMLEntities(data.targetText);
    //     data.textareaEl.innerText = data.trimmedText;
    //     // CopyToClipboard(data.textareaEl);
    //     copyStringToClipboard(data.trimmedText);
    //     // console.log(data.trimmedText);
    // }
    data.snippetEl.classList.toggle(`hidden`);
}

function init() {
    getTargetText(data);
    let activeBtn = document.createElement(`span`);
    activeBtn.classList.add(`cheat-btn`);
    activeBtn.addEventListener(`click`, onClickCheatBtn);
    try{
        if(data.targetText){
            if (!document.querySelector(`.cheat-btn`)){
                document.querySelector(`header`).childNodes[1].prepend(activeBtn);
            }
            data.trimmedText = trimHTMLEntities(data.targetText);
            data.textareaEl.innerText = data.trimmedText;
        }
    }
    catch (e) {
        console.log(e);
    }
}

function getTargetText(data) {
    try{
        data.targetText = document.childNodes[1].childNodes[2].childNodes[1].childNodes[0]
            .childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[3].innerText;
    } catch(e) {
        data.targetText = undefined;
        console.log(e);
    }
}

function trimHTMLEntities(target) {
    return target
        .replace(/&nbps;/g, ' ')    // nbsp 제거
        .replace(/\u00a0/g, " ") // nbsp 제거
        .replace(/[\u201C\u201D]/g, '"') // smart quote 를 straight quote 로 변경
        .replace(/[\u2018\u2019]/g, "'") // smart quote 를 straight quote 로 변경
}

function appendTextArea() {
    let snippetContainerEl = document.createElement(`div`);
    snippetContainerEl.innerHTML = `
    <div class="snippet">
    <header>
        프로그래밍 입문 도우미
        <span class="close-btn"></span>
    </header>
    <article>
        <div class="textarea"></div>
    </article>
    <footer>
        © 2019 <a href="https://github.com/Jincy7">https://github.com/Jincy7</a> All Rights Reserved
    </footer>
</div>
    `;
    data.snippetEl = snippetContainerEl;
    data.textareaEl = snippetContainerEl.querySelector(`.textarea`);
    document.body.appendChild(snippetContainerEl);
}

function copyStringToClipboard (str) {
    let el = document.createElement(`textarea`);
    el.value = str;
    el.setAttribute(`readonly`, ``);
    el.style = {position: `absolute`, left: `-9999px`};
    document.body.appendChild(el);
    el.select();
    document.execCommand(`copy`);
    document.body.removeChild(el);
    alert(`복사되었습니다! 입력란에 붙여넣기 해보세요!`);
}