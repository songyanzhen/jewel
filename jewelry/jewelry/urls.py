"""jewelry URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from jewelrydisplay import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^index/', admin.site.urls),
    url(r'^$', views.index),
    url(r'^login/', views.loginv),
    url(r'^logout/', views.logoutFunc),
    url(r'^intro/', views.intro),
    url(r'^introduction/', views.introduction),
    url(r'^setIntro/', views.setIntro),
    url(r'^register/', views.register),
    url(r'^signup/', views.signup),
    url(r'^getOptionSeries/', views.getAllSeries),
    url(r'^getSeries/', views.getSeries),
    url(r'^item/', views.itemPage),
    url(r'^series/', views.series),
    url(r'^jewel/', views.jewel),
    url(r'^getWork/', views.getWork),
    url(r'^getWorks/', views.getOptionWorks),
    url(r'^getOptionWorks/', views.getOptionWorks),
    url(r'^workSequence/', views.workSequence),
    url(r'^addWork/', views.uploadWork),
    url(r'^addSeries/', views.uploadSeries),
    url(r'^getIndexPic/', views.getIndexPic),
    url(r'^getAllWorksId/', views.getAllWorksId),

    # url(r'^userOperate/', views.userOperate),

    url(r'^test/', views.test),
    url(r'^activate/(?P<token>\w+.[-_\w]*\w+.[-_\w]*\w+)/$',views.active_user,name='active_user'),

    url(r'^getAllSeries/', views.getAllSeries),
    url(r'^getJewels/', views.getJewels),
    url(r'^getOneSeries/', views.getOneSeries),
    url(r'^fixSeries/', views.fixSeries),
    url(r'^getAllPics/', views.getAllPics),
    url(r'^fixIndex/', views.fixIndex),

    url(r'^delWork/', views.delWork),
    url(r'^delSeries/', views.delSeries),
    url(r'^getUsername/', views.getUsername),
    url(r'^hasLogin/', views.hasLogin),
    # url(r'^getSeriesIntro/', views.getSeriesIntro),

    url(r'^eng/', views.index_eng),
    url(r'^index_eng/introduction_eng/', views.introduction_eng),
    url(r'^index_eng/series_eng/', views.series_eng),
    url(r'^index_eng/jewel_eng/', views.jewel_eng),
    url(r'^getAllSeries_eng/', views.getAllSeries_eng),
    url(r'^getJewels_eng/', views.getJewels_eng),

    url(r'^mob/', views.index_mob),
    url(r'^index_mob/introduction_mob', views.introduction_mob),
    url(r'^index_mob/series_mob', views.series_mob),
    url(r'^index_mob/jewel_mob', views.jewel_mob),

    url(r'^mob_eng/', views.index_mob_eng),
    url(r'^index_mob_eng/introduction_mob_eng', views.introduction_mob_eng),
    url(r'^index_mob_eng/series_mob_eng', views.series_mob_eng),
    url(r'^index_mob_eng/jewel_mob_eng', views.jewel_mob_eng),
]
