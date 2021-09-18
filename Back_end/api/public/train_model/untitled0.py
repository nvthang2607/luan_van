# -*- coding: utf-8 -*-
"""
Created on Mon Sep  6 13:41:31 2021

@author: vanth
"""
import sys
import pickle
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse


#lớp CF
class CF(object):
    """docstring for CF"""
    def __init__(self, Y_data, k):
        # dữ liệu đầu vào:
        self.Y_data = Y_data
        # số lượng K láng giềng
        self.k = k
        # hàm tính độ tương tự là hàm cosine_similarity
        self.dist_func = cosine_similarity
        self.Ybar_data = None
        # id user lớn nhât
        self.n_users = int(np.max(self.Y_data[:, 0]))+1
        # id item lớn nhất
        self.n_items = int(np.max(self.Y_data[:, 1]))+1


    # hàm cập nhật dữ liệu
    def add(self,new_data):
        # cập nhật khi có thay đổi dữ liệu
        self.Y_data=np.concatenate((self.Y_data,new_data))
        # print(self.Y_data)
        # print('ok nha')
        self.Ybar_data = None
        # id user lớn nhât
        self.n_users = int(np.max(self.Y_data[:, 0]))+1
        # id item lớn nhất
        self.n_items = int(np.max(self.Y_data[:, 1]))+1

    # ma trận chuẩn hóa
    def normalize_Y(self):
        # id_user là dòng đầu của ma trận
        users = self.Y_data[:, 0]
        # ma trận y_bar
        self.Ybar_data = self.Y_data.copy()
        self.Ybar_data=self.Ybar_data.astype(np.float)
        # đặt giá trị trung bình cho các user (943)
        self.mu = np.zeros((self.n_users,))
        # chạy qua các user_id
        for n in range(self.n_users):
            # chuyển user_id thành số nguyên
            ids = np.where(users == n)[0].astype(np.int32)
            # Lấy rating của những đánh giá đó
            ratings = self.Y_data[ids, 2]
            # lấy giá trị R trung bình của user
            self.mu[n] = np.mean(ratings)
            # print('***',ratings)
            self.Ybar_data[ids, 2] = ratings - self.mu[n]
        # return  self.Ybar_data[:,2]
        self.Ybar = sparse.coo_matrix((self.Ybar_data[:, 2],
            (self.Ybar_data[:, 1], self.Ybar_data[:, 0])), (self.n_items, self.n_users))
        # return self.Ybar
        self.Ybar = self.Ybar.tocsr()
        # return self.Ybar

    def similarity(self):
        self.S = self.dist_func(self.Ybar.T, self.Ybar.T)
        # return self.S

    def fit(self):
        self.normalize_Y()
        self.similarity()
        # return  self.similarity()


r_cols = ['user_id', 'item_id', 'rating', 'unix_timestamp']


ratings_base = pd.read_csv('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/ua.base', sep='\t', names=r_cols, encoding='latin-1')
ratings_test = pd.read_csv('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/ua.test', sep='\t', names=r_cols, encoding='latin-1')

ratings_base.drop('unix_timestamp',axis='columns', inplace=True)
ratings_test.drop('unix_timestamp',axis='columns', inplace=True)


rate_train = ratings_base.values
rate_test = ratings_test.values
rs = CF(rate_train, k = 50)
object_pi =rs.fit()
file_pi = open ('thang.pickle', 'wb') 
pickle.dump (object_pi, file_pi)   