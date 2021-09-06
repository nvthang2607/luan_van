import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.metrics.pairwise import cosine_similarity
from scipy import sparse
import sklearn
from scipy import spatial
import math
from sklearn.metrics import mean_squared_error 

#load file
train = pd.read_csv('ua.base',delimiter='\t', names=['id_user', 'id_item','rating','time'])

# bỏ các giá trị NA và cột time không cần thiết
trains = train.dropna()
trains.drop('time',axis='columns', inplace=True)
trains.head()
user = pd.read_csv('u.user',delimiter='|', names=['id_user','age','F','address','time'])
user=user.iloc[:, 0]
item = pd.read_csv('u.item',delimiter='|',encoding='latin-1',names=['id_item','t1','t2'
                                                                    ,'t3','t4','t5','t6'
                                                                    ,'t7','t8','t9','t10'
                                                                    ,'t11','t12','t13','t14'
                                                                    ,'t15','t16','t17','t18'
                                                                    ,'t19','t20','t21','t22','t23'])
item=item.iloc[:, 0]

# có 943 user và 1682 item
#print(trains.shape)
n_user=trains.id_user.nunique()
print('number of user: ',n_user)
n_item=trains.id_item.nunique()
print('number of item: ',n_item)


#user đánh giá item
user_item_rating = trains.pivot ('id_user', 'id_item', 'rating'). fillna (0) 
#print(user_item_rating.shape)
#có 2 cách tính độ tương tự của các user
Sim2 = cosine_similarity(user_item_rating)
Sim = cosine_similarity(user_item_rating,user_item_rating)
Sim = np.round(Sim, decimals = 2)
#Sim=Sim.astype(np.float)

x1=[[1,2],[3,4]]
x2=pd.DataFrame(x1)
x3=[[5,6],[7,6]]
x4=pd.DataFrame(x3)
MSE = mean_squared_error(x2, x4)
RMSE=math.sqrt(MSE)


print("Root Mean Square Error:\n")
print(MSE)

# dự đoán
def estiamte(i1,k):
    # print(id_user)
    user_item_rating2=user_item_rating
    print(i1,'*************************')
    #danh sách láng giềng của user i1
    # tạo dataframe rỗng
    user_knn=pd.DataFrame()
    for i2 in user:
        if(i1!=i2):
            new_row = {'id':i2-1,'rating':Sim[i2-1][i1-1]}
            #append row to the dataframe
            user_knn = user_knn.append(new_row, ignore_index=True)
            #print(i2,': ',Sim[i1][i2-1])
    user_knn=user_knn.sort_values(by=['rating'], ascending=False)
    user_knn=user_knn.iloc[:k]
    user_knn=user_knn.to_numpy()
    # print('có')
    # lấy đánh giá của user
    rating=user_item_rating[:][i1-1:i1]
    # tổng đánh giá của user đối với tất cả sản phẩm:
    n=float((rating == 0).sum(axis=1))
    # print(n)
    r_u1=float(rating.sum(axis=1))
    r_u1=r_u1/(n_item-n)
    print('--r_ui= ',r_u1)
    
    for i3 in rating:
        print('i3= ',i3)
        t1=0
        t2=0
        if(rating[i3][i1]==0):
            # user_item_rating2[i3][i1]=-1
            # lấy id của user láng giềng
            for i4 in user_knn:
                # print('----------user2: ',i4[0])
                sim_uu=float(i4[1])
                # print(sim_uu)
                r_u2=user_item_rating[:][int(i4[0])-1:int(i4[0])]
                n2=float((r_u2 == 0).sum(axis=1))
                # print(n2)
                r_u2=float(r_u2.sum(axis=1))
                r_u2=r_u2/(n_item-n2)
                r_u2i=user_item_rating[:][int(i4[0])-1:int(i4[0])]
                r_u2i=float(r_u2i[i3])
                # print(r_u2i)
                t1=t1+(sim_uu*(r_u2i-r_u2))
                t2=t2+sim_uu
                print(r_u2i-r_u2)
                t2=abs(t2)
            # print('++++t1: ',t1)
            # print('++++t2: ',t2)
            user_item_rating2[i3][i1]=r_u1+(t1/t2)
            print('++++tong: ',r_u1+(t1/t2))
            break
    return n2
        
        #chạy qua tất cả item trong bảng user_item_rating
        
    
    #print(Sim[0][0])
    # a=Sim
    # #print (a)
    # a.sort()
    # a=a[::-1]
    # print(a)
u=estiamte(1,10)