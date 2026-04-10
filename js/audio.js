const SFX_VOLUME = 0.2;

const sounds = {
    score: new Audio('assets/audio/score.mp3'),
    gameover: new Audio('assets/audio/gameover.mp3'),
    start: new Audio('assets/audio/start.mp3'),
    pause: new Audio('assets/audio/pause.mp3')
};
const playList = [
    'assets/audio/music_one.mp3',
    'assets/audio/music_two.mp3',
    'assets/audio/music_tree.mp3',
    'assets/audio/music_four.mp3',
]

let currentBGM = new Audio();

const shuffleBGM = () => {
    currentBGM.pause();
    const randomIndex = Math.floor(Math.random() * playList.length);

    currentBGM = new Audio(playList[randomIndex]);
    currentBGM.loop = true;
    currentBGM.volume = 0.2;
};

const playBGM = () => {
    currentBGM.play().catch(e => console.log("Áudio aguardando interação do usuário."));
};

const stopBGM = () => {
    currentBGM.pause();
    currentBGM.currentTime = 0;
};

const manageBGM = (isPlaying, isPaused) => {
    if (!isPlaying) {
        stopBGM();
        sounds.pause.pause();
        sounds.pause.currentTime = 0;
        return;
    }

    if (isPaused) {
        currentBGM.pause();
        sounds.pause.play();
    } else {
        sounds.pause.pause();
        sounds.pause.currentTime = 0;
        currentBGM.play();
    }
};

const playSound = (name) => {
    if (sounds[name]) {
        sounds[name].currentTime = 0;
        sounds[name].play();
    }
};

Object.values(sounds).forEach(audio => {
    audio.volume = SFX_VOLUME;
});

export { shuffleBGM, playBGM, stopBGM, playSound, manageBGM }