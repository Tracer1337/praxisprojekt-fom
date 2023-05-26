import { useState, useEffect } from "react";

function useImage(src: string) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const newImage = new Image();
    newImage.src = src;

    setImage(null);

    newImage.addEventListener("load", () => setImage(newImage));
  }, [src]);

  return image;
}

export default useImage;
