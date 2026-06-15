const alphabetData = [
    { letter: 'A', word: 'Apple', emoji: '🍎' },
    { letter: 'B', word: 'Banana', emoji: '🍌' },
    { letter: 'C', word: 'Cat', emoji: '🐱' },
    { letter: 'D', word: 'Dog', emoji: '🐕' },
    { letter: 'E', word: 'Elephant', emoji: '🐘' },
    { letter: 'F', word: 'Fish', emoji: '🐟' },
    { letter: 'G', word: 'Giraffe', emoji: '🦒' },
    { letter: 'H', word: 'Horse', emoji: '🐴' },
    { letter: 'I', word: 'Ice Cream', emoji: '🍦' },
    { letter: 'J', word: 'Jungle', emoji: '🌴' },
    { letter: 'K', word: 'Kite', emoji: '🪁' },
    { letter: 'L', word: 'Lion', emoji: '🦁' },
    { letter: 'M', word: 'Monkey', emoji: '🐒' },
    { letter: 'N', word: 'Nurse', emoji: '👩‍⚕️' },
    { letter: 'O', word: 'Orange', emoji: '🍊' },
    { letter: 'P', word: 'Penguin', emoji: '🐧' },
    { letter: 'Q', word: 'Queen', emoji: '👑' },
    { letter: 'R', word: 'Rabbit', emoji: '🐰' },
    { letter: 'S', word: 'Sun', emoji: '☀️' },
    { letter: 'T', word: 'Tiger', emoji: '🐯' },
    { letter: 'U', word: 'Umbrella', emoji: '☂️' },
    { letter: 'V', word: 'Van', emoji: '🚐' },
    { letter: 'W', word: 'Water', emoji: '💧' },
    { letter: 'X', word: 'X-ray', emoji: '🩻' },
    { letter: 'Y', word: 'Yellow', emoji: '⭐' },
    { letter: 'Z', word: 'Zebra', emoji: '🦓' }
];

const songsData = [
    { id: 1, title: 'ABC Song', desc: '经典字母歌', duration: '2:30', emoji: '🎵', lyrics: 'A B C D E F G, H I J K L M N O P, Q R S T U V, W X Y and Z. Now I know my ABCs, next time won\'t you sing with me?' },
    { id: 2, title: 'Twinkle Twinkle', desc: '小星星', duration: '1:58', emoji: '✨', lyrics: 'Twinkle twinkle little star, how I wonder what you are. Up above the world so high, like a diamond in the sky.' },
    { id: 3, title: 'Happy Birthday', desc: '生日快乐歌', duration: '1:45', emoji: '🎂', lyrics: 'Happy birthday to you, happy birthday to you, happy birthday dear friend, happy birthday to you!' },
    { id: 4, title: 'Old MacDonald', desc: '老麦克唐纳', duration: '2:15', emoji: '🐷', lyrics: 'Old MacDonald had a farm, E I E I O. And on his farm he had a pig, E I E I O. With an oink oink here, and an oink oink there.' },
    { id: 5, title: 'Row Row Row', desc: '划船歌', duration: '1:30', emoji: '🚣', lyrics: 'Row row row your boat, gently down the stream. Merrily merrily merrily merrily, life is but a dream.' },
    { id: 6, title: 'Head Shoulders', desc: '头肩膝盖脚趾', duration: '2:00', emoji: '👦', lyrics: 'Head shoulders knees and toes, knees and toes. Head shoulders knees and toes, knees and toes. And eyes and ears and mouth and nose.' }
];

const phonicsData = [
    { id: 1, title: '短元音 a', desc: 'cat, hat, bat', level: 'Level 1', emoji: '🔊' },
    { id: 2, title: '短元音 i', desc: 'pig, big, sit', level: 'Level 1', emoji: '🔊' },
    { id: 3, title: '短元音 o', desc: 'dog, hot, box', level: 'Level 1', emoji: '🔊' },
    { id: 4, title: '短元音 u', desc: 'cup, fun, sun', level: 'Level 2', emoji: '🔊' },
    { id: 5, title: '长元音 A', desc: 'cake, make, take', level: 'Level 2', emoji: '🔊' },
    { id: 6, title: '辅音组合', desc: 'bl, br, cl, cr', level: 'Level 3', emoji: '🔊' }
];

const gamesData = [
    { id: 1, title: '字母配对', desc: '找到相同的字母', difficulty: '简单', emoji: '🔤' },
    { id: 2, title: '单词拼图', desc: '拼出完整的单词', difficulty: '中等', emoji: '🧩' },
    { id: 3, title: '听音选图', desc: '听单词找图片', difficulty: '简单', emoji: '👂' },
    { id: 4, title: '填色游戏', desc: '给字母填颜色', difficulty: '简单', emoji: '🎨' },
    { id: 5, title: '记忆卡片', desc: '翻牌配对游戏', difficulty: '中等', emoji: '🃏' },
    { id: 6, title: '连连看', desc: '连接相同的物品', difficulty: '困难', emoji: '🔗' }
];

function navigateTo(page) {
    localStorage.setItem('currentPage', page);
    window.location.href = `${page}.html`;
}

function goBack() {
    window.location.href = 'index.html';
}

function renderAlphabet() {
    const container = document.getElementById('alphabetContainer');
    if (!container) return;

    alphabetData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'alphabet-item';
        div.innerHTML = `
            <div class="letter">${item.emoji} ${item.letter}</div>
            <div class="word">${item.word}</div>
        `;
        div.addEventListener('click', function() {
            showLetterDetail(item, this);
        });
        container.appendChild(div);
    });
}

let speechReady = false;
let voicesLoaded = false;

function initSpeech() {
    if (!('speechSynthesis' in window)) return;
    
    function loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
            voicesLoaded = true;
            speechReady = true;
        }
    }
    
    loadVoices();
    
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    setTimeout(() => {
        if (!voicesLoaded) {
            speechReady = true;
        }
    }, 1000);
}

function speak(text, element) {
    if (!('speechSynthesis' in window)) {
        alert('您的浏览器不支持语音功能');
        return;
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (englishVoice) {
        utterance.voice = englishVoice;
    }
    
    if (element) {
        element.classList.add('speaking');
        utterance.onend = () => {
            element.classList.remove('speaking');
        };
        utterance.onerror = (e) => {
            element.classList.remove('speaking');
            console.log('Speech error:', e);
        };
    }
    
    function trySpeak() {
        window.speechSynthesis.speak(utterance);
        if (!window.speechSynthesis.speaking) {
            setTimeout(trySpeak, 100);
        }
    }
    
    setTimeout(trySpeak, 200);
}

function showLetterDetail(item, element) {
    speak(`${item.letter}. ${item.word}.`, element);
}

let currentPlayingSong = null;

function renderSongs() {
    const container = document.getElementById('songsContainer');
    if (!container) return;

    songsData.forEach(song => {
        const div = document.createElement('div');
        div.className = 'song-item';
        div.dataset.songId = song.id;
        div.innerHTML = `
            <div class="item-cover">${song.emoji}</div>
            <div class="item-info">
                <div class="item-title">${song.title}</div>
                <div class="item-desc">${song.desc}</div>
                <div class="item-duration">${song.duration}</div>
            </div>
            <div class="play-btn">▶</div>
        `;
        div.addEventListener('click', function() {
            playSong(song, this);
        });
        container.appendChild(div);
    });
}

function playSong(song, element) {
    if (currentPlayingSong && currentPlayingSong !== element) {
        currentPlayingSong.classList.remove('playing');
        window.speechSynthesis.cancel();
    }
    
    if (element.classList.contains('playing')) {
        element.classList.remove('playing');
        window.speechSynthesis.cancel();
        currentPlayingSong = null;
        return;
    }
    
    element.classList.add('playing');
    currentPlayingSong = element;
    
    speakSongLyrics(song, element);
}

function speakSongLyrics(song, element) {
    if (!('speechSynthesis' in window)) {
        alert('您的浏览器不支持语音功能');
        return;
    }
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(song.lyrics);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 1.3;
    utterance.volume = 1;
    
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (englishVoice) {
        utterance.voice = englishVoice;
    }
    
    utterance.onend = () => {
        element.classList.remove('playing');
        currentPlayingSong = null;
    };
    
    utterance.onerror = () => {
        element.classList.remove('playing');
        currentPlayingSong = null;
    };
    
    setTimeout(() => {
        window.speechSynthesis.speak(utterance);
    }, 200);
}

function renderPhonics() {
    const container = document.getElementById('phonicsContainer');
    if (!container) return;

    phonicsData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'phonics-item';
        div.innerHTML = `
            <div class="item-cover">${item.emoji}</div>
            <div class="item-info">
                <div class="item-title">${item.title}</div>
                <div class="item-desc">${item.desc}</div>
                <div class="item-duration">${item.level}</div>
            </div>
            <div class="play-btn">▶</div>
        `;
        div.addEventListener('click', function() {
            speakPhonics(item, this);
        });
        container.appendChild(div);
    });
}

function speakPhonics(item, element) {
    speak(item.desc, element);
}

function renderGames() {
    const container = document.getElementById('gamesContainer');
    if (!container) return;

    gamesData.forEach(game => {
        const div = document.createElement('div');
        div.className = 'game-item';
        div.innerHTML = `
            <div class="item-cover">${game.emoji}</div>
            <div class="item-info">
                <div class="item-title">${game.title}</div>
                <div class="item-desc">${game.desc}</div>
                <div class="item-duration">难度: ${game.difficulty}</div>
            </div>
            <div class="play-btn">▶</div>
        `;
        div.addEventListener('click', function() {
            showGameInfo(game, this);
        });
        container.appendChild(div);
    });
}

function showGameInfo(game, element) {
    const gameUrls = {
        '字母配对': 'games/memory-game.html',
        '单词拼图': 'games/word-puzzle.html',
        '听音选图': 'games/listening-game.html',
        '填色游戏': 'games/coloring-game.html',
        '记忆卡片': 'games/pattern-memory.html',
        '连连看': 'games/link-game.html'
    };
    
    const url = gameUrls[game.title];
    if (url) {
        window.location.href = url;
    } else {
        alert(`🎮 ${game.title}\n\n${game.desc}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', initSpeech, { once: true });
    renderAlphabet();
    renderSongs();
    renderPhonics();
    renderGames();
});