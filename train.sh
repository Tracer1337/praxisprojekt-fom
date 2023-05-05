git clone https://github.com/Tracer1337/praxisprojekt-fom.git
cd praxisprojekt-fom/yolov5/
python train.py --img 1280 --epochs 300 --batch-size 4 --data gtsdb.yaml --weights yolov5s.pt
