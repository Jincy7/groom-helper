console.log(`Here is`, document.URL);

const data = {
    targetText: undefined,
    trimmedText: undefined
};
// TODO Mutation observer 달아서 head 의 title 바뀔때 init 함수 호출하도록 구현

// TODO 버튼 클릭 이벤트 리스너로 넣기
(function () {
    try{
        data.targetText = document.childNodes[1].childNodes[2].childNodes[1].childNodes[0]
            .childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[3].innerText;
    } catch(e) {
        data.targetText = undefined;
        console.log(e);
    }

    if (data.targetText) {
        data.trimmedText = trimHTMLEntities(data.targetText);
        console.log(data.trimmedText);
    }
})();

// TODO init 함수로 만들기
(function () {
    let activeBtn = document.createElement(`span`);
    activeBtn.classList.add(`my-btn`);
    try{
        if(data.targetText){
            document.querySelector(`header`).childNodes[1].prepend(activeBtn);
        }
    }
    catch (e) {
        console.log(e);
    }
})();

function trimHTMLEntities(target) {
    return target
        .replace(/&nbps;/g, ' ')    // nbsp 제거
        .replace(/\u00a0/g, " ") // nbsp 제거
        .replace(/[\u201C\u201D]/g, '"') // smart quote 를 straight quote 로 변경
        .replace(/[\u2018\u2019]/g, "'") // smart quote 를 straight quote 로 변경
}