import numpy as np

class PageRankCalculator:

    async def calculate_pagerank(self, images):
        """
        计算所有图像的PageRank值，并更新数据库中的reward字段。
        """
        
        # 构建邻接矩阵
        num_images = len(images)
        adj_matrix = np.zeros((num_images, num_images))
        for i, img_i in enumerate(images):
            for j, img_j in enumerate(images):
                if img_i.source_image_id == img_j.id:
                    adj_matrix[i, j] = 1

        # 计算出链数
        outlink_count = np.sum(adj_matrix, axis=1)
        outlink_count[outlink_count == 0] = 1  # 避免除零错误
        adj_matrix_normalized = adj_matrix / outlink_count[:, np.newaxis]

        # 初始化PageRank值
        initial_pagerank = np.ones(num_images) / num_images
        pagerank = initial_pagerank.copy()

        # 设置参数
        damping_factor = 0.85  # 阻尼系数
        num_iterations = 10  # 迭代次数
        weight_like = 0.5
        weight_reference = 0.5

        # 迭代计算PageRank值
        for _ in range(num_iterations):
            new_pagerank = np.zeros(num_images)
            for i in range(num_images):
                incoming_pagerank = np.sum(pagerank * adj_matrix_normalized[:, i])
                new_pagerank[i] = (1 - damping_factor) + damping_factor * incoming_pagerank

            # 根据like_count调整pagerank值
            for i, img_i in enumerate(images):
                new_pagerank[i] = weight_reference * new_pagerank[i] + weight_like * img_i.like_count / np.sum([img.like_count for img in images])

            pagerank = new_pagerank

        # 添加归一化步骤
        pagerank_sum = np.sum(pagerank)
        if pagerank_sum > 0:
            pagerank /= pagerank_sum
        else:
            pagerank = np.ones(num_images) / num_images
        
        return pagerank
