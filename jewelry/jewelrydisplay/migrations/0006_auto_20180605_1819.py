# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-05 10:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jewelrydisplay', '0005_works_sequence'),
    ]

    operations = [
        migrations.AddField(
            model_name='picture_path',
            name='isFirst',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='works',
            name='workname',
            field=models.CharField(default='1', max_length=32),
        ),
    ]