import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { 
  WeiboIcon, 
  QQIcon, 
  MailIcon 
} from './social-icons';
import { useTranslation } from '@/lib/language-context';

interface ShareButtonsProps {
  title: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const { t } = useTranslation();
  const [copySuccess, setCopySuccess] = useState(false);
  const [showXiaohongshuGuide, setShowXiaohongshuGuide] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleWeiboShare = () => {
    const weiboUrl = `http://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
    window.open(weiboUrl, '_blank');
  };

  const handleQQShare = () => {
    window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`);
  };

  const handleXiaohongshuShare = async () => {
    setShowXiaohongshuGuide(true);
    try {
      // 获取当前页面的截图
      const element = document.querySelector('.product-container') as HTMLElement;
      if (element) {
        const canvas = await html2canvas(element);
        const image = canvas.toDataURL('image/png');
        
        // 创建下载链接
        const link = document.createElement('a');
        link.href = image;
        link.download = `${title}-分享图.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error('Failed to generate share image:', err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-5 my-8">
      <span className="text-gray-600 text-base font-medium">{t('share.title')}</span>
      <div className="flex items-center gap-4">
        {/* 微博分享 */}
        <button
          onClick={handleWeiboShare}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#E6162D] hover:bg-[#D9151D] transition-colors shadow-md hover:shadow-lg transform hover:scale-110"
          title={t('share.weibo')}
        >
          <WeiboIcon className="w-6 h-6 text-white" />
        </button>

        {/* QQ分享 */}
        <button
          onClick={handleQQShare}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#12B7F5] hover:bg-[#0FA5E0] transition-colors shadow-md hover:shadow-lg transform hover:scale-110"
          title={t('share.qq')}
        >
          <QQIcon className="w-6 h-6 text-white" />
        </button>

        {/* 小红书分享 */}
        <button
          onClick={handleXiaohongshuShare}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FF2442] hover:bg-[#E61E3C] transition-colors shadow-md hover:shadow-lg transform hover:scale-110"
          title={t('share.xiaohongshu')}
        >
          <span className="text-white font-bold text-base">红</span>
        </button>

        {/* 复制链接 */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md hover:shadow-lg transform hover:scale-110"
          title={t('share.copyLink')}
        >
          <MailIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>
      {copySuccess && (
        <div className="text-base text-green-600 ml-2 font-medium">
          {t('share.copied')}
        </div>
      )}
      {showXiaohongshuGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-bold mb-4">{t('share.xiaohongshuGuide.title')}</h3>
            <ol className="list-decimal list-inside space-y-2 text-base">
              <li>{t('share.xiaohongshuGuide.step1')}</li>
              <li>{t('share.xiaohongshuGuide.step2')}</li>
              <li>{t('share.xiaohongshuGuide.step3')}</li>
              <li>{t('share.xiaohongshuGuide.step4')}</li>
              <li>{t('share.xiaohongshuGuide.step5')}</li>
            </ol>
            <button
              onClick={() => setShowXiaohongshuGuide(false)}
              className="mt-6 px-6 py-2.5 bg-[#FF2442] text-white rounded-full hover:bg-[#E61E3C] text-base font-medium"
            >
              {t('share.xiaohongshuGuide.button')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons; 