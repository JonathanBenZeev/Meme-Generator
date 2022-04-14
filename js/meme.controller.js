'use strict'

var gElCanvas;
var gCtx;

function initMeme() {
    gElCanvas = document.querySelector('#canvas');
    gCtx = gElCanvas.getContext('2d');

    renderMeme()
    // renderController()

}


function renderMeme() {
    const meme = getMeme()
    const lines = meme.lines
    var img = new Image()
    img.src = `meme-imgs/${meme.selectedImgId}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        for (var i = 0; i < lines.length; i++) {

            drawText(lines[i].txt, gElCanvas.width / 2, lines[i].pos, lines[i].size, lines[i].align, lines[i].color)
            drawRect(40, lines[i].pos - 25, lines[i].mark)
        }

    }

}

function renderController() {
    const memes = getMeme()
    const lines = memes.lines
    var strHtmls = lines.map(line => `
    <label>
    Change text
    <input class="txt-change" type="text" placeholder="change text" maxlength="15"
        oninput="onSetLineTxt('${line.id}')" />
</label>
<label>
    color
    <input class="color-change" type="color" oninput="onSetLineColor('${line.id}')" />
</label>
<div><button class="btn-increase" onclick="onSetTxtSize(10,'${line.id}')"><img
            src="/ICONS/increase font - icon.png" alt=""></button>
    <button class="btn-decrease" onclick="onSetTxtSize(-10,'${line.id}')"><img
            src="/ICONS/decrease font - icon.png" alt="" /></button>
    <button class="btn-switch" onclick="onSwitchLines(1,'${line.id}')"><img
            src="/ICONS/up-and-down-opposite-double-arrows-side-by-side.png" alt=""></button>
    <button class="btn-add" onclick="onAddLine('${line.id}')"><img src="/ICONS/add.png" alt=""></button>
    <button class="btn-remove" onclick="onRemoveLine('${line.id}')"><img src="/ICONS/trash.png" alt=""></button>
    <button class="btn-up" onclick="onMoveUp('${line.id}')">⬆</button>
    <button class="btn-down" onclick="onMoveDown('${line.id}')">⬇</button>
</div>
        `
    )
    document.querySelector('.editor').innerHTML = strHtmls.join('')


}

function onSwitchLines(value) {
    switchLines(value)
    renderMeme()
}

function onMoveUp() {
    moveUp()
    renderMeme()
}
function onMoveDown() {
    moveDown()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}

function onSetLineTxt(lineId) {
    const txt = document.querySelector('.txt-change').value
    var lineIdx = getLineIdxById(lineId)
    setLineTxt(txt, lineIdx)
    renderMeme()
}

function onSetLineColor(lineId) {
    const color = document.querySelector('.color-change').value
    // var line = getLineById(lineId)
    // console.log('line', line)
    setLineColor(color)
    renderMeme()

}

function onSetAlign(value) {
    setAlign(value)
    renderMeme()

}

function onSetTxtSize(diff) {
    setTxtSize(diff)
    renderMeme()
}

function drawRect(x, y, color) {
    gCtx.rect(x, y, 450, 50);
    gCtx.fillStyle = color;
    gCtx.fillRect(x, y, 450, 50);
    gCtx.strokeStyle = '#ffffff00';
    gCtx.stroke();
}

function removeDrawRect(x, y) {
    gCtx.rect(x, y, 0, 0);
    gCtx.fillStyle = 'white';
    gCtx.fillRect(x, y, 0, 0);
    gCtx.strokeStyle = 'white';
    gCtx.stroke();
}

function drawText(txt, x, y, size, align, color) {
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = align
    gCtx.lineWidth = 2
    gCtx.fillStyle = color
    gCtx.font = `${size}px Impact`
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'black'
    gCtx.strokeText(txt, x, y)

}