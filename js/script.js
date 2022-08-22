//#region Search
let searchEngine = "Google";

class Random {
    constructor() { }

    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomColor() {
        return `rgb(${this.random(100, 255)}, ${this.random(100, 255)}, ${this.random(100, 255)})`;
    }
}

let random = new Random();

function decorateLogo() {
    let logoText = document.querySelector('#logo').innerHTML;
    let decoratedLogoText = "";

    for (let char of logoText) {
        let currentRandomColor = random.randomColor();
        decoratedLogoText += `<span style="color: ${currentRandomColor}; text-shadow: 0px 0px 20px ${currentRandomColor}">${char}</span>`
    }

    document.querySelector('#logo').innerHTML = decoratedLogoText;
}

function decorateButton() {
    let button = document.querySelector('form button');
    let buttonColor = random.randomColor();
    button.style.backgroundColor = buttonColor;

    button.addEventListener("mouseover", function () {
        this.style.backgroundColor = random.randomColor();
    });

    button.addEventListener("mouseout", function () {
        this.style.backgroundColor = buttonColor;
    });
}

decorateLogo();
decorateButton();

document.querySelector('form .form-select').addEventListener("change", function () {
    for (let option of this.options) {
        if (option.selected) {
            searchEngine = option.value;
            break;
        }
    }
});

document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
    let query = document.querySelector('#search-panel').value;
    let processedQuery = query.replace(/ /g, "+");

    if (searchEngine == "Google") {
        location.href = `https://www.google.com/search?q=${processedQuery}`;
    } else if (searchEngine == "Yandex") {
        location.href = `https://yandex.ru/search/?lr=10254&text=${processedQuery}`;
    } else if (searchEngine == "Bing") {
        location.href = `https://www.bing.com/search?q=${processedQuery}`;
    } else if (searchEngine == "DuckDuckGo") {
        location.href = `https://duckduckgo.com/?q=${processedQuery}`;
    }
});
//#endregion

//#region Bookmarks

document.querySelector('.bookmarks').addEventListener("click", () => {
    document.querySelector('.bookmarks-panel').classList.toggle("d-none");
});

function createBookmarkContainer(name, url) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    let bookmarkIcon = document.createElement("span");
    let img = document.createElement("img");
    let bookmarkName = document.createElement("span");
    let deleteBookmark = document.createElement("button");

    a.setAttribute("href", `https://${url}`);

    img.setAttribute("src", `http://www.google.com/s2/favicons?domain=${url}`);

    bookmarkName.innerHTML = name;

    deleteBookmark.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" /></svg >';
    deleteBookmark.addEventListener("click", () => {
        document.querySelector('.bookmarks-panel>ul').removeChild(li);
    });

    bookmarkIcon.append(img);
    a.append(bookmarkIcon);
    a.append(bookmarkName);
    li.append(a);
    li.append(deleteBookmark);

    return li;
}

function addNewBookmark() {
    let name = prompt("Enter the name of bookmark");
    let url = prompt("Enter the URL of bookmark");

    document.querySelector('.bookmarks-panel>ul').append(createBookmarkContainer(name, url));

    saveBookmarks();
}

function saveBookmarks() {
    let bookmarks = document.querySelector('.bookmarks-panel>ul').innerHTML;

    localStorage.setItem('bookmarks', bookmarks);
}

function loadBookmarks() {
    let bookmarks = localStorage.getItem('bookmarks');

    document.querySelector('.bookmarks-panel>ul').innerHTML = bookmarks;

    document.querySelectorAll('.bookmarks-panel>ul>li').forEach(item => {
        item.children[1].addEventListener("click", function() {
            let li = this.parentNode;
            document.querySelector('.bookmarks-panel>ul').removeChild(li);
            saveBookmarks();
        });
    });
}

function decorateBookmarkButton() {
    let button = document.querySelector('.bookmarks')
    let buttonColor = random.randomColor();
    button.style.backgroundColor = buttonColor;
    button.style.boxShadow = `0px 0px 15px ${buttonColor}`;
}

document.querySelector('#addNewBookmark').addEventListener('click', addNewBookmark);

loadBookmarks();
decorateBookmarkButton();

//#endregion