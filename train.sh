git clone https://github.com/Tracer1337/praxisprojekt-fom.git
cd praxisprojekt-fom/yolov5/
python train.py --img 640 --epochs 3 --data gtsdb.yaml --weights yolov5s.pt
