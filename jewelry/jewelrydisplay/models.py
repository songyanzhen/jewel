# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=32)
    password = models.CharField(max_length=32)
    email = models.EmailField()
    rule = models.IntegerField(default=0)
#asdfasdf

class media(models.Model):
    id = models.AutoField(primary_key=True)
    img = models.CharField(max_length=256)


class series(models.Model):
    seriesname = models.CharField(max_length=32)
    intro = models.TextField(default="")
    seriesname_eng = models.TextField(default="")
    intro_eng = models.TextField(default="")
    series_pic = models.CharField(max_length=64, default='')
    series_sequence = models.IntegerField(default=0)
    isPreview = models.BooleanField(default=True)


class works(models.Model):
    series = models.ForeignKey('series')
    workintro = models.TextField()
    price = models.FloatField(default=0.0)
    stock = models.IntegerField(default=0)
    sequence = models.IntegerField(default=0)

class picture_path(models.Model):
    work = models.ForeignKey('works')
    picturepath = models.CharField(max_length=32)
    isFirst = models.BooleanField(default=False)
    isBroadcast = models.BooleanField(default=False)
    isPreview = models.BooleanField(default=True)

class introduction(models.Model):
    exper_cn = models.TextField()
    exper_eng = models.TextField()
    intro_cn = models.TextField()
    intro_eng = models.TextField()
    story_cn = models.TextField()
    story_eng = models.TextField()
    picture_name = models.CharField(max_length=256)
