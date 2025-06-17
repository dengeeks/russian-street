import './MediaSwitcher.css'
import Image from 'next/image'
import type { MediaSwitcherProps } from '@/shared/ui/MediaSwitcher/type'
import { getImageUrl } from '@/shared/utils/getImageUrl'

const MediaSwitcher = (props: MediaSwitcherProps) => {
  if (props.type === 'video') {
    const { source, ...iframeProps } = props;
    const { type, id } = source;

    let src = '';

    switch (type) {
      case 'youtube':
        src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=${id}`;
        break;
      case 'vk':
        src = `https://vk.com/video_ext.php?oid=${id.split('_')[0]}&id=${id.split('_')[1]}&autoplay=1&muted=1&hd=1`;
        break;
      case 'rutube':
        src = `https://rutube.ru/play/embed/${id}?autoplay=1&muted=1&ui=0`;
        break;
    }
    return (
      <iframe
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="video"
        {...iframeProps}
      />
    )
  }

  const { src, alt, ...imageProps } = props
  return <Image src={getImageUrl(src)} alt={alt} {...imageProps} fill priority />
}

export default MediaSwitcher
