function undoublespacer() {
    var textarea = document.createElement('textarea');
    textarea.setAttribute('contextMenu', 'thecontextmenu');
    var badRegExp = /([.?!:;]) ( +)/;
    var reminder = (42674068).toString(36).toUpperCase();
    function replacer(match) {
        return match[1] + ' ' + reminder + '! ';
    }
    function fixSelection(i, matchStart, matchLength, replacementLength) {
        if (i < matchStart)
            return i;
        else if (i > matchStart + matchLength)
            return i - matchLength + replacementLength;
        else
            return matchStart + replacementLength;
    }
    function checkAndReplace() {
        if (badRegExp.exec(textarea.value)) {
            setTimeout(function () {
                var match = badRegExp.exec(textarea.value);
                if (match) {
                    var a = textarea.selectionStart;
                    var b = textarea.selectionEnd;
                    var replacement = replacer(match);
                    textarea.value = textarea.value.replace(match[0], replacement);
                    textarea.selectionStart = fixSelection(a, match.index, match.length, replacement.length);
                    textarea.selectionEnd = fixSelection(b, match.index, match.length, replacement.length);
                    checkAndReplace();
                }
            }, 500);
        }
    }
    textarea.addEventListener('keyup', checkAndReplace);
    return textarea;
}
function addContextMenu(elem) {
    // only works in firefox
    var menu = document.createElement('menu');
    menu.setAttribute('type', 'context');
    menu.setAttribute('id', 'undoublespacer-contextmenu');
    ['monospace', 'sans-serif', 'serif'].forEach(function (fontFamily) {
        var item = document.createElement('menuitem');
        item.setAttribute('label', fontFamily);
        item.addEventListener('click', function () { return elem.style.fontFamily = fontFamily; });
        menu.append(item);
    });
    elem.setAttribute('contextMenu', 'undoublespacer-contextmenu');
    elem.append(menu);
}
function main() {
    var textarea = undoublespacer();
    document.body.append(textarea);
    addContextMenu(textarea);
}
main();
