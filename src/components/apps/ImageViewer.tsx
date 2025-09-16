import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Download, Image as ImageIcon } from 'lucide-react';

const ImageViewer = () => {
  const [selectedImage, setSelectedImage] = useState('/placeholder.svg');
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const sampleImages = [
    { name: 'Sample 1.jpg', url: '/placeholder.svg' },
    { name: 'Sample 2.jpg', url: '/placeholder.svg' },
    { name: 'Sample 3.jpg', url: '/placeholder.svg' },
  ];

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 400));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 25));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r p-4">
        <h3 className="font-semibold mb-3 text-gray-800">Images</h3>
        <div className="space-y-2">
          {sampleImages.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(img.url)}
              className={`w-full flex items-center space-x-2 p-2 rounded text-left transition-colors ${
                selectedImage === img.url ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-200'
              }`}
            >
              <ImageIcon size={16} />
              <span className="text-sm truncate">{img.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main View */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm font-medium min-w-16 text-center">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              title="Rotate"
            >
              <RotateCw size={18} />
            </button>
          </div>
          
          <button
            className="flex items-center space-x-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Download"
          >
            <Download size={16} />
            <span>Download</span>
          </button>
        </div>

        {/* Image Display */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white shadow-lg rounded">
            <img
              src={selectedImage}
              alt="Viewing"
              className="max-w-none"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transition: 'transform 0.2s ease-in-out'
              }}
            />
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-50 border-t px-4 py-2 text-sm text-gray-600">
          Image Viewer - {zoom}% - {selectedImage.split('/').pop()}
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;