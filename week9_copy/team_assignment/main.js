function removeClass(e) {
    console.log(e);
    if (e.propertyName !== 'transform') {
        return;
    }
    e.target.classList.remove('playing');
}

document.addEventListener('keydown', function (e) {
    const keyboardLetter = e.keyCode;
    const audioCollection = document.getElementsByTagName('audio');
    const key = document.querySelector(`div[data-key='${keyboardLetter}'`);

    Array.from(audioCollection).forEach((item) => {
        if (item.dataset.key == keyboardLetter) {
            key.classList.add('playing');
            item.currentTime = 0;
            item.play();
        }
    })
});

const keys = Array.from(document.getElementsByClassName('key'));
keys.forEach((key) => {
    key.addEventListener('transitionend', removeClass);
});