/**
 * Created by Administrator on 2017/5/18.
 */
const cursor = {
    get(textarea) {
        var rangeData = {text: "", start: 0, end: 0};

        if (textarea.setSelectionRange) {
            textarea.focus();
            rangeData.start = textarea.selectionStart;
            rangeData.end = textarea.selectionEnd;
            rangeData.text = (rangeData.start != rangeData.end) ? textarea.value.substring(rangeData.start, rangeData.end) : "";
        } else if (document.selection) {
            textarea.focus();
            var i,
                oS = document.selection.createRange(),
                oR = document.body.createTextRange();
            oR.moveToElementText(textarea);
            rangeData.text = oS.text;
            rangeData.bookmark = oS.getBookmark();
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i++) {
                if (textarea.value.charAt(i) == '\r') {
                    i++;
                }
            }
            rangeData.start = i;
            rangeData.end = rangeData.text.length + rangeData.start;
        }

        return rangeData;
    },

    set: function (textarea, rangeData) {
        var oR, start, end;
        if (!rangeData) {
            alert("You must get cursor position first.")
        }
        textarea.focus();
        if (textarea.setSelectionRange) {
            textarea.setSelectionRange(rangeData.start, rangeData.end);
        } else if (textarea.createTextRange) {
            oR = textarea.createTextRange();
            if (textarea.value.length === rangeData.start) {
                oR.collapse(false);
                oR.select();
            } else {
                oR.moveToBookmark(rangeData.bookmark);
                oR.select();
            }
        }
    },

    add: function (textarea, rangeData, text) {
        var oValue, nValue, oR, sR, nStart, nEnd, st;
        this.set(textarea, rangeData);
        if (textarea.setSelectionRange) {
            oValue = textarea.value;
            nValue = oValue.substring(0, rangeData.start) + text + oValue.substring(rangeData.end);
            nStart = nEnd = rangeData.start + text.length;
            st = textarea.scrollTop;
            textarea.value = nValue;
            if (textarea.scrollTop != st) {
                textarea.scrollTop = st;
            }
            textarea.setSelectionRange(nStart, nEnd);
        } else if (textarea.createTextRange) {
            sR = document.selection.createRange();
            sR.text = text;
            sR.setEndPoint('StartToEnd', sR);
            sR.select();
        }
    }
}

export default {
    cursor
}