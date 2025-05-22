import "./MediaSwitcher.css"
import {IframeHTMLAttributes} from 'react';
import Image, { ImageProps } from 'next/image';

type MediaSwitcherProps = | ({
  type: 'photo';
  src: string;
} & Omit<ImageProps, 'src'>)
  | ({
  type: 'video';
  src: string;
} & IframeHTMLAttributes<HTMLIFrameElement>);

const MediaSwitcher = (props: MediaSwitcherProps) => {
  if (props.type === 'video') {
    const { src, ...iframeProps } = props;
    return (
      <iframe
        src={src}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="video"
        {...iframeProps}
      />
    );
  }

  const { src, ...imageProps } = props;
  return <Image src={src} {...imageProps} />;
};

export default MediaSwitcher;