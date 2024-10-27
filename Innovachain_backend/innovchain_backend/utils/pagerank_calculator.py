# pagerank_calculator.py

from datetime import datetime
import numpy as np
from sqlalchemy.orm import Session
from models.model import Base, Image
from services.images_service import ImageService
from models.model import User, UserStats

class PageRankCalculator:
    def __init__(self, db: Session):
        self.db = db
        self.image_service = ImageService(db)

    def calculate_pagerank(self):
        """
        计算所有图像的PageRank值，并更新数据库中的reward字段。
        """
        # 获取所有图像
        images = self.image_service.get_images_all()
        
        # 构建邻接矩阵
        num_images = len(images)
        adj_matrix = np.zeros((num_images, num_images))
        for i, img_i in enumerate(images):
            for j, img_j in enumerate(images):
                if img_i.source_image_id == img_j.id:
                    adj_matrix[i, j] = img_i.like_count * img_j.reference_count

        # 计算出链数
        outlink_count = np.sum(adj_matrix, axis=1)
        outlink_count[outlink_count == 0] = 1  # 避免除零错误

        # 初始化PageRank值
        initial_pagerank = np.ones(num_images) / num_images
        pagerank = initial_pagerank.copy()

        # 设置参数
        damping_factor = 0.85  # 阻尼系数
        num_iterations = 10  # 迭代次数

        # 迭代计算PageRank值
        for _ in range(num_iterations):
            for i in range(num_images):
                incoming_pagerank = np.sum(pagerank * adj_matrix[:, i] / outlink_count)
                pagerank[i] = (1 - damping_factor) + damping_factor * incoming_pagerank

        # 更新数据库中的reward字段
        for i, img in enumerate(images):
            img.reward += pagerank[i]
            self.db.refresh(img)
        self.db.commit()
        self.update_user_stats()

