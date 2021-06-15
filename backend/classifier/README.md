# How to run?

    sudo apt-get install python3.8-dev python3.8-venv

    cd backend/classifier

    python3.8 -m venv venv

    source venv/bin/activate

    pip install -r requirements.txt
    
    uvicorn app:app

Go to `http://127.0.0.1:8000/docs` and use swagger.
