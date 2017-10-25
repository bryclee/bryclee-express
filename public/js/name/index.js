var WordBanner = function(parentDiv) {
    this.characterNodes = [];
    this.wordList = [];
    this.index = 0;
    this.rotateHandle;

    var headerLetters = document.createElement('span');

    headerLetters.id = 'header-letters';
    parentDiv.appendChild(headerLetters);

    this.parentDiv = parentDiv;
    this.headerLetters = headerLetters;
};

WordBanner.prototype.setWordList = function(list) {
    if (!Array.isArray(list)) {
        throw new Error('arg must be an Array');
    }

    this.wordList = list;

    // Start at the first word
    this.changeHeaderWord(this.wordList[0]);
};

WordBanner.prototype.changeHeaderWord = function(newWord) {
    var newWordLetters = {};
    var newWordNodes = [];
    var tempNodeStorage = [];
    var removeNodeStorage = [];
    var i, pos, node;
    //Create the letter counts for the new word to compare to the current word,
    //storing the index position that each letter is found at.
    for (i = newWord.length - 1; i >= 0; i--) {
        newWordLetters[newWord[i]] = newWordLetters[newWord[i]] || [];
        newWordLetters[newWord[i]].push(i);
    }

    while (node = this.characterNodes.pop()) {
        tempNodeStorage.push(node);
    }
    //Compare the current letters to the new word letters, marking the nodes that
    //will not be used in the new word, and assigning the new index to the nodes
    //that will be reused.
    while (node = tempNodeStorage.pop()) {
        if (newWordLetters[node.letter]) {
            pos = newWordLetters[node.letter].pop();
            newWordNodes[pos] = node.node;
            if (!newWordLetters[node.letter].length) {
                delete newWordLetters[node.letter];
            }
            this.characterNodes.push(node);
        } else {
            removeNodeStorage.push(node);
            node.node.className = 'letter exit';
        }
    }
    //Iterate over the new word, creating nodes for new letters when needed,
    //and reassigning the left value to reposition each of the letters
    for (i = 0; i < newWord.length; i++) {
        if (!newWordNodes[i]) {
            node = document.createElement('span');
            node.textContent = node.innerText = newWord[i];
            node.className = 'letter enter';
            this.headerLetters.appendChild(node);
            this.characterNodes.push({letter: newWord[i], node: node});
            newWordNodes[i] = node;
        }
        newWordNodes[i].style.left = i * 50 + 'px';
    }
    //Set width of parent for the anchor tag to properly resize
    this.parentDiv.style.width = newWord.length * 50 + 'px';

    //Clean up nodes that were marked for removal after the exit animation has finished playing
    window.setTimeout((function() {
        var node;
        while (node = removeNodeStorage.pop()) {
            this.headerLetters.removeChild(node.node);
        }
    }).bind(this), 800);
};

WordBanner.prototype.nextWord = function() {
    this.index = (this.index + 1) % this.wordList.length;;
    this.changeHeaderWord(this.wordList[this.index]);
};

//Cycle through the words in the headerWords array
WordBanner.prototype.rotateWords = function(delay) {
    var setNextRotate = () => {
        this.rotateHandle = window.setTimeout(() => {
            this.nextWord();
            setNextRotate();
        }, delay);
    };

    setNextRotate();
};

module.exports = WordBanner;
