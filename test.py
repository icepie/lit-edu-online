from hashlib import md5 as rawmd5


# 与网页js中的 function chkpwd(obj) 等效加密算法

__all__ = ("chkpwd")


def md5(string: str) -> str:
    return rawmd5(string.encode()).hexdigest().upper()

def chkpwd(username: str, password: str) -> str:
    schoolcode = "11070"
    return md5(username + md5(password)[0:30].upper() +
               schoolcode)[0:30].upper()

# test the encryption algorithm 
print(chkpwd('B1907xxxx','12345678'))
