from fastapi import FastAPI, File, UploadFile, HTTPException
import numpy as np
import tensorflow as tf
from PIL import Image
import io

app = FastAPI()

# Tải mô hình
try:
    model = tf.keras.models.load_model("./../Models/MobileNet_nx5.h5")
except Exception as e:
    raise RuntimeError(f"Không thể tải mô hình: {e}")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Kiểm tra định dạng file
        if file.content_type not in ["image/jpeg", "image/png"]:
            raise HTTPException(status_code=400, detail="Chỉ hỗ trợ file ảnh (JPEG, PNG).")

        # Đọc nội dung file và xử lý ảnh
        image = Image.open(io.BytesIO(await file.read()))
        image = image.convert("RGB")  # Đảm bảo ảnh là RGB
        image = image.resize((224, 224))  # Resize theo kích thước yêu cầu mô hình

        # Chuyển ảnh thành mảng NumPy và chuẩn hóa
        img_array = np.array(image) / 255.0  # Normalize
        img_array = img_array.reshape(1, 224, 224, 3)  # Thêm batch dimension

        # Dự đoán
        predictions = model.predict(img_array)
        return {"predictions": predictions.tolist()}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi xử lý ảnh: {e}")
