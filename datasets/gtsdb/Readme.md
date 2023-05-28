# German Traffic Sign Detection Benchmark

**[Download](https://sid.erda.dk/public/archives/ff17dc924eba88d5d01a807357d6614c/published-archive.html)**

### Konvertierung der Originalbilder

Um die originalen Bilder aus dem .ppm Format zu .jpg (oder in jegliche weitere Formate) zu konvertieren, kann das Tool "ImageMagick" verwendet werden.

Über Docker unter Windows kann es z.B. so verwendet werden:

```bash
# Starte ImageMagick im Docker Container
docker run -v %cd%:/imgs --entrypoint /bin/bash --rm -it dpokidov/imagemagick
# Navigiere in das Verzeichnis des Datensatzes
cd datasets/gtsdb
# Konvertiere alle Bilder im aktuellen Verzeichnis von .ppm zu .jpg
mogrify -format jpg *.ppm
```

### Generierung der Labels für YOLOv5

Das Skript `create-yolo-labels.js` erstellt auf Basis der Daten aus `gt.json` ein neues Verzeichnis `labels`, in dem die Daten im YOLOv5-Format ausgegeben werden. https://docs.ultralytics.com/yolov5/tutorials/train_custom_data/#12-create-labels_1

Werden in das Array `OBJECT_IDS` im Quellcode des Skriptes Werte eingetragen, so werden ausschließlich zu den dort angegebenen Objekten Labels nach `labels` ausgegeben. Dies kann nützlich sein, um die Komplexität des trainierten Modells zu reduzieren. Alle verfügbaren Werte sind in der Datei `ReadMe.txt` ab Zeile 40 aufgelistet.
