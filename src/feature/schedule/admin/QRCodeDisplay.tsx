'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  classId: string;
  className: string;
}

export default function QRCodeDisplay({ classId, className }: Props) {
  const [open, setOpen] = useState(false);
  const url =
    typeof window !== 'undefined'
      ? `${window.location.origin}/schedule/${classId}`
      : `https://1-6math.vercel.app/schedule/${classId}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        QR 코드
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-xl max-w-xs w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-gray-800">{className} 링크 QR코드</h3>
            <QRCodeSVG value={url} size={200} />
            <p className="text-xs text-gray-500 text-center break-all">{url}</p>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => navigator.clipboard.writeText(url)}
                className="flex-1 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                링크 복사
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex-1 py-2 bg-gray-800 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
