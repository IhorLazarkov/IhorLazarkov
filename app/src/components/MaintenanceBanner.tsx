import { useEffect, useRef, useState } from 'react';
import './MaintenanceBanner.css';

const MaintenanceBanner = () => {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerHiding, setBannerHiding] = useState(false);

  // Auto-dismiss the banner after a delay
  useEffect(() => {
    if (!bannerVisible) return;
    const autoHideTimeout = setTimeout(() => setBannerHiding(true), 8000);
    return () => clearTimeout(autoHideTimeout);
  }, [bannerVisible])

  // Unmount only after the fade-out transition finishes
  useEffect(() => {
    if (!bannerHiding) return;
    const removeTimeout = setTimeout(() => setBannerVisible(false), 400);
    return () => clearTimeout(removeTimeout);
  }, [bannerHiding])

  // Reserve space for the fixed banner so it doesn't overlap page content
  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner || !bannerVisible) {
      document.documentElement.style.setProperty('--banner-height', '0px');
      return;
    }

    const updateHeight = () => {
      document.documentElement.style.setProperty('--banner-height', `${banner.offsetHeight}px`);
    };
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(banner);
    return () => observer.disconnect();
  }, [bannerVisible])

  if (!bannerVisible) return null;

  return (
    <div className={`warning banner${bannerHiding ? ' banner-hiding' : ''}`} role="alert" ref={bannerRef}
      style={{ width: "100%", height: "fit-content", position: "fixed", top: "0", left: "0", zIndex: 100 }}>
      <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        aria-hidden="true"
      ><path d="M330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm36-190 114-114 114 114 56-56-114-114 114-114-56-56-114 114-114-114-56 56 114 114-114 114 56 56Zm-2 110h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" /></svg>
      <div className="warning-content">
        <p>Maintenance scheduled for this weekend (August 1 - 2):</p>
        <ul>
          <li>Update CA Certificates</li>
        </ul>
      </div>
      <button type="button" className="warning-dismiss" aria-label="Dismiss maintenance notice"
        onClick={() => setBannerHiding(true)}>&times;</button>
    </div>
  );
};

export default MaintenanceBanner;
