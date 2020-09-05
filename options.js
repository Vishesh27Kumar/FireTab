refreshWorkspace();
deleteButtonHandler();

function refreshWorkspace() {
    let arrayToDisplay = Object.keys(localStorage);
    let refresher = document.getElementById("refresher");
    refresher.innerHTML = '';
    if (arrayToDisplay.length) {
        arrayToDisplay.map(item => {
            let paragraph = document.createElement("p");
            paragraph.innerText = item;
            let button = document.createElement("button");
            button.setAttribute("id", item);
            button.setAttribute("class", "getter")
            let image = document.createElement("img");
            image.src = "images/delete.png";
            button.appendChild(image);
            let listTag = document.createElement("li");
            listTag.appendChild(paragraph);
            listTag.appendChild(button);
            refresher.appendChild(listTag);
        });
    } else {
        let div = document.createElement("div");
        div.innerText = "[ Empty ]";
        div.setAttribute("id", "emptyWorkspace");
        refresher.appendChild(div);
    }
    deleteButtonHandler();
}

function deleteButtonHandler() {
    let buttons = Array.from(document.getElementsByClassName("getter"));
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            localStorage.removeItem(btn.id);
            refreshWorkspace();
        })
    });
}
