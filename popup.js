refreshList();
refreshButtonHandler();


document.getElementById("submitBtn").addEventListener("click", () => {
    let errorMessage = '';
    let input = document.getElementById("packname").value;
    input = input.trim();
    let checkAva = checkAvailability(input);
    let checkLim = checkLimit();
    if (input && checkAva && checkLim && (input.length <= 25)) {
        handleSubmit(input);
    } else if (input && !checkAva) {
        errorMessage = "*Workspace already saved.Try another name."
    } else if (input && !checkLim) {
        errorMessage = "*Limit has reached, delete workspace to add new one.";
    } else if (input && !(input.length <= 25)) {
        errorMessage = "*Try to add name containing less than 25 characters.";
    }
    else {
        errorMessage = "*Input must not be empty";
    }
    document.getElementById("errorMessage").innerText = errorMessage;
    document.getElementById("packname").value = '';
});



// handle the submision of the input
function handleSubmit(input) {

    let urls = [];

    chrome.windows.getCurrent({ populate: true }, function (window) {
        window.tabs.forEach(function (tab) {
            //collect all of the urls here, I will just log them instead
            urls.push(tab.url);
        });

        localStorage.setItem(input, urls);
        console.log("stored " + input);
        refreshList();
        refreshButtonHandler();
    });
}

//check availablity of workspace name
function checkAvailability(input) {
    for (a in localStorage) {
        if (a === input) {
            console.log("not available");
            return false;
        }
    }
    console.log("available");
    return true;
}

function refreshList() {
    let showWorkspace = document.getElementById("show-workspace");
    showWorkspace.innerHTML = '';
    let list = Object.keys(localStorage);
    if (list.length) {
        list.map(item => {
            let paragraph = document.createElement("p");
            paragraph.innerText = item;
            let button = document.createElement("button");
            button.classList.add("eraseOutline");
            button.setAttribute("id", item);
            let image = document.createElement("img");
            image.src = "images/ic_whatshot_24px.png";
            button.appendChild(image);
            let listTag = document.createElement("li");
            listTag.appendChild(paragraph);
            listTag.appendChild(button);
            showWorkspace.appendChild(listTag);
        });
    } else {
        let div = document.createElement("div");
        div.innerText = "[ Empty ]";
        div.setAttribute("id", "emptyWorkspace");
        showWorkspace.appendChild(div);
    }
}

function refreshButtonHandler() {
    let buttons = Array.from(document.getElementsByClassName("eraseOutline"));
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            let urlsArray = localStorage.getItem(btn.id).split(",");
            urlsArray.forEach(url => {
                chrome.tabs.create({ url }, function () {
                    console.log("tabs created");
                })
            });
        })
    });
}

function checkLimit() {
    let arrayFromLocalStorage = Object.keys(localStorage);
    if (arrayFromLocalStorage.length < 15) {
        return true;
    }
    console.log(arrayFromLocalStorage.length);
    return false;
}
