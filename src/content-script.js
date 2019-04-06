console.log(`Here is`, document.URL);

const data = {
    targetText: undefined,
    trimmedText: undefined
};

try{
    data.targetText = document.childNodes[1].childNodes[2].childNodes[1].childNodes[0]
        .childNodes[2].childNodes[0].childNodes[0].childNodes[0].childNodes[0]
        .childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[3].innerText;
} catch(e) {
    console.log(e);
}

if (data.targetText) {
    data.trimmedText = trimHTMLEntities(data.targetText);
    console.log(data.trimmedText);
}

function trimHTMLEntities(target) {
    return target
        .replace(/&nbps;/g, ' ')    // nbsp 제거
        .replace(/\u00a0/g, " ") // nbsp 제거
        .replace(/[\u201C\u201D]/g, '"') // smart quote 를 straight quote 로 변경
        .replace(/[\u2018\u2019]/g, "'") // smart quote 를 straight quote 로 변경
}