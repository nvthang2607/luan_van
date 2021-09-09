# -*- coding: utf-8 -*-
"""
Created on Sat Sep  4 10:47:18 2021

@author: vanth
"""
#!/usr/bin/python
import sys
import pickle 
import pandas as pd 
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse

# print (sys.argv[1])
print ('User-user CF, RMSE =')
with open('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/rs.pickle', mode='rb') as f:
        object_pi2 = pickle.load(f)
        print(object_pi2)