import { useState, useCallback } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PropertyImageGalleryProps {
  images: string[];
  title: string;
  onOpenLightbox: () => void;
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function PropertyImageGallery({
  images,
  title,
  onOpenLightbox,
  currentIndex,
  onIndexChange
}: PropertyImageGalleryProps) {
  const nextImage = useCallback(() => {
    onIndexChange((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  const prevImage = useCallback(() => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onIndexChange]);

  return (
    <Card className="overflow-hidden border-2 border-border/50 shadow-2xl">
      <CardContent className="p-0 relative group">
        {/* Main Image */}
        <div className="relative h-96 md:h-[500px] overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <ImageWithFallback
                src={images[currentIndex]}
                alt={`${title} - Imagen ${currentIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>

          {/* Gallery Navigation */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              variant="default"
              size="icon"
              onClick={prevImage}
              className="h-12 w-12 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={nextImage}
              className="h-12 w-12 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Fullscreen Button */}
          <Button
            variant="default"
            size="icon"
            onClick={onOpenLightbox}
            className="absolute top-4 right-4 h-10 w-10 rounded-full bg-primary/95 hover:bg-primary text-primary-foreground shadow-xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="bg-muted/50 p-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => onIndexChange(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentIndex === index
                    ? 'border-primary ring-2 ring-primary/20 scale-105'
                    : 'border-transparent hover:border-primary/50'
                }`}
              >
                <ImageWithFallback
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
