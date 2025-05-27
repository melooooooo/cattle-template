"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Navigation from "@/components/navigation";
import Link from "next/link";

export default function DownloadPage() {
  const [downloadStatus, setDownloadStatus] = useState<{[key: string]: boolean}>({});

  const handleDownload = async (platform: string) => {
    const apiUrl = `/api/download?platform=${platform}`;
    
    if (downloadStatus[platform]) {
      return; // Prevent repeated clicks
    }

    setDownloadStatus(prev => ({ ...prev, [platform]: true }));
    
    try {
      // First get download link from API
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`Server error (${response.status}), please try again later`);
      }
      
      const data = await response.json();
      
      // Create download link
      const link = document.createElement('a');
      link.href = data.url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert(error instanceof Error ? error.message : 'Download failed, please try again later');
    } finally {
      setDownloadStatus(prev => ({ ...prev, [platform]: false }));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* 整个页面使用grassland-section类 */}
      <div className="w-full grassland-section min-h-screen">
        {/* Use the Navigation component */}
        <Navigation />

        {/* Download Title */}
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4">
          <h1 className="text-3xl font-bold text-center text-green-800">Download Crazy Cattle 3D</h1>
          <p className="text-center text-green-700 mt-2">
            Experience the full game on your preferred platform
          </p>
        </div>

        {/* Download Options */}
        <div className="w-full max-w-6xl mx-auto p-4 my-6">
          <div className="bg-green-100 p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-green-800 mb-6 text-center">Select Your Platform</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-200 p-6 rounded-lg text-center shadow-sm">
                <h3 className="text-lg font-bold text-green-800 mb-4">Windows</h3>
                <p className="text-green-700 mb-4 text-sm">
                  Optimized for Windows 10 and 11<br />
                  Requires DirectX 11 compatible GPU<br />
                  500MB free disk space
                </p>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white w-full relative"
                  onClick={() => handleDownload('windows')}
                  disabled={downloadStatus['windows']}
                >
                  {downloadStatus['windows'] ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-80 rounded">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download for Windows
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-green-200 p-6 rounded-lg text-center shadow-sm">
                <h3 className="text-lg font-bold text-green-800 mb-4">macOS</h3>
                <p className="text-green-700 mb-4 text-sm">
                  Compatible with macOS 10.14+<br />
                  Optimized for Apple Silicon<br />
                  500MB free disk space
                </p>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white w-full relative"
                  onClick={() => handleDownload('macos')}
                  disabled={downloadStatus['macos']}
                >
                  {downloadStatus['macos'] ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-80 rounded">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download for macOS
                    </>
                  )}
                </Button>
              </div>
              
              <div className="bg-green-200 p-6 rounded-lg text-center shadow-sm">
                <h3 className="text-lg font-bold text-green-800 mb-4">Linux</h3>
                <p className="text-green-700 mb-4 text-sm">
                  Works on Ubuntu 18.04+<br />
                  Compatible with most distros<br />
                  500MB free disk space
                </p>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white w-full relative"
                  onClick={() => handleDownload('linux')}
                  disabled={downloadStatus['linux']}
                >
                  {downloadStatus['linux'] ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-80 rounded">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    </div>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download for Linux
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-green-700 mb-6">
                All downloads include the full game with all features unlocked. No registration required.
              </p>
              
              <Button asChild className="bg-green-700 hover:bg-green-800 text-white">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 