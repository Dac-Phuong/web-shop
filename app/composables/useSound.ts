let audioInstance: HTMLAudioElement | null = null;
let lastPlayTime = 0;

export const useSound = () => {
  const playNotificationSound = () => {
    try {
      const now = Date.now();

      // chống spam
      if (now - lastPlayTime < 300) return;
      lastPlayTime = now;

      // init audio 1 lần
      if (!audioInstance) {
        audioInstance = new Audio("/sounds/noti.mp3");
        audioInstance.volume = 1.0;
        audioInstance.preload = "auto";
      }

      audioInstance.currentTime = 0;

      const playPromise = audioInstance.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name === "NotAllowedError") {
            console.warn("[SOUND] Autoplay blocked");
          } else {
            console.error("[SOUND] Error:", error);
          }
        });
      }
    } catch (error) {
      console.error("[SOUND] Critical:", error);
    }
  };

  return {
    playNotificationSound,
  };
};
