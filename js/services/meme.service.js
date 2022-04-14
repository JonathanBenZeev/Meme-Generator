'use strict'

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: [
        {
            id: makeId(),
            font: 'Impact',
            txt: 'Change text',
            size: 30,
            pos: 50,
            mark: '#ffffff40',
            align: 'center',
            color: 'white'
        },
    ]
}


function getMeme() {
    return gMeme
}

function getLineIdxById(lineId) {
    const lines = getLine()
    const lineIdx = lines.findIndex(line => lineId === line.id)
    return lineIdx
}

function getLine() {
    const lines = gMeme.lines
    return lines
}

function moveUp() {
    const lines = getLine()
    lines[gMeme.selectedLineIdx].pos -= 5
}
function moveDown() {
    const lines = getLine()
    lines[gMeme.selectedLineIdx].pos += 5
}

function addLine() {
    const lines = getLine()
    if (!lines.length) {
        var line = _createLine('Change text', 30, 50)
        lines.push(line)
    }
    else if (lines.length === 1) {
        var line = _createLine('Change text', 30, 450)
        lines.push(line)
        gMeme.selectedLineIdx = lines.length - 1
        lines[gMeme.selectedLineIdx - 1].mark = '#ffffff00'
    }
    else if (lines.length >= 2) {
        line = _createLine('Change text', 30, getRandomIntInclusive(100, 400))
        lines.push(line)
        gMeme.selectedLineIdx = lines.length - 1
        lines[gMeme.selectedLineIdx - 1].mark = '#ffffff00'

    }

}

function removeLine() {
    const lines = getLine()
    lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = lines.length - 1
    if (gMeme.selectedLineIdx < 0) return
    lines[gMeme.selectedLineIdx].mark = '#ffffff40'

}

function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt

}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setAlign(value) {
    gMeme.lines[gMeme.selectedLineIdx].align = value
}

function setTxtSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff < 10) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    // console.log(gMeme.lines[gMeme.selectedLineIdx].size);
}

function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function switchLines() {
    const lines = getLine()
    gMeme.selectedLineIdx--
    lines[gMeme.selectedLineIdx + 1].mark = '#ffffff00'
    if (gMeme.selectedLineIdx < 0) gMeme.selectedLineIdx = lines.length - 1
    lines[gMeme.selectedLineIdx].mark = '#ffffff40'
}

function setFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}



function _createLine(txt, size, pos) {
    return {
        id: makeId(),
        txt,
        size,
        pos,
        font: 'Impact',
        mark: '#ffffff40',
        align: 'center',
        color: 'white'
    }
}