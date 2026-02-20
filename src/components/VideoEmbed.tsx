'use client';

import { useState } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

interface VideoEmbedProps {
    videoId: string; // YouTube Video ID
    title: string;
    thumbnailUrl: string;
}

export default function VideoEmbed({ videoId, title, thumbnailUrl }: VideoEmbedProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-white/10 group cursor-pointer" onClick={() => setIsPlaying(true)}>
            {!isPlaying ? (
                <>
                    {/* Lazy load image until play is clicked */}
                    <Image
                        src={thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                        alt={title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-16 h-16 bg-blue-600/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                            <Play fill="currentColor" size={24} className="ml-1" />
                        </div>
                    </div>
                </>
            ) : (
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full absolute inset-0"
                ></iframe>
            )}
        </div>
    );
}
