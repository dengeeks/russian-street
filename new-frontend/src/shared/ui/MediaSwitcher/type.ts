import { ImageProps } from 'next/image'
import { IframeHTMLAttributes } from 'react'

type KnownVideoSource = 'youtube' | 'vk' | 'rutube';

export type VideoSource = {
  type: KnownVideoSource;
  id: string;
};

export type MediaSwitcherProps =
  | ({
  type: 'photo'
  src: string
  alt: string
} & Omit<ImageProps, 'src' | 'alt'>)
  | ({
  type: 'video'
  source: VideoSource;
} & IframeHTMLAttributes<HTMLIFrameElement>)