import { useEffect, useState } from 'react';

interface Props {
  mediaSrc: string;
  isImage: boolean;
  shouldLoad?: boolean;
}

export const useMediaPreload = (props: Props) => {
  const { shouldLoad = true, mediaSrc, isImage } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  //Handle images
  useEffect(() => {
    if (!isImage || !shouldLoad || !mediaSrc) {
      return;
    }
    const onMediaLoad = () => {
      setIsLoaded(true);
    };

    const image = new Image();
    image.src = mediaSrc;

    if (image.complete) {
      return setIsLoaded(true);
    }

    const load = () => onMediaLoad();

    image.addEventListener('load', load);
    return () => {
      image.removeEventListener('load', load);
    };
  }, [isImage, mediaSrc, shouldLoad]);

  //Handle videos
  useEffect(() => {
    if (isImage || !shouldLoad || !mediaSrc) {
      return;
    }

    const onMediaLoad = () => {
      setIsLoaded(true);
    };

    const videoEl = document.createElement('video');
    videoEl.setAttribute('src', mediaSrc);

    videoEl.addEventListener('canplay', onMediaLoad);
    videoEl.addEventListener('loadedmetadata', onMediaLoad);

    return () => {
      videoEl.removeEventListener('canplay', onMediaLoad);
      videoEl.removeEventListener('loadedmetadata', onMediaLoad);
    };
  }, [isImage, mediaSrc, shouldLoad]);

  return { isLoaded };
};
