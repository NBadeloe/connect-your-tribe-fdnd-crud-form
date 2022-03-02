const Book = {
    defaultImage:
        "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg",
    book: document.querySelector(".book"),
    cover: {
        front: document.querySelector(".book .book_cover.front"),
        back: document.querySelector(".book .book_cover.back"),
    },
    pages: undefined,
    pageIndex: 0,
    total: undefined,
    members: [],
    cards: [],

    /**
     * This method increments the current pageIndex and
     * after that calls the update function
     */
    next() {
        if (this.pageIndex < this.total) {
            this.pageIndex++;
            this.update();
        }
    },
    /**
     * This method decrements the current pageIndex and
     * after that calls the update function
     */
    prev() {
        if (this.pageIndex > 0) {
            this.pageIndex--;
            this.update();
        }
    },

    /**
     * This method adds the class "flipped" to an element
     * @param {*} e the element to adds the class to
     */
    add(e) {
        e.classList.add("flipped");
    },

    /**
     * This method removes the class "flipped" from an element
     * @param {*} e the element to remove the class from
     */
    remove(e) {
        e.classList.remove("flipped");
    },

    /**
     * This method sets the z-index of an element
     * @param {*} e the element with the style update
     * @param {*} i the new z-index value
     */
    zIndex(e, i) {
        e.style.zIndex = i;
    },

    /**
     * This method updates the pages based on the current index of page.
     */
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

    /**
     * This method initializes the book and is called after the cards are loaded.
     * This is the last method to be called before the book is interaction ready.
     */
    init() {
        document.querySelector("#prev").addEventListener("click", () => {
            this.prev();
        });
        document.querySelector("#next").addEventListener("click", () => {
            this.next();
        });
        this.pages = document.querySelectorAll(".book_pages .page");
        this.total = this.pages.length + 2;
        this.update();
    },

    // async srcRequest(src) {
    //     let req = new Request(src);
    //     console.log("fetching");
    //     return await fetch(req, {
    //         method: "GET",
    //         headers: { "Content-Type": "image/jpeg" },
    //         mode: "no-cors",
    //         cache: "default",
    //     })
    //         .then((res) => {
    //             if (!res.ok) {
    //                 throw res;
    //             }
    //             return res.blob();
    //         })
    //         .then((res) => {
    //             return URL.createObjectURL(res);
    //         })
    //         .catch(async (err) => {
    //             throw err;
    //         });
    // },

    /**
     * This method creates an image object from a source and waits for it to load
     * @param {*} src the source of the image
     * @returns an fully loaded image element
     */
    loadIMG(src) {
        return new Promise(async (res, err) => {
            let img = new Image();
            img.src = src ? src : this.defaultImage;
            img.onload = () => {
                res(img);
            };
            img.onerror = () => {
                err("Failed to load image " + src);
            };
        });
    },

    /**
     * This function makes a Card element for a member these cards will
     * show on the pages in the book
     * @param {*} m the member object
     * @param {*} img a Loaded image inside an HTMLImageElement object
     * @returns an standalone card with all content inside it as a html element
     */
    createCard(m, img) {
        return img;
    },

    /**
     * This function loads all members into the book.
     * First the array of members is internalized, then the empty
     * skeleton cards are build based on the initial array of members,
     * finally all the member images are loaded and the skeleton cards are
     * replaced by the with member loaded cards.
     * @param {*} members an array of objects with type members
     * @returns a promise of a method that takes an iterable of promises
     */
    async load(members) {
        this.members = members;
        return await Promise.all(
            members.map(async (m) => {
                return new Promise(async (res, err) => {
                    await this.loadIMG(m.avatar)
                        .then((mIMG) => {
                            this.cards.push(this.createCard(m, mIMG));
                            res("Succes");
                        })
                        .catch((e) => err(e));
                }).catch((err) => {
                    return err;
                });
            })
        ).then((msg) => {
            msg.forEach((m) => {
                if (m != "Succes") console.log(m);
            });
            this.init();
        });
    },
};

// (async () => {
//     const api = new CRUD();

//     console.log(
//         await api.Create("member", {
//             squadId: 1,
//             type: "student",
//             nickname: "hassan",
//             name: "Beauclone",
//             prefix: "",
//             surname: "Dekker",
//             avatar: "https://i.ibb.co/ggNjKw9/resize-smaller.png",
//             githubHandle: "beaupd",
//             bio: "",
//             url: "\r",
//         })
//     );
// })();
