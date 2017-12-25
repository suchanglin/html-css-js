//原生JavaScript实现字符串长度截取
function cutstr(str, len) {
    var temp;
    var icount = 0;
    var patrn = /[^\x00-\xff]/;
    var strre = "";
    for (var i = 0; i < str.length; i++) {
        if (icount < len - 1) {
            temp = str.substr(i, 1);
            if (patrn.exec(temp) == null) {
                icount = icount + 1;
            } else {
                icount = icount + 2;
            }
            strre += temp;
        } else {
            break;
        }
    }
    return strre + "...";
}

//原生JavaScript获取域名主机


function getHost(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url) {
        url = window.location.href;
    }
    var regex = /^\w+\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match) {
        host = match[1];
    }
    return host;
}


//原生JavaScript元素显示的通用方法

function $(id) {
    return !id ? null : document.getElementById(id);
}

function display(id) {
    var obj = $(id);
    if (obj.style.visibility) {
        obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
    } else {
        obj.style.display = obj.style.display == '' ? 'none' : '';
    }
}

//原生JavaScript实现checkbox全选与全不选

function checkAll() {
    var selectall = document.getElementById("selectall");
    var allbox = document.getElementsByName("allbox");
    if (selectall.checked) {
        for (var i = 0; i < allbox.length; i++) {
            allbox[i].checked = true;
        }
    } else {
        for (var i = 0; i < allbox.length; i++) {
            allbox[i].checked = false;
        }
    }
}


//原生JavaScript完美判断是否为网址


function IsURL(strUrl) {
    var regular = /^\b(((https?|ftp):\/\/)?[-a-z0-9]+(\.[-a-z0-9]+)*\.(?:com|edu|gov|int|mil|net|org|biz|info|name|museum|asia|coop|aero|[a-z][a-z]|((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d))\b(\/[-a-z0-9_:\@&?=+,.!\/~%\$]*)?)$/i
    if (regular.test(strUrl)) {
        return true;
    } else {
        return false;
    }
}

//原生JavaScript获得URL中GET参数值

// 用法：如果地址是 test.htm?t1=1&t2=2&t3=3, 那么能取得：GET["t1"], GET["t2"], GET["t3"]
function get_get() {
    querystr = window.location.href.split("?");
    if (querystr[1]) {
        GETs = querystr[1].split("&");
        GET = new Array();
        for (i = 0; i < GETs.length; i++) {
            tmp_arr = GETs[i].split("=");
            key = tmp_arr[0];
            GET[key] = tmp_arr[1];
        }
    }
    return querystr[1];
}


//原生JavaScript跨浏览器添加事件
function addEvt(oTarget, sEvtType, fnHandle) {
    if (!oTarget) {
        return;
    }
    if (oTarget.addEventListener) {
        oTarget.addEventListener(sEvtType, fnHandle, false);
    } else if (oTarget.attachEvent) {
        oTarget.attachEvent("on" + sEvtType, fnHandle);
    } else {
        oTarget["on" + sEvtType] = fnHandle;
    }
}


//原生JavaScript常用的正则表达式


//正整数
/^[0-9]*[1-9][0-9]*$/;
//负整数
/^-[0-9]*[1-9][0-9]*$/;
//正浮点数
/^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
//负浮点数
/^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/;
//浮点数
/^(-?\d+)(\.\d+)?$/;
//email地址
/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
//url地址
/^[a-zA-z]+:/ / (\w + (-\w + ) * )(\.(\w + (-\w + ) * )) * (\ ? \S * ) ? $ / ;
//年/月/日（年-月-日、年.月.日）
/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/;
//匹配中文字符
/[\u4e00-\u9fa5]/;
//匹配帐号是否合法(字母开头，允许5-10字节，允许字母数字下划线)
/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/;
//匹配空白行的正则表达式
/\n\s*\r/;
//匹配中国邮政编码
/[1-9]\d{5}(?!\d)/;
//匹配身份证
/\d{15}|\d{18}/;
//匹配国内电话号码
/(\d{3}-|\d{4}-)?(\d{8}|\d{7})?/;
//匹配IP地址
/((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/;
//匹配首尾空白字符的正则表达式
/^\s*|\s*$/;
//匹配HTML标记的正则表达式
<
(\S * ? )[ ^ > ] * > .* ? | < .* ? />;


//原生JavaScript实现返回顶部的通用方法

function backTop(btnId) {
    var btn = document.getElementById(btnId);
    var d = document.documentElement;
    var b = document.body;
    window.onscroll = set;
    btn.style.display = "none";
    btn.onclick = function() {
        btn.style.display = "none";
        window.onscroll = null;
        this.timer = setInterval(function() {
                d.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                b.scrollTop -= Math.ceil((d.scrollTop + b.scrollTop) * 0.1);
                if ((d.scrollTop + b.scrollTop) == 0) clearInterval(btn.timer, window.onscroll = set);
            },
            10);
    };

    function set() {
        btn.style.display = (d.scrollTop + b.scrollTop > 100) ? 'block' : "none"
    }
};
backTop('goTop');


//原生JavaScript实现全选通用方法


function checkall(form, prefix, checkall) {
    var checkall = checkall ? checkall : 'chkall';
    for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if (e.type == "checkbox") {
            e.checked = form.elements[checkall].checked;
        }
    }
}


//原生JavaScript实现全部取消选择通用方法

function uncheckAll(form) {
    for (var i = 0; i < form.elements.length; i++) {
        var e = form.elements[i];
        if (e.name != 'chkall')
            e.checked = !e.checked;
    }
}


//原生JavaScript获取单选按钮的值

function get_radio_value(field) {
    if (field && field.length) {
        for (var i = 0; i < field.length; i++) {
            if (field[i].checked) {
                return field[i].value;
            }
        }
    } else {
        return;
    }
}


//原生JavaScript获取复选框的值


function get_checkbox_value(field) {
    if (field && field.length) {
        for (var i = 0; i < field.length; i++) {
            if (field[i].checked && !field[i].disabled) {
                return field[i].value;
            }
        }
    } else {
        return;
    }
}


//原生JavaScript判断变量是否空值
/**
 * 判断变量是否空值
 * undefined, null, '', false, 0, [], {} 均返回true，否则返回false
 */
function empty(v) {
    switch (typeof v) {
        case 'undefined':
            return true;
        case 'string':
            if (trim(v).length == 0) return true;
            break;
        case 'boolean':
            if (!v) return true;
            break;
        case 'number':
            if (0 === v) return true;
            break;
        case 'object':
            if (null === v) return true;
            if (undefined !== v.length && v.length == 0) return true;
            for (var k in v) {
                return false;
            }
            return true;
            break;
    }
    return false;
}
