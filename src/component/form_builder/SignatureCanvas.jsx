import React, { useRef, useState, useEffect } from 'react';
import { FileText, X } from 'lucide-react';

const SignatureCanvas = ({ field_info, element, handleClearSignature, setSignatureImagePreview }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Setup drawing style
    ctx.strokeStyle = '#000000'; // Black color
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    context.lineTo(x, y);
    context.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      context.closePath();
      setIsDrawing(false);
      // Save the signature as image
      const dataUrl = canvasRef.current.toDataURL();
      setSignatureImagePreview(dataUrl);
    }
  };

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      handleClearSignature(element);
    }
  };

  return (
    <div className="relative border rounded-md">
      <canvas
        ref={canvasRef}
        className="w-full h-32 bg-gray-50 rounded-t-md border-b cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      
      {/* Bottom Controls Bar */}
      <div className="flex items-center justify-between p-2 bg-white rounded-b-md">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FileText size={16} className="text-gray-400" />
          <span>Signature</span>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={clearCanvas}
            className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
            title="Clear signature"
            type="button"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Required Indicator */}
      {field_info?.is_required && (
        <div className="absolute top-2 right-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
        </div>
      )}
    </div>
  );
};

export default SignatureCanvas;