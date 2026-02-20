'use client';

export default function Hero3D() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <video
                src="https://framerusercontent.com/assets/qCsdRszWc0kdXg6VVE5yAvL0b30.mp4"
                loop
                preload="auto"
                muted
                playsInline
                autoPlay
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: '50% 50%',
                }}
                className="opacity-50"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]" />
        </div>
    );
}
