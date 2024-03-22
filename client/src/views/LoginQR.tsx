import { useRef, useState } from "react";

function LoginQR() {
  const qrLoaded = false;
  const qrImage = useRef<HTMLImageElement>(null);

  return (
    <main className="flex w-full h-screen justify-center items-center flex-col gap-6">
      <h1 className="w-full text-center text-4xl font-bold mb-4">Login</h1>

      <div className="rounded-xl p-6 bg-gray-300 max-w-xl w-full aspect-square flex justify-center items-center">
        {qrLoaded ? (
          <img ref={qrImage} src="" alt="QR Code" className="rounded-lg" />
        ) : (
          <p className="font-semibold animate-pulse">Loading QR Code...</p>
        )}
      </div>
    </main>
  );
}

export default LoginQR;
