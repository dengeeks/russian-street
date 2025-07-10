import "./ArticleCard.css";
import Link from 'next/link'
import Image from 'next/image'
import {ArticleCardType} from "../model/type"
import { getImageUrl } from '@/shared/utils/getImageUrl'
import { formatDate } from '@/shared/utils/formatDate'
import { ReactNode } from 'react'

interface ArticleCardProps extends ArticleCardType{
  linkPath?: string;
  children?: ReactNode
}

const ArticleCard = ({title, card_image, city, starting_date, linkPath='/', children}: ArticleCardProps) => {
  return (
    <article className="article-card">
      <div className="article-img-wrapper">
        <Link href={linkPath}>
          <Image src={getImageUrl(card_image)} fill alt={title} sizes="(min-width: 1220px) 592px, (max-width: 632px) calc(100vw - 32px), 100vw"/>
        </Link>

        <div
          className="article-card-favorite-toggle"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.preventDefault()}
        >
          {children}
        </div>
      </div>
        <Link href={linkPath} className="article-card-info">
          <span className="article-card-info-title">{title}</span>
          <p>
              {starting_date ? `${formatDate(starting_date)}, ` : ''}г.{city}
          </p>
        </Link>
    </article>
  )
}

export default ArticleCard;