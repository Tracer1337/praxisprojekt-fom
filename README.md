# Praxisprojekt
**Entwicklung eines Fahrassistenzsystems**

## GSDB Datensatz

**[Download](https://sid.erda.dk/public/archives/ff17dc924eba88d5d01a807357d6614c/published-archive.html)**

### Konvertierung der Originalbilder

Um die originalen Bilder im .ppm Format zu .jpg (oder jegliche weitere Formate) zu konvertieren, kommt das Tool "ImageMagick" zum Einsatz.

Über Docker unter Windows kann es z.B. so verwendet werden:

```bash
# Starte ImageMagick im Docker Container
docker run -v %cd%:/imgs --entrypoint /bin/bash --rm -it dpokidov/imagemagick
# Navigiere in das Verzeichnis des Datensatzes
cd FullIJCNN2013/
# Konvertiere alle Bilder im aktuellen Verzeichnis von .ppm zu .jpg
mogrify -format jpg *.ppm
```
