const flipFront = () => {
    frontCover.classList.toggle("flipped");
    if (frontCover.classList.contains("flipped")) {
        book.classList.add("closed");
    } else {
        book.classList.remove("closed");
    }
};

const flipBack = () => {
    backCover.classList.toggle("flipped");
    if (
        backCover.classList.contains("flipped") &&
        !book.classList.contains("closed")
    ) {
        book.classList.remove("end");
    } else {
        book.classList.add("end");
    }
};

const Book = {
    book: document.querySelector(".book"),
    cover: {
        front: document.querySelector(".book .book_cover.front"),
        back: document.querySelector(".book .book_cover.back"),
    },
    pageIndex: 0,
    total: undefined,

    flip: {
        next() {
            console.log("next");
            if (pageIndex < total) {
                pageIndex++;
                this.update();
            }
        },
        prev() {
            console.log("prev");
            if (pageIndex > 0) {
                pageIndex--;
                this.update();
            }
        },
        class: {
            add(e) {
                e.classList.add("flipped");
            },
            remove(e) {
                e.classList.remove("flipped");
            },
        },
    },
    update() {
        switch (pageIndex) {
            case 0:
                this.flip.class.add(this.cover.front);
        }
    },
    init() {
        document.querySelector("#prev").addEventListener("click", () => {
            this.flip.prev();
        });
        document.querySelector("#next").addEventListener("click", () => {
            this.flip.next();
        });
    },
};

Book.init();

// (async () => {
//     const api = new CRUD();

//     console.log(await api.Read("member"));
// })();
