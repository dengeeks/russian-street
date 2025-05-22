import "./BannerHome.css";
import Image from 'next/image';
import Button from '@/shared/ui/Button';

const BannerHome = () => {
  return (
    <section className="banner-container">
      <div className="banner-video">
        <iframe
          src="https://www.youtube.com/embed/Ks0eHBSNFwA?si=feeupCeDCfAKIX3p&autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1&loop=1&playlist=Ks0eHBSNFwA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>
      </div>

      <div className="container banner-wrapper-content">
        <div className="banner-content">
          <div className="banner-logo-wrapper">
            <Image src="/logo-banner.png" className="banner-logo" fill alt="Улица России" />
          </div>
          <h1>общероссийская общественная организация уличной культуры и спорта</h1>
          <div className="banner-wrapper-button">
            <Button type="button">Участвовать</Button>
            <Button type="button" className="gray banner-wrapper-button-desktop">поддержать организацию</Button>
          </div>
        </div>
      </div>
    </section>
  )
};

export default BannerHome;
