const Book = {
    book: document.querySelector(".book"),
    cover: {
        front: document.querySelector(".book .book_cover.front"),
        back: document.querySelector(".book .book_cover.back"),
    },
    pages: document.querySelectorAll(".book_pages .page"),
    pageIndex: 0,
    total: undefined,

    /**
     *
     */
    next() {
        if (this.pageIndex < this.total) {
            this.pageIndex++;
            this.update();
        }
    },
    prev() {
        if (this.pageIndex > 0) {
            this.pageIndex--;
            this.update();
        }
    },
    add(e) {
        e.classList.add("flipped");
    },
    remove(e) {
        e.classList.remove("flipped");
    },
    zIndex(e, i) {
        e.style.zIndex = i;
    },
    update() {
        switch (this.pageIndex) {
            case 0:
                this.book.classList.add("closed");
                this.book.classList.remove("open");
                this.add(this.cover.front);
                this.add(this.cover.back);
                this.pages.forEach((p, i) => {
                    this.add(p);
                    this.zIndex(p, this.pages.length - i + 10);
                });
                // flip everything
                break;
            case this.total:
                this.book.classList.add("end");
                this.remove(this.cover.back);
                this.remove(this.cover.front);
                this.pages.forEach((p, i) => {
                    this.remove(p);
                    this.zIndex(p, i + 10);
                });
                // unflip everything
                break;
            default:
                this.book.classList.remove("closed");
                this.book.classList.add("open");
                this.book.classList.remove("end");
                this.remove(this.cover.front);
                this.add(this.cover.back);
                this.pages.forEach((p, i) => {
                    if (i < this.pageIndex - 1) {
                        this.remove(p);
                        this.zIndex(p, i + 10);
                    } else {
                        this.add(p);
                        this.zIndex(p, this.pages.length - i + 10);
                    }
                });
                break;
        }
    },
    init() {
        document.querySelector("#prev").addEventListener("click", () => {
            this.prev();
        });
        document.querySelector("#next").addEventListener("click", () => {
            this.next();
        });
        this.total = this.pages.length + 2;
        this.update();
    },
};

Book.init();

// (async () => {
//     const api = new CRUD();

//     console.log(await api.Read("member"));
// })();
