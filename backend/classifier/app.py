from typing import Dict, Union

import pandas as pd
from fastapi import FastAPI

from utils.model import Unpickler


app = FastAPI(debug=True)
with open('ml_model/model.pickle', 'rb') as f:
    unpickler = Unpickler(f)
    pipeline = unpickler.load()


@app.post('/predict_advertisement')
async def predict_advertisement(text: str) -> Dict[str, Union[int, float]]:
    negative, positive = pipeline.predict_proba(pd.Series(text))[0]
    class_index = 0 if negative > positive else 1
    return {
        'classIndex': class_index,
        'prob': negative if class_index == 0 else positive
    }
