import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Music } from 'lucide-react';

const MediaPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(45);
  const [duration, setDuration] = useState(180);
  const [volume, setVolume] = useState(75);
  const [currentTrack, setCurrentTrack] = useState(0);

  const playlist = [
    { title: 'Summer Vibes', artist: 'Demo Artist', duration: '3:24' },
    { title: 'Night Drive', artist: 'Another Artist', duration: '4:12' },
    { title: 'Morning Coffee', artist: 'Chill Beats', duration: '2:58' },
    { title: 'Focus Flow', artist: 'Ambient Sounds', duration: '5:34' },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-900 to-black text-white">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-2xl flex items-center justify-center mb-4">
          <Music size={64} className="text-white/80" />
        </div>
        <h2 className="text-xl font-bold">{playlist[currentTrack].title}</h2>
        <p className="text-gray-300">{playlist[currentTrack].artist}</p>
      </div>

      {/* Progress Bar */}
      <div className="px-6 mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-sm text-gray-300">{formatTime(currentTime)}</span>
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-300">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-center space-x-6">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Shuffle size={20} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SkipBack size={24} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <SkipForward size={24} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Repeat size={20} />
          </button>
        </div>
      </div>

      {/* Volume */}
      <div className="px-6 mb-4">
        <div className="flex items-center space-x-3">
          <Volume2 size={20} />
          <div className="flex-1 bg-gray-700 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2"
              style={{ width: `${volume}%` }}
            />
          </div>
          <span className="text-sm text-gray-300">{volume}%</span>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex-1 bg-black/20 backdrop-blur">
        <div className="p-4">
          <h3 className="font-semibold mb-3">Now Playing</h3>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <button
                key={index}
                onClick={() => setCurrentTrack(index)}
                className={`w-full flex items-center justify-between p-3 rounded transition-colors ${
                  currentTrack === index ? 'bg-purple-600/50' : 'hover:bg-white/10'
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm text-gray-300">{track.artist}</div>
                </div>
                <span className="text-sm text-gray-300">{track.duration}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPlayer;