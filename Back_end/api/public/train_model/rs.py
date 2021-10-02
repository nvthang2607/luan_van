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
        # ép kiểu float cho các giá trị trong ma trận
        self.Ybar_data=self.Ybar_data.astype(np.float)
        # đặt giá trị trung bình cho các user (943) (hình a)
        self.mu = np.zeros((self.n_users,))
        
        # chạy qua các user_id để tính giá trị chuẩn hóa (hình b)
        for n in range(self.n_users):
            # chuyển user_id thành số nguyên
            ids = np.where(users == n)[0].astype(np.int32)
            # Lấy rating của những đánh giá đó
            ratings = self.Y_data[ids, 2]
            # lấy giá trị R trung bình của user
            self.mu[n] = np.mean(ratings)
            # print('***',n,':',ratings)
            self.Ybar_data[ids, 2] = ratings - self.mu[n]
        # return  self.Ybar_data[:,2]
        self.Ybar = sparse.coo_matrix((self.Ybar_data[:, 2],
            (self.Ybar_data[:, 1], self.Ybar_data[:, 0])), (self.n_items, self.n_users))
        self.Ybar = self.Ybar.tocsr()
        # return self.Ybar

    def similarity(self):
        self.S = self.dist_func(self.Ybar.T, self.Ybar.T)

    def fit(self):
        self.normalize_Y()
        self.similarity()

    def pred(self, u, i):
        """
        predict the rating of user u for item i (normalized)
        if you need the un
        """
        # lấy vị trí trong mảng những đánh giá i
        ids = np.where(self.Y_data[:, 1] == i)[0].astype(np.int32)
        # lấy id user đánh giá i
        users_rated_i = (self.Y_data[ids, 0]).astype(np.int32)
        # Độ tương tự của user khác đánh giá i so với u
        sim = self.S[u, users_rated_i]
        # lấy k user gần u nhất
        a = np.argsort(sim)[-self.k:]
        # lấy mức độ tương tự tương ứng
        nearest_s = sim[a]
        # How did each of 'near' users rate item i
        r = self.Ybar[i, users_rated_i[a]]
        # print(u,' đánh giá ',i,' là: ',(r*nearest_s)[0]/(np.abs(nearest_s).sum() + 1e-8) + self.mu[u])
        return (r*nearest_s)[0]/(np.abs(nearest_s).sum() + 1e-8) + self.mu[u]


    def recommend(self, u):
        # Find all rows corresponding to user u
        ids = np.where(rate_train[:, 0] == u)[0]
        items_rated_by_u = self.Y_data[ids, 1].tolist()
        recommended_items = []
        for i in range(self.n_items):
            if i not in items_rated_by_u:
                rating = self.pred(u, i)
                if rating > 0:
                    recommended_items.append([i,rating])
        # print(u)
        # print(recommended_items )
        recommended_items = np.array(recommended_items)
        recommended_items=recommended_items[np.argsort(recommended_items[:, 1])]
        recommended_items=recommended_items[::-1]
        return recommended_items
    def print_recommendation(self):
        # print ('Recommendation: ')
        for u in range(self.n_users):
            recommended_items = self.recommend(u)
            # for i in recommended_items:
                # print ('    for user ', u+1, ': ', i[1:2])

#train
# r_cols = ['user_id', 'item_id', 'rating', 'unix_timestamp']


# #2 dòng dưới của thắng chạy
# ratings_base = pd.read_csv('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/ua.base', sep='\t', names=r_cols, encoding='latin-1')
# ratings_test = pd.read_csv('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/ua.test', sep='\t', names=r_cols, encoding='latin-1')
# # #2 dòng dưới của sang chạy
# # # ratings_base = pd.read_csv('D:/luan_van/Back_end/api/public/train_model/ua.base', sep='\t', names=r_cols, encoding='latin-1')
# # # ratings_test = pd.read_csv('D:/luan_van/Back_end/api/public/train_model/ua.test', sep='\t', names=r_cols, encoding='latin-1')
# # # # bắt đầu từ 0
# ratings_base.drop('unix_timestamp',axis='columns', inplace=True)
# ratings_test.drop('unix_timestamp',axis='columns', inplace=True)


# rate_train = ratings_base.values
# rate_test = ratings_test.values
# # # n_train = rate_train.shape[0]
# # # n_tests = rate_test.shape[0]

# rs = CF(rate_train, k = 50)
# rs.fit()
# # u=rs.recommend(1)
# # print(rs.pred(1,33))
# SE = 0 # squared error

# for n in range(n_tests):
#     pred = rs.pred(rate_test[n, 0], rate_test[n, 1])
#     SE +=((pred - rate_test[n, 2])**2)

# RMSE = np.sqrt(SE/n_tests)
# print ('User-user CF, RMSE =', RMSE)


#web
r_cols = ['user_id', 'item_id', 'rating']
# ratings_base = pd.read_csv('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/train_web.csv', sep=' ', names=r_cols, encoding='latin-1')
ratings_base = pd.read_csv('D:/luan_van/Back_end/api/public/train_model/train_web.csv', sep=' ', names=r_cols, encoding='latin-1')

rate_train = ratings_base.values
n_train = rate_train.shape[0]
rs = CF(rate_train, k = 50)
rs.fit()
u=rs.recommend(int(sys.argv[1]))
object_i =u[:,0]
for i in object_i:
    print(int(i))
