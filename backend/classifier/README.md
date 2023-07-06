# How to run?

    sudo apt-get install python3.10-dev python3.10-venv

    cd backend/classifier

    python3.10 -m venv venv

    source venv/bin/activate

    pip install -r requirements.txt
    
    uvicorn app:app

Go to `http://127.0.0.1:8000/docs` and use swagger.
