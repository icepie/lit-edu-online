import re
from hashlib import md5 as rawmd5
from time import sleep

import requests as r
from bs4 import BeautifulSoup

def md5(string: str) -> str:
    return rawmd5(string.encode()).hexdigest().upper()


def chkpwd(username: str, password: str) -> "赋值给: sdfdfdhgwerewt":
    schoolcode = "11070"
    return md5(username + md5(password)[0:30].upper() + schoolcode)[0:30].upper()


class Session(r.Session):
    def __init__(self, username: str, password: str):
        """初始化一个登录后的 Session, 之后可如同普通的 requests.Session 一般使用
        ```python
        s = Session("username", "password")
        # s.get("......")
        ```
        """
        super().__init__()
        self.username = username
        self.password = password
        self.headers.update({
            'host': "jw.sec.lit.edu.cn",
            'connection': "keep-alive",
            'cache-control': "max-age=0",
            'upgrade-insecure-requests': "1",
            'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36",
            'accept': "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            'referer': "http://120.194.42.205:9001/_data/index_LOGIN.aspx",
            'accept-encoding': "gzip, deflate",
            'accept-language': "zh-CN,zh;q=0.9",
        })
        print(chkpwd(self.username, self.password))
        self.fetchHomePage()
        self.sendLogin()

    def fetchHomePage(self):
        """请求主页，并初始化 Cookie
        根据响应内容，应当等待 680ms 后重新加载以刷新 Cookie
        """
        url = "http://jw.sec.lit.edu.cn/MAINFRM.aspx"
        pattern = re.compile(r"(?<=document.cookie=')DSafeId=([A-Z0-9]+);(?=';)")
        resp = self.get(url)
        # 偶尔不需要设置 cookie, 直接就进入主页了
        if pattern.search(resp.text):
            first_cookie = re.search(pattern, resp.text).group(1)
            self.cookies.set("DSafeId", first_cookie)
            sleep(0.680)
            resp = self.get(url)
            new_cookie = resp.headers.get("set-cookie", self.cookies.get_dict())
            c = {
                1: re.search("(?<=ASP.NET_SessionId=)([a-zA-Z0-9]+)(?=;)", new_cookie).group(1),
                2: re.search("(?<=_D_SID=)([A-Z0-9]+)(?=;)", new_cookie).group(1)
            }
            self.cookies.set("ASP.NET_SessionId", c[1])
            self.cookies.set("_D_SID", c[2])
        print(resp.headers["set-cookie"])

    def sendLogin(self):
        """发送登录表单
        """
        url = "http://jw.sec.lit.edu.cn/_data/index_LOGIN.aspx"
        html = BeautifulSoup(self.get(url).text, "lxml")

        login_packet = {
            "__VIEWSTATE": html.select_one("#Logon > input[name=__VIEWSTATE]")["value"],
            "Sel_Type": "STU",
            "txt_sdsdfdsfryuiighgdf": self.username,  # 学号
            "txt_dsfdgtjhjuixssdsdf": "",  # 密码, 实际上的密码加密后赋值给 sdfdfdhgwerewt
            "txt_sftfgtrefjdndcfgerg": "",
            "typeName": "",
            "sdfdfdhgwerewt":  chkpwd(self.username, self.password),
            "cxfdsfdshjhjlk": "",
        }

        self.post(url, data=login_packet)
