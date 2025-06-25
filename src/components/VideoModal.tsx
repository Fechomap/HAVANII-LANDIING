import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  videoTitle?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ 
  isOpen, 
  onClose,
  videoSrc,
  videoTitle = 'HAVANI Demo Video'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (isOpen && event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);
  
  // Handle clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  // Auto-play video when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video autoplay failed:", err));
    }
  }, [isOpen]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* Backdrop with blur effect */}
          <motion.div 
            className="absolute inset-0 backdrop-blur-md bg-black/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
          
          {/* Modal content */}
          <motion.div 
            ref={modalRef}
            className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-2xl z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300 
            }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={20} />
            </motion.button>
            
            {/* Video title */}
            {videoTitle && (
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10">
                <h3 className="text-white font-medium">{videoTitle}</h3>
              </div>
            )}
            
            {/* Video player */}
            <div className="aspect-video bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                controlsList="nodownload"
                poster="/path/to/your/poster-image.jpg" // Opcional: añadir una imagen de poster
                autoPlay={isOpen}
                playsInline
                onEnded={onClose} // Opcional: cerrar modal cuando termina el video
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
