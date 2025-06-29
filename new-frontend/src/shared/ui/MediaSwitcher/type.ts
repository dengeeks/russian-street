import { ImageProps } from 'next/image'
import { IframeHTMLAttributes } from 'react'

type KnownVideoSource = 'youtube' | 'vk' | 'rutube';

export type VideoSource = {
  type: KnownVideoSource;
  id: string;
};

export type MediaSwitcherProps =
  | ({
  type: 'image'
  src: string | null;
  alt: string
} & Omit<ImageProps, 'src' | 'alt'>)
  | ({
  type: 'video_url'
  source: VideoSource;
} & IframeHTMLAttributes<HTMLIFrameElement>)