'use client';

import { useEffect, useRef } from 'react';

export default function KakaoMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

    const initMap = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch('울산 남구 문수로335번길 6', (result, status) => {
          if (status !== window.kakao.maps.services.Status.OK) return;
          if (!mapRef.current) return;

          const coords = new window.kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x),
          );

          const map = new window.kakao.maps.Map(mapRef.current, {
            center: coords,
            level: 3,
          });

          const marker = new window.kakao.maps.Marker({
            map,
            position: coords,
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content:
              '<div style="padding:5px;font-size:12px;">1.6수학과학학원</div>',
          });

          infowindow.open(map, marker);
        });
      });
    };

    if (window.kakao) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services&autoload=false`;
    script.async = true;
    script.onload = initMap;
    script.onerror = () => {
      console.error('[KakaoMap] 스크립트 로드 실패');
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-56 md:h-80 lg:h-[450px] rounded-xl"
      aria-label="학원 위치 지도"
    />
  );
}
