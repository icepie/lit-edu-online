#-*-coding:utf-8-*-
import os
import re
from lxml import etree
import requests
import sys
from bs4 import BeautifulSoup
from hashlib import md5 as rawmd5

url = "http://120.194.42.205:9001/_data/index_LOGIN.aspx"
response = requests.session().get(url)
selector = etree.HTML(response.content)
__VIEWSTATE = selector.xpath('//*[@id="Logon"]/input/@value')[0]

print(__VIEWSTATE)

# account config
username = ''
password = ''

# 与网页js中的 function chkpwd(obj) 等效加密算法
def md5(string: str) -> str:
    return rawmd5(string.encode()).hexdigest().upper()

def chkpwd(username: str, password: str) -> str:
    schoolcode = "11070"
    return md5(username + md5(password)[0:30].upper() +
               schoolcode)[0:30].upper()

# test the encryption algorithm 
print(chkpwd(username,password))

data = {
    "__VIEWSTATE":__VIEWSTATE,
    "txt_sdsdfdsfryuiighgdf":username,
    "txt_dsfdgtjhjuixssdsdf":'',
    "sdfdfdhgwerewt":chkpwd(username,password),
    "cxfdsfdshjhjlk":""
}

# UA setting
headers = {
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36",
}

response = requests.session().post(url,data=data,headers=headers)
print(response)
print ("成功进入")