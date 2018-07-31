# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import shutil
import os

# Create your tests here.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

IMAGES_ROOT = os.path.join(BASE_DIR, "static/images/")

shutil.rmtree(IMAGES_ROOT+'61')