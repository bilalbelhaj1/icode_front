import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { useState, useRef, useEffect } from "react";
import { verifyQrcode } from "../api/memberApi";
import Message from "./Message";
export default function ScannerControl() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isProcessing = useRef(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [message, setMessage] = useState<{type:string; message:string} | null>(null);
  const stopScanner = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current.clear();
      } catch (err) {
        console.error("Stop error", err);
      }
    }
    setIsScanning(false);
    isProcessing.current = false; 
  };

  const startScanner = async () => {
    if (isScanning) return;
    
    setLastResult(null);
    isProcessing.current = false;

    const divId = "reader";
    const html5QrCode = new Html5Qrcode(divId);
    scannerRef.current = html5QrCode;

    const config = {
      fps: 10, 
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0,
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
    };

    try {
      setIsScanning(true);
      await html5QrCode.start(
        { facingMode: "environment" }, 
        config,
        async (decodedText) => {
          if (isProcessing.current) return;
          isProcessing.current = true; 

          try {
            const res = await verifyQrcode({ token: decodedText });
            setMessage({type:"success", message:res.data.message || "Success"})
            setLastResult(decodedText);
          } catch (err: any) {
            const errorMsg = err.response?.data?.message || "Something went wrong";
            setMessage({type:"error", message:errorMsg})
          } finally {
            await stopScanner(); 
          }
        },
        (errorMessage) => {
          // This fires constantly while scanning, we leave it empty
        }
      );
    } catch (err) {
      console.error("Scanner start error:", err);
      setIsScanning(false);
      isProcessing.current = false;
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5 p-4">
      {message && Message(message.type, message.message)}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">QR Scanner</h2>
        <p className="text-sm text-gray-500">Point at a QR code to scan</p>
      </div>

      <div className="flex justify-center">
        {!isScanning ? (
          <button
            onClick={startScanner}
            className="px-6 py-2 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
          >
            Start Scan
          </button>
        ) : (
          <button
            onClick={stopScanner}
            className="px-6 py-2 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Stop
          </button>
        )}
      </div>
      <div 
        id="reader" 
        className="overflow-hidden rounded-2xl border-2 border-emerald-200 bg-black"
        style={{ minHeight: "300px" }} 
      />

      {lastResult && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl break-all">
          <strong className="text-emerald-700">Last Scanned:</strong> {lastResult}
        </div>
      )}
    </div>
  );
}