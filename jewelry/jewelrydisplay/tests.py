from qiniu import Auth, put_file, etag
import qiniu.config

def qiniu_load(path):
    access_key = 'y8BaldA683hgVEhHix4_xWR3NESm9uch28e1nG30'
    secret_key = '7Rqb5UoDbg7B3BVEdG38ZtHUzkQzTh6fU_TFOn61'
    # 构建鉴权对象
    q = Auth(access_key, secret_key)
    # 要上传的空间
    bucket_name = 'px75gfdiz.bkt.clouddn.com'
    # 上传后保存的文件名
    key = 'my-python-logo.png'
    # 生成上传 Token，可以指定过期时间等
    token = q.upload_token(bucket_name, key)
    # 要上传文件的本地路径
    localfile = './sync/bbb.jpg'
    ret, info = put_file(token, key, localfile)
    print(info)
    assert ret['key'] == key
    assert ret['hash'] == etag(localfile)


