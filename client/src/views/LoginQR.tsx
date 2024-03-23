import { useEffect, useMemo, useRef, useState } from "react";
import { toDataURL } from "qrcode";

import { getLoginQR, getLoginQRAuthenticate, getLoginQRStatus } from "../api/auth";
import FormMessage from "../components/shared/FormMessage";
import { useNavigate } from "react-router-dom";

function LoginQR() {
  const navigate = useNavigate();
  const qrImage = useRef<HTMLImageElement>(null);

  const [qrLoaded, setQrLoaded] = useState(false);
  const [qrReady, setQrReady] = useState(false);

  const requestedId = useRef<boolean>(false);
  const [id, setId] = useState("");

  const qrStatusInterval = useRef<NodeJS.Timeout>();

  const getId = async () => {
    // prevent multiple requests
    if (requestedId.current) return;
    requestedId.current = true;

    const res = await getLoginQR();
    if (!res.success) {
      alert("Failed to get login QR code.");
      setId("");
      return;
    }

    setId(res.data.id);
    console.log(res.data.id);
  };

  const loadQRImage = async () => {
    if (!id) return;

    const image = qrImage.current;
    if (!image) return;

    const url = await toDataURL(id, {
      margin: 2,
    });

    image.src = url;
    setQrLoaded(true);
  };

  const createQrStatusInteval = () => {
    if (qrStatusInterval.current) clearInterval(qrStatusInterval.current);

    qrStatusInterval.current = setInterval(async () => {
      const status = await getLoginQRStatus(id);
      if (!status.success) {
        console.error(status.data.error);
        return;
      }

      console.log("qr status: " + status.data.status);

      if (status.data.status !== "ready") {
        return;
      }

      clearInterval(qrStatusInterval.current);
      setQrReady(true);

      const auth = await getLoginQRAuthenticate(id);
      if (!auth.success) {
        console.error(auth.data.error);
        return;
      }

      navigate("/");
    }, 1000);
  };

  useEffect(() => {
    getId();
  }, []);

  useEffect(() => {
    loadQRImage();
    createQrStatusInteval();
  }, [id]);

  return (
    <main className="flex w-full h-screen justify-center items-center flex-col gap-6">
      <h1 className="w-full text-center text-4xl font-bold mb-4">Login</h1>

      <div className="rounded-xl p-6 bg-gray-300 max-w-xl w-full aspect-square flex justify-center items-center relative overflow-hidden">
        {qrReady && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-lg">
            <FormMessage purpose="success">Logging in...</FormMessage>
          </div>
        )}

        <img
          ref={qrImage}
          className={!qrLoaded ? "none" : "rounded-lg w-full h-full [image-rendering:pixelated] select-none"}
          draggable="false"
        />

        {!qrLoaded && <p className="font-semibold animate-pulse">Loading QR Code...</p>}
      </div>
    </main>
  );
}

export default LoginQR;
