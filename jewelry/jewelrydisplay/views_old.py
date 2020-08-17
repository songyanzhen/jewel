# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render,HttpResponseRedirect,HttpResponse,redirect,render_to_response
import json
from django.contrib import auth
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.core.mail import send_mail
from token_confirm import Token
from django.conf import settings as django_settings
from django.contrib.auth.decorators import login_required, permission_required
import models
import time
import os
import shutil
# Create your views here.

import sys
reload(sys)
sys.setdefaultencoding('utf-8')


token_confirm = Token(django_settings.SECRET_KEY)    # 定义为全局变量



def index(request):
    return render(request, "index.html")

# 用户登录
# 用户登录
# 用户登录
def loginv(request):
    # body = request.body
    # js = json.loads(body)
    # # print(body[1])
    # print(js['name'])
    # username = js['name']
    # password = js['password']
    next = ''
    if request.method == 'GET':
        next = request.GET.get('next')
        print("get next")
    if request.method == 'POST':
        body = request.body
        js = json.loads(body)
        username = js["name"]
        password = js["password"]
        print(type(username))
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return HttpResponse(9999)#用户名不存在

        if not user.is_active:
            return HttpResponse(9998)#没有激活
        user = authenticate(username=username, password=password)
        print("username",username)
        print("password",password)

        if user is not None:

            login(request,user)
            print("login success")
            # return HttpResponse(1)
            # return redirect()
            # print user.has_perm('jewelrydisplay.author_entry')
            if next == "":
                return HttpResponse(user.id) # 登录成功
            else:
                return HttpResponseRedirect(next)

        else:
            #return render(request, 'message.html', {'message': u"用户名或密码不正确"})
            return HttpResponse(9999)  # 用户名或密码不正确

    return render_to_response('login.html',{'next':next,})

def logoutFunc(request):
    logout(request)
    #return HttpResponse(1)
    return render(request, "login.html")

def register(request):
    print(request)
    return render(request,"register.html")

def signup(request):
    if request.method == 'POST':
        body = request.body
        js = json.loads(body)
        username = js['name']
        email = js['email']
        password = js['password']
        user = User.objects.filter(username = username)
        em = User.objects.filter(email=email)
        print(user.exists())
        print(em.exists())
        if(user.exists()):
            return HttpResponse(2)#用户名重复
            #return render(request, 'message.html', {'message': u"用户名重复"})
        if(em.exists()):
            return HttpResponse(3)  # 用户名重复

        user = User.objects.create_user(username=username, password=password, email=email)
        user.is_active = False

        user.save()
        token = token_confirm.generate_validate_token(username)
        message = "\n".join([u'{0},欢迎来到QQQ品牌珠宝网站'.format(username), u'请访问该链接，完成用户验证:',
                             '/'.join(['http://127.0.0.1:8000', 'activate', token])])
        send_mail(u'注册用户验证信息', message, '1173568600@qq.com', [email], fail_silently=False)
        return HttpResponse(1)#注册成功


def active_user(request, token):
    try:
        username = token_confirm.confirm_validate_token(token)
    except:
        username = token_confirm.remove_validate_token(token)
        users = User.objects.filter(username=username)
        for user in users:
            user.delete()
        return render(request, 'message.html', {'message': u'对不起，验证链接已经过期，请重新<a href=\"' + unicode('http://127.0.0.1:8000') + u'/signup\">注册</a>'})
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return render(request, 'message.html', {'message': u"对不起，您所验证的用户不存在，请重新注册"})
    user.is_active = True
    user.save()
    message = u'验证成功，请进行<a href=\"' + unicode('http://127.0.0.1:8000') + u'/login\">登录</a>操作'
    return render(request, 'message.html', {'message':message})
# series
# 查看系列
def series(request):
    return render(request, "series.html")

# 后台查看系列
def getSeries(request):
    ss = models.series.objects.all().order_by('series_sequence')
    j = {}
    for s in ss:
        print s.series_sequence, s.seriesname
        j[s.id] = s.seriesname

    # ja = []
    # for s in ss:
    #     j = {}
    #     j['id'] = s.id
    #     j['name'] = s.seriesname
    #     j['pic'] = s.series_pic
    #     ja.append(j)

    return HttpResponse(json.dumps(j), content_type="application/json")

#添加系列
def uploadSeries(request):
    data = request.POST
    intro = data.get('seriesIntro')
    name = data.get('seriesName')
    intro_eng = data.get('seriesIntro_eng')
    name_eng = data.get('seriesName_eng')

#	
#    files = request.FILES
#    p = files['file']
#
#    fobj = open(django_settings.IMAGES_ROOT+'series_images/' + p.name, 'wb')
#    for chunk in p.chunks():
#        fobj.write(chunk)
#    fobj.close()

    # print(intro)
    # print(name)
    # print(intro_eng)
    # print(name_eng)

    series = models.series(seriesname=name, intro=intro, intro_eng=intro_eng, seriesname_eng=name_eng, series_pic=' ')
    series.save()
    return HttpResponse(1)

def getAllSeries(request):
    ss = models.series.objects.all().order_by('series_sequence')
    ja = []
    for s in ss:
        js1 = {}
        js1['id'] = s.id
        js1['seriesname'] = s.seriesname
        js1['seriespic'] = s.series_pic
        ja.append(js1)
    print(ja)
    return HttpResponse(json.dumps(ja), content_type="application/json")

def getOneSeries(request):
    print(request.GET)
    seriesid = request.GET.get('id')

    series = models.series.objects.get(id=seriesid)
    seriesname = series.seriesname
    seriesintro = series.intro
    seriesname_eng = series.seriesname_eng
    seriesintro_eng = series.intro_eng

    j = {'seriesname':seriesname, 'seriesintro':seriesintro, 'seriesname_eng':seriesname_eng, 'seriesintro_eng':seriesintro_eng}

    return HttpResponse(json.dumps(j), content_type="application/json")

def fixSeries(request):
    data = request.POST
    id = data.get('id')
    name = data.get('seriesname')
    intro = data.get('seriesintro')
    name_eng = data.get('seriesname_eng')
    intro_eng = data.get('seriesintro_eng')
    #print(name)
    series = models.series.objects.get(id=id)
    series.seriesname = name
    series.intro = intro
    series.seriesname_eng = name_eng
    series.intro_eng = intro_eng
    series.save()

    return HttpResponse(1)
# works
# 浏览作品
def jewel(request):
    return render(request, 'jewel.html')
#展示作品
def getWork(request):
    print(request.GET)
    workid = request.GET.get('id')

    work = models.works.objects.get(id = workid)
    picpaths = models.picture_path.objects.filter(work_id=workid)
    paths = []

    for path in picpaths:
        paths.append(str(workid)+'/'+path.picturepath)

    seriesname = models.series.objects.get(id = work.series_id).seriesname
    workname = seriesname + '-' + str(work.sequence)
    j = {'workname':workname, 'workintro':work.workintro, 'image': paths}

    return HttpResponse(json.dumps(j), content_type="application/json")


#后台作品
def getOptionWorks(request):
    seriesid = request.GET.get('id')
    seriesids = []
    if seriesid == 'all':
        seriesids = models.series.objects.all().values('id')
        print(type(seriesids))
        print(seriesids)
        # ws = models.works.objects.all().order_by('sequence')
    else:
        si = {}
        si['id'] = seriesid
        seriesids.append(si)

        print(type(seriesids))
        print(seriesids)
        # ws = models.works.objects.filter(series_id=seriesid).order_by('sequence')


    # seriesname = models.series.objects.get(id = seriesid).seriesname


    ja = []
    for s in seriesids:
        ws = models.works.objects.filter(series_id=s['id']).order_by('sequence')
        seriesname = models.series.objects.get(id=s['id']).seriesname
        for w in ws:
            workname = seriesname + '-' + str(w.sequence)
            js1 = {}
            js1['id'] = w.id
            js1['workname'] = workname
            js1['workintro'] = w.workintro
            picpaths = models.picture_path.objects.filter(work_id=w.id).order_by('-isFirst')
            print(picpaths.first().isFirst)
            paths = []
            for path in picpaths:
                # print(path.isFirst)
                paths.append(str(w.id)+'/'+path.picturepath)
            js1['paths'] = paths
            ja.append(js1)
        

    print(ja)
    return HttpResponse(json.dumps(ja), content_type="application/json")


def workSequence(request):
    body = request.body
    js = json.loads(body)
    print(js)
    ws = models.works.objects.all()
    for k in js:
        # print(k, js[k])
        w = ws.get(id = k)
        w.sequence = js[k]
        w.save()
    return HttpResponse(1)

def uploadWork(request):
    # 上传
    # 修改信息
    # 保存的文件名改成 时间戳+photo+本作品中该图片的序号
    seriesid = request.POST.get('seriesSelect')
    #workIntro = request.POST.get('jobIntro')
    # 该系列多少个作品
    worksInSeriesid = models.works.objects.filter(series_id=seriesid).count()
    # seriesname = models.series.objects.get(id = seriesid).seriesname

    # 上传作品的序列
    sequence = worksInSeriesid+1
    work = models.works(series_id=seriesid, sequence = sequence)
    work.save()

    workid = work.id
    # print(workid)
    # print(request.POST)
    files = request.FILES
    # print(files)
    for filekey in files:
        print(filekey)
        filename = files[filekey].name
        timestamp = int(round(time.time() * 1000))

        # 文件名中文乱码问题是因为这里str()过程中没有使用utf8编码，在代码最上方规定utf8后即可
        splitfilename = str(filename).split('.')
        newfilename = str(timestamp)+filekey+'.'+splitfilename[-1]

        # print(newfilename)
        dirPath = django_settings.IMAGES_ROOT+str(workid)
        if not os.path.exists(dirPath):
            os.makedirs(dirPath)

        fobj = open(os.path.join(dirPath,newfilename), 'wb')
        for chunk in files[filekey].chunks():
            fobj.write(chunk)
        fobj.close()
        picture = models.picture_path(work_id=workid, isFirst=(filekey == 'photo1'),picturepath=newfilename)
        picture.save()
    return HttpResponse(1)

def delWork(request):
    data = request.POST
    print(data)
    id = data.get('workId')
    try:
        w = models.works.objects.get(id=id)
    except:
        return HttpResponse('没有要删除的workid')

    try:
        ww = models.works.objects.filter(series_id=w.series_id, sequence__gt = w.sequence)
        for s in ww:
            s.sequence=s.sequence-1
            s.save()
        models.picture_path.objects.filter(work_id=w.id).delete()
        w.delete()

        dirPath = django_settings.IMAGES_ROOT + str(id)
        print id
        shutil.rmtree(dirPath)
    except Exception as e:
        # 删除失败
        print e.message
        return HttpResponse(0)
    # 删除作品成功
    return HttpResponse(1)



@login_required
@permission_required('jewelrydisplay.author_entry', '/series/')
def itemPage(request):
    return render(request,'manage/item.html')



# 作者设置介绍
@login_required
@permission_required('jewelrydisplay.author_entry', '/series/')
def intro(request):
    introduction = models.introduction.objects.get(id = 1)
    # print(introduction)
    j = {}
    j['intro'] = introduction.intro_cn
    j['exper'] = introduction.exper_cn
    # print(j)
    # return HttpResponse(json.dumps(j, ensure_ascii=False), content_type="application/json, charset=utf-8")
    return render(request,"manage/intro.html", {'intro':introduction.intro_cn, 'exper': introduction.exper_cn,'intro_eng':introduction.intro_eng, 'exper_eng': introduction.exper_eng})
    # u = auth.get_user(request)
    # print(u)
    # print(u.get_all_permissions())
    # print(u.has_perm('jewelrydisplay.author_entry'))
    # if u.has_perm("jewelrydisplay.author_entry"):
    #     return render(request,"manage/intro.html")
    # else:
    #     return render(request, 'message.html', {'message':'没有权限'})


def intro(request):
    try:
        introduction = models.introduction.objects.get(id = 1)
        # print(introduction)
    except models.introduction.DoesNotExist:
        return render(request, "manage/intro.html", {'intro': '', 'exper': '',
                                                     'intro_eng': '',
                                                     'exper_eng': ''})
    else:
        return render(request,"manage/intro.html", {'intro':introduction.intro_cn, 'exper': introduction.exper_cn,'intro_eng':introduction.intro_eng, 'exper_eng': introduction.exper_eng})


# 展示作者介绍
def introduction(request):
    try:
        introduction = models.introduction.objects.get(id = 1)
    except models.introduction.DoesNotExist:
        return render(request, "introduction.html", {'intro': '', 'exper': '',
                                                     'image': ''})
    else:
        return render(request,"introduction.html", {'intro':introduction.intro_cn, 'exper': introduction.exper_cn, 'image': introduction.picture_name})


def test(request):
    return render(request,"introduction.html", {'intro':1, 'exper': 2, 'image': 'self.jpg'})



def setIntro(request):
    data = request.POST
    intro = data.get('intro')
    exper = data.get('exper')
    intro_eng = data.get('intro_eng')
    exper_eng = data.get('exper_eng')
    # print(intro)
    # print(exper)
    files = request.FILES
    p = files['file']
    filename = p.name
    # print(p.name)

    try:

        fobj = open(django_settings.IMAGES_ROOT+p.name, 'wb')
        for chunk in p.chunks():
            fobj.write(chunk)
        fobj.close()
        introduction = models.introduction.objects.filter(id = 1)
        # print(introduction)
        if introduction.count() == 0:
            introduction = models.introduction(exper_cn=exper, intro_cn=intro, picture_name=filename, exper_eng=exper_eng, intro_eng=intro_eng)
            introduction.save()
        else:
            introduction.update(exper_cn= exper)
            introduction.update(intro_cn = intro)
            introduction.update(exper_eng=exper_eng)
            introduction.update(intro_eng=intro_eng)
            introduction.update(picture_name = filename)
    except:
        return HttpResponse(0)

    print intro
    return HttpResponse(1)

def getIndexPic(request):
    picpaths = models.picture_path.objects.filter(isBroadcast=True)
    ja = []
    for picpath in picpaths:
        js = {}
        workid = picpath.work_id
        ww = models.works.objects.filter(id=workid)
        for w in ww:
            js['id'] = w.series_id
        js['picture'] = str(picpath.work_id) +'/'+ picpath.picturepath
        ja.append(js)

    return HttpResponse(json.dumps(ja), content_type="application/json")


def getAllWorksId(request):
    workids = models.works.objects.values('id')
    print(workids)
    w = []
    for workid in workids:
        print(workid['id'])
        w.append(workid['id'])
    js = {}
    js['ids'] = w
    return HttpResponse(json.dumps(js), content_type="application/json")



def getJewels(request):
    print(request.GET)
    seriesid = request.GET.get('id')

    series = models.series.objects.get(id=seriesid)
    seriesname = series.seriesname
    seriesintro = series.intro

    works = models.works.objects.filter(series_id=seriesid).order_by('sequence')
    paths = []
    seqs = []
    for w in works:
        picpaths = models.picture_path.objects.filter(work_id=w.id)
        for p in picpaths:
            paths.append(str(w.id) + '/' + p.picturepath)
            seqs.append(w.sequence)
    j = {'seriesname':seriesname,
         'seriesintro':seriesintro,
         'image': paths,
         'seq': seqs}

    return HttpResponse(json.dumps(j), content_type="application/json")



def getAllPics(request):
    series = models.series.objects.all()
    ja = []
    for s in series:
        works = models.works.objects.filter(series_id=s.id)
        js = {}
        picids = []
        paths = []
        broadcast = []
        for w in works:
            workId = w.id
            pics = models.picture_path.objects.filter(work_id=workId)
            for p in pics:
                picpath = str(w.id) + '/' + p.picturepath
                picids.append(p.id)
                paths.append(picpath)
                broadcast.append(p.isBroadcast)
        js['seriesId'] = s.id
        js['seriesName'] = s.seriesname
        js['picIds'] = picids
        js['picpaths'] = paths
        js['broadcast'] = broadcast
        ja.append(js)
    print(ja)
    return HttpResponse(json.dumps(ja), content_type="application/json")

def fixIndex(request):
    data = request.POST
    print(data)
    # ids = data.get('ids').encode('raw_unicode_escape')

    pics = models.picture_path.objects.all()
    for p in pics:
        p.isBroadcast = 0
        p.save()
    for id in data:
        indexpic = models.picture_path.objects.get(id=id)
        indexpic.isBroadcast = 1
        indexpic.save()
    return HttpResponse(1)

def delSeries(request):
    data = request.POST
    print(data)
    id = data.get('seriesId')

    try:
        works = models.works.objects.filter(series_id=id)
        if works is not None:
            for w in works:
                models.picture_path.objects.filter(work_id=w.id).delete()
                w.delete()

        series = models.series.objects.filter(id=id)

        os.remove(django_settings.IMAGES_ROOT + 'series_images/' + series.series_pic)

        series.delete()
    except Exception as e:
        print e
        return HttpResponse(u'删除系列错误')
    return HttpResponse(1)




#eng pages
def index_eng(request):
    return render(request,"eng/index_eng.html")
def series_eng(request):
    return render(request,"eng/series_eng.html")
def jewel_eng(request):
    return render(request,"eng/jewel_eng.html")

def introduction_eng(request):
    introduction = models.introduction.objects.get(id = 1)
    print(introduction)
    j = {}
    j['intro'] = introduction.intro_eng
    j['exper'] = introduction.exper_eng
    j['image'] = introduction.picture_name
    print(j)
    # return HttpResponse(json.dumps(j, ensure_ascii=False), content_type="application/json, charset=utf-8")
    return render(request,"eng/introduction_eng.html", {'intro':introduction.intro_eng, 'exper': introduction.exper_eng, 'image': introduction.picture_name})

def getAllSeries_eng(request):
    ss = models.series.objects.all()
    ja = []
    for s in ss:
        js1 = {}
        js1['id'] = s.id
        js1['seriesname'] = s.seriesname_eng
        js1['pic'] = s.series_pic
        ja.append(js1)
    print(ja)
    return HttpResponse(json.dumps(ja), content_type="application/json")

def getJewels_eng(request):
    print(request.GET)
    seriesid = request.GET.get('id')

    series = models.series.objects.get(id=seriesid)
    seriesname = series.seriesname_eng
    seriesintro = series.intro_eng

    works = models.works.objects.filter(series_id=seriesid).order_by('sequence')
    paths = []
    seqs = []
    for w in works:
        picpaths = models.picture_path.objects.filter(work_id=w.id)
        for p in picpaths:
            paths.append(str(w.id) + '/' + p.picturepath)
            seqs.append(w.sequence)
    j = {'seriesname':seriesname, 'seriesintro':seriesintro, 'image': paths, 'seq': seqs}

    return HttpResponse(json.dumps(j), content_type="application/json")

def getUsername(request):
    print(request.GET)
    userid = request.GET.get('id')
    print(userid)
    user = User.objects.get(id=userid)
    username = user.username
    permission = user.has_perm('jewelrydisplay.author_entry')

    j = {'username': username, 'permission': permission}

    return HttpResponse(json.dumps(j), content_type="application/json")

def hasLogin(request):
    if request.user.is_authenticated():
        username = request.user.username
        permission = request.user.has_perm('jewelrydisplay.author_entry')

        j = {'username': username, 'permission': permission}

        return HttpResponse(json.dumps(j), content_type="application/json")
    else:
        return HttpResponse(0)

def index_mob(request):
    return render(request, "mob/index_mob.html")
def series_mob(request):
    return render(request, "mob/series_mob.html")
def jewel_mob(request):
    return render(request, "mob/jewel_mob.html")

def introduction_mob(request):
    introduction = models.introduction.objects.get(id = 1)
    print(introduction)
    j = {}
    j['intro'] = introduction.intro_cn
    j['exper'] = introduction.exper_cn
    j['image'] = introduction.picture_name
    print(j)
    # return HttpResponse(json.dumps(j, ensure_ascii=False), content_type="application/json, charset=utf-8")
    return render(request, "mob/introduction_mob.html", {'intro':introduction.intro_cn, 'exper': introduction.exper_cn, 'image': introduction.picture_name})

def index_mob_eng(request):
    return render(request, "mob_eng/index_mob_eng.html")
def series_mob_eng(request):
    return render(request,"mob_eng/series_mob_eng.html")
def jewel_mob_eng(request):
    return render(request,"mob_eng/jewel_mob_eng.html")

def introduction_mob_eng(request):
    introduction = models.introduction.objects.get(id = 1)
    print(introduction)
    j = {}
    j['intro'] = introduction.intro_eng
    j['exper'] = introduction.exper_eng
    j['image'] = introduction.picture_name
    print(j)
    # return HttpResponse(json.dumps(j, ensure_ascii=False), content_type="application/json, charset=utf-8")
    return render(request,"mob_eng/introduction_mob_eng.html", {'intro':introduction.intro_eng, 'exper': introduction.exper_eng, 'image': introduction.picture_name})