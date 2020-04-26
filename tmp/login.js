

function ChkValue() {
    var vU = $('UID').innerHTML;
    vU = vU.substring(0, 1) + vU.substring(2, 3);

    var vcFlag = "NO";
    if ($('txt_sdsdfdsfryuiighgdf').value == '') {
        alert('须录入' + vU + '！');
        $('txt_sdsdfdsfryuiighgdf').focus();
        return false;
    }
    else if ($('txt_dsfdgtjhjuixssdsdf').value == '') {
        alert('须录入密码！');
        $('txt_dsfdgtjhjuixssdsdf').focus();
        return false;
    }
    else if ($('txt_sftfgtrefjdndcfgerg').value == '' && vcFlag == "YES") {
        alert('须录入验证码！');
        $('txt_sftfgtrefjdndcfgerg').focus();
        return false;
    }
    else {
        $('txt_dsfdgtjhjuixssdsdf').value = "";
        $('txt_sftfgtrefjdndcfgerg').value = "";
        $('divLogNote').innerHTML = "正在通过身份验证...请稍候！";
        return true;
    }
}

function SelType(obj) {
    var s = obj.options[obj.selectedIndex].getAttribute('usrID');
    $('UID').innerHTML = s;
    selTyeName();

    var flag = "";
    if (flag == "YES") {
        if (obj.value == "STU") {
            document.all.btnGetStuPwd.style.display = '';
            document.all.btnReset.style.display = 'none';
        }
        else {
            document.all.btnReset.style.display = '';
            document.all.btnGetStuPwd.style.display = 'none';
        }
    }
}
function ResetData() {
    $('txt_sdsdfdsfryuiighgdf').value = "";
    $('txt_dsfdgtjhjuixssdsdf').value = "";
    $('txt_sftfgtrefjdndcfgerg').value = "";
}
function selTyeName() {
    $('typeName').value = $N('Sel_Type')[0].options[$N('Sel_Type')[0].selectedIndex].text;
}

window.onload = function () {
    try {
        $('txt_sdsdfdsfryuiighgdf').focus();
    } catch (err) { }
    try {
        $('typeName').value = $N('Sel_Type')[0].options[$N('Sel_Type')[0].selectedIndex].text;
    } catch (err) { }
}

function openWinLog(theURL, w, h) {
    var Tform, retStr;
    eval("Tform='width=" + w + ",height=" + h + ",scrollbars=no,resizable=no'");
    pop = window.open(theURL, 'winKPT', Tform); pop.moveTo((screen.width - w) / 2, (screen.height - h) / 2);
    eval("Tform='dialogWidth:" + w + "px;dialogHeight:" + h + "px;status:no;scrollbars=no;help:no'");
    if (typeof (retStr) != 'undefined') alert(retStr);
}

function openWinDialog(url, scr, w, h) {
    //var Tform = "dialogWidth:"+w+"px;dialogHeight:"+h+"px;status:"+scr+";scrollbars=no;help:no";
    //window.showModalDialog(url,1,Tform);

    myShowModalDialog(url, w, h, function (retStr) {

    });
}
function myShowModalDialog(url, width, height, fn) {
    if (navigator.userAgent.indexOf("Chrome") > 0) {
        window.returnCallBackValue354865588 = fn;
        var paramsChrome = 'height=' + height + ', width=' + width + ', top=' + (((window.screen.height - height) / 2) - 50) +
            ',left=' + ((window.screen.width - width) / 2) + ',toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no';
        window.open(url, "newwindow", paramsChrome);
    }
    else {
        var params = 'dialogWidth:' + width + 'px;dialogHeight:' + height + 'px;status:no;dialogLeft:'
            + ((window.screen.width - width) / 2) + 'px;dialogTop:' + (((window.screen.height - height) / 2) - 50) + 'px;';
        var tempReturnValue = window.showModalDialog(url, "", params);
        fn.call(window, tempReturnValue);
    }
}
function openWin(theURL) {
    var Tform, w, h;
    try {
        w = window.screen.width - 10;
    } catch (e) { }
    try {
        h = window.screen.height - 30;
    } catch (e) { }

    try {
        Tform = "width=" + w + ",height=" + h + ",scrollbars=no,status=no,resizable=yes";
        pop = parent.window.open(theURL, '', Tform);
        pop.moveTo(0, 0);
        parent.opener = null;
        parent.close();
    } catch (e) { }
}

function changeValidateCode(Obj) {
    var dt = new Date();
    Obj.src = "../sys/ValidateCode.aspx?t=" + dt.getMilliseconds();
}

// the encryption algorithm for password


// js加密过程如下：
// 1）将密码md5加密，然后截取前30个字符，并且变成大写字母；
// 2）将学号与第一步得到的字符串拼接，再与固定参数拼接，然后将整个字符串md5加密，截取前30个字母并且转为大写，就得到了加密过后的字符串，也就是input的value值。5

function chkpwd(obj) {
    var schoolcode = "11070";
    var yhm = document.all.txt_sdsdfdsfryuiighgdf.value;
    if (obj.value != "") {
        if (document.all.Sel_Type.value == "ADM")
            yhm = yhm.toUpperCase();
        var s = md5(yhm + md5(obj.value).substring(0, 30).toUpperCase() + schoolcode).substring(0, 30).toUpperCase();
        document.all.sdfdfdhgwerewt.value = s;
    }
    else {
        document.all.sdfdfdhgwerewt.value = obj.value;
    }
}
function chkyzm(obj) {
    var schoolcode = "11070";
    if (obj.value != "") {
        var s = md5(md5(obj.value.toUpperCase()).substring(0, 30).toUpperCase() + schoolcode).substring(0, 30).toUpperCase();
        document.all.cxfdsfdshjhjlk.value = s;
    }
    else {
        document.all.cxfdsfdshjhjlk.value = obj.value;
    }
}
function showvc() {
    $("imgCode").style.visibility = "";
    $("lbl_kk").style.display = "";
}