# -*- coding: utf-8 -*-
"""
Created on Sat Sep  4 10:47:18 2021

@author: vanth
"""


import pickle 
file_pi2 = open ('filename_pi.pickle', 'rb') 
object_pi2 = pickle.load(file_pi2)
a=object_pi2[0]
b=object_pi2[1]
