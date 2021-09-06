# -*- coding: utf-8 -*-
"""
Created on Wed Sep  1 22:07:17 2021

@author: vanth
"""

import pickle 
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse
import sklearn
from scipy import spatial


#load file
train = pd.read_csv('ua.base',delimiter='\t', names=['id_user', 'id_item','rating','time'])
user = pd.read_csv('u.user',delimiter='|', names=['id_user','age','F','address','time'])
user=user.iloc[:, 0]
item = pd.read_csv('u.item',delimiter='|',encoding='latin-1')
item=item.iloc[:, 0]
# bỏ các giá trị NA và cột time không cần thiết
trains = train.dropna()
trains.drop('time',axis='columns', inplace=True)
trains.head()

# có 943 user và 1682 item
print(trains.shape)
n_user=trains.id_user.nunique()
print('number of user: ',n_user)
n_item=trains.id_item.nunique()
print('number of item: ',n_item)


#user đánh giá item
user_item_rating = trains.pivot ('id_user', 'id_item', 'rating'). fillna (0) 
print(user_item_rating.shape)
#có 2 cách tính độ tương tự của các user
Sim2 = cosine_similarity(user_item_rating)
Sim = cosine_similarity(user_item_rating,user_item_rating)
Sim = np.round(Sim, decimals = 2)

object_pi =[Sim,user]
file_pi = open ('filename_pi.pickle', 'wb') 
pickle.dump (object_pi, file_pi)   
