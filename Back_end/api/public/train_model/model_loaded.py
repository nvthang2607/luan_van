# -*- coding: utf-8 -*-
"""
Created on Sat Nov 20 18:54:30 2021

@author: vanth
"""
import pickle
import sys
# import numpy as np
from model_saved import CF

loaded_model=""
if __name__=='__main__':
    # with open('C:/Users/vanth/Desktop/LUAN_VAN/Back_end/api/public/train_model/model.pickle', 'rb') as f:
    #     loaded_model = pickle.load(f)
    with open('D:/luan_van/Back_end/api/public/train_model/model.pickle', 'rb') as f:
        loaded_model = pickle.load(f)
    
    #web
    r_cols = ['user_id', 'item_id', 'rating']
    loaded_model.fit()
    u=loaded_model.recommend(int(sys.argv[1]))
    object_i =u[:,0]
    for i in object_i:
        print(int(i))
        
        
    # a=np.array([[943,1,5]])
    # loaded_model.add(a)
    # loaded_model.fit()
    # print(loaded_model.pred(1,10))
    # pickle.dump(loaded_model, open('model.pickle', 'wb'))

# loaded_model = pickle.load(open('thang.pickle', 'rb'))
# a=np.array([[943,1,1]])
# loaded_model.add(a)
# loaded_model.fit()
# pickle.dump(loaded_model, open('thang.pickle', 'wb'))