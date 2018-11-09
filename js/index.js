const form = document.querySelector(".header-form");

const BOOKMARK_LS = "bookmarks"

function saveBookmark(e) {
    const siteName = document.querySelector(".sitename-input").value;
    const siteUrl = document.querySelector(".siteurl-input").value;
    
    // Validate Form
    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    const bookmark = {
        name: siteName,
        url: siteUrl
    }

    const loadedBookmarks = localStorage.getItem(BOOKMARK_LS);
    if (loadedBookmarks === null) {
        let bookmarks = [];
        bookmarks.push(bookmark);
        localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(loadedBookmarks);
        bookmarks.push(bookmark);
        localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
    }

    // Fetch Bookmarks
    fetchBookmarks();

    // Clear the form
    form.reset();

    e.preventDefault();
}   

function fetchBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_LS));
    const container = document.querySelector(".bookmark-lists");
    container.innerHTML = "";
    for (let i = 0; i < bookmarks.length; i++) {
        const name = bookmarks[i].name;
        const url = bookmarks[i].url;
        container.innerHTML += `<div class="bookmark-wrap">
                                    <h3>${name}</h3>
                                    <div>
                                        <a href="${url}" class="visit-btn">Visit</a>
                                        <a class="delete-btn" onclick="deleteBookmark(\'${url}\')">Delete</a>
                                    </div>
                                </div>`;
    }
}

function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem(BOOKMARK_LS));
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url === url) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem(BOOKMARK_LS, JSON.stringify(bookmarks));
    fetchBookmarks();
}


// Validate Form
function validateForm(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert("Please fill in the form");
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert("Please use a valid URL")
        return false;
    }

    return true;
}

function init() {
    form.addEventListener("submit", saveBookmark);
    fetchBookmarks();
}

init();