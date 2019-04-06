const data = {
    targetText: undefined,
    trimmedText: undefined
};

(function () {
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

function onClickCheatBtn() {
    getTargetText(data);

    if (data.targetText) {
        data.trimmedText = trimHTMLEntities(data.targetText);
        console.log(data.trimmedText);
    }
}

function init() {
    getTargetText(data);
    let activeBtn = document.createElement(`span`);
    activeBtn.classList.add(`cheat-btn`);
    activeBtn.addEventListener(`click`, onClickCheatBtn);
    try{
        if(data.targetText){
            if (!document.querySelector(`.cheat-btn`))
            document.querySelector(`header`).childNodes[1].prepend(activeBtn);
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