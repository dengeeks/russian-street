export const extractIframeSrc = (iframeHtml: string): string=> {
  const match = iframeHtml.match(/src="([^"]+)"/);
  return match ? match[1] : 'https://yandex.ru/map-widget/v1/?um=constructor%3A90c9c41c27645e685c0fcb9a931ca7c31f870f5ea1a75d4b7071608018a6c43c&amp;source=constructor';
};
