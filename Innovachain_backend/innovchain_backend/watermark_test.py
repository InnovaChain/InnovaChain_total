import cv2
from imwatermark import WatermarkEncoder, WatermarkDecoder

class ImageWatermarkProcessor:
    def __init__(self, image_path, watermark_text, output_image_path, embed_percentage=0.01, fill_char='~'):
        """
        初始化类参数。
        :param image_path: 输入图像的路径。
        :param watermark_text: 要嵌入的水印文本。
        :param output_image_path: 输出带水印图像的路径。
        :param embed_percentage: 使用图像的多少位数来嵌入水印，默认使用1%。
        :param fill_char: 用于填充水印不足部分的特殊字符。
        """
        self.image_path = image_path
        self.watermark_text = watermark_text
        self.output_image_path = output_image_path
        self.embed_percentage = embed_percentage
        self.fill_char = fill_char
        self.bit_length = 0  # 初始化位数

        # 读取图像并获取尺寸
        self.image = cv2.imread(self.image_path)
        if self.image is None:
            raise ValueError(f"Cannot load image from path: {self.image_path}")

        self.height, self.width, self.channels = self.image.shape

        # 计算总可用位数
        self.total_bits = self.height * self.width * self.channels

    def calculate_bit_length(self):
        """
        根据图像的大小和 embed_percentage 计算可用的比特数，并将其调整为8的倍数。
        """
        self.bit_length = int(self.total_bits * self.embed_percentage)

        # 调整为 8 的倍数
        if self.bit_length % 8 != 0:
            self.bit_length = (self.bit_length // 8 + 1) * 8

        print(f"Adjusted bit length for embedding (multiple of 8): {self.bit_length} bits")

    def encode_watermark(self):
        """
        将水印嵌入图像并保存为新图像。
        """
        self.calculate_bit_length()

        # 计算所需的字节数
        required_length = self.bit_length // 8

        # 如果水印文本长度不足，填充特殊符号
        if len(self.watermark_text) < required_length:
            self.watermark_text += self.fill_char * (required_length - len(self.watermark_text))

        print(f"Final watermark text (after filling): {self.watermark_text[:50]}...")  # 仅显示前50个字符

        # 初始化水印编码器并嵌入水印
        encoder = WatermarkEncoder()
        encoder.set_watermark('bytes', self.watermark_text.encode('utf-8'))
        encoded_image = encoder.encode(self.image, 'dwtDctSvd')

        # 保存带水印的图像
        cv2.imwrite(self.output_image_path, encoded_image)
        print(f"Watermarked image saved at: {self.output_image_path}")

    def decode_watermark(self):
        """
        从带水印的图像中解码水印并去除填充字符，返回原始水印内容。
        :return: 解码后的水印字符串（去除填充符号）。
        """
        try:
            # 读取带水印的图像
            watermarked_image = cv2.imread('test_wm_2.png')
            if watermarked_image is None:
                raise ValueError(f"Cannot load watermarked image from path: {self.output_image_path}")

            # 初始化水印解码器
            decoder = WatermarkDecoder('bytes', self.bit_length)

            # 解码水印
            watermark = decoder.decode(watermarked_image, 'dwtDctSvd')

            # 打印原始二进制数据以便调试
            print(f"Raw decoded watermark (binary): {watermark}")

            # 尝试解码水印内容为 UTF-8，并去除填充符号
            decoded_wm = watermark.decode('utf-8')

            # 去除填充符号并返回
            decoded_wm_clean = decoded_wm.rstrip(self.fill_char)
            print(f"Decoded Watermark (after removing fill characters): {decoded_wm_clean}")
            return decoded_wm_clean
        except UnicodeDecodeError as e:
            print(f"UnicodeDecodeError: {e}")
            print("The watermark data might be corrupted or improperly encoded.")
        except Exception as e:
            print(f"An error occurred during decoding: {e}")


# 使用示例：
if __name__ == "__main__":
    # 定义图像路径和水印文本
    input_image_path = 'test.png'
    watermarked_image_path = 'test_wm.png'
    watermark_text = 'Hello, Watermark!'  # 使用二进制水印
    print(f"Original watermark text: {watermark_text}")

    # 创建水印处理器对象
    processor = ImageWatermarkProcessor(
        image_path=input_image_path,
        watermark_text=watermark_text,
        output_image_path=watermarked_image_path,
        embed_percentage=0.001  # 减少嵌入百分比
    )

    # 编码水印
    processor.encode_watermark()

    # 解码水印
    decoded_watermark = processor.decode_watermark()
    print(f"Decoded binary watermark: {decoded_watermark}")
