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
    animating: false,

    /**
     * This method increments the current pageIndex and
     * after that calls the update function
     */
    next() {
        if (!this.animating) {
            if (this.pageIndex < this.total) {
                this.pageIndex++;
                this.update();
            }
        }
    },
    /**
     * This method decrements the current pageIndex and
     * after that calls the update function
     */
    prev() {
        if (!this.animating) {
            if (this.pageIndex > 0) {
                this.pageIndex--;
                this.update();
            }
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

                        setTimeout(() => this.zIndex(p, i + 10), 350);
                    } else {
                        this.add(p);

                        this.zIndex(p, this.pages.length - i + 10);
                    }
                });
                break;
        }
        this.animating = true;
        setTimeout(() => (this.animating = false), 700);
    },
    /**
     * This method inits the drag function to go to the next page
     */
    touchEvent() {
        let touching = false;
        let startX = 0;
        let threshold = 25;
        const checkTouch = (mouseX) => {
            if (touching) {
                if (startX - threshold > mouseX) {
                    this.next();
                    touching = false;
                }
                if (startX + threshold < mouseX) {
                    this.prev();
                    touching = false;
                }
            }
        };
        window.addEventListener("mousemove", (e) => checkTouch(e.clientX));
        window.addEventListener("touchmove", (e) => checkTouch(e.clientX));
        window.addEventListener("mousedown", (e) => {
            touching = true;
            startX = e.clientX;
        });
        window.addEventListener("touchstart", (e) => {
            touching = true;
            startX = e.clientX;
        });
        window.addEventListener("mouseup", () => (touching = false));
        window.addEventListener("touchend", () => (touching = false));
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
        this.touchEvent();
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
            img.classList.add("pf");
            img.onload = () => {
                res(img);
            };
            img.onerror = () => {
                err("Failed to load image " + src);
            };
        });
    },

    /**
     * Method that fills both sides of a page and returns the filled page
     * @param {*} cards list of card element
     * @returns page element with all the cards
     */
    async createPage(cards) {
        return await new Promise((res) => {
            let page = document.createElement("li");
            page.classList.add("page", "flipped");
            let page_front = document.createElement("section");
            page_front.classList.add("page_front");
            let front_list = document.createElement("ol");
            let page_back = document.createElement("section");
            page_back.classList.add("page_back");
            let back_list = document.createElement("ol");
            cards.forEach((c, i) => {
                if (c) {
                    if (i < cards.length / 2) back_list.appendChild(c);
                    else front_list.appendChild(c);
                }
            });

            let header = document.createElement("header");
            let logo = document.createElement("img");
            logo.classList.add("page_logo");
            logo.src = "./assets/icons/logo.svg";
            let heading = document.createElement("h2");
            heading.innerHTML = "the founders";
            let span = document.createElement("span");
            span.innerHTML = "FDND";
            header.append(logo);
            header.append(heading);
            header.append(span);

            page_front.append(header.cloneNode(true));
            page_back.append(header);

            page_front.append(front_list);
            page_back.append(back_list);
            page.append(page_front);
            page.append(page_back);
            res(page);
        });
    },

    /**
     * This function makes a Card element for a member these cards will
     * show on the pages in the book
     * @param {*} m the member object
     * @param {*} img a Loaded image inside an HTMLImageElement object
     * @returns an standalone card with all content inside it as a html element
     */
    async createCard(m, img) {
        return await new Promise((res) => {
            let card = document.createElement("article");
            card.classList.add("card");
            let name = document.createElement("span");
            name.innerHTML = `${m.name} ${m.prefix}${m.surname}`;
            let nickname = document.createElement("span");
            nickname.innerHTML = m.nickname;
            let bio = document.createElement("p");
            bio.innerHTML = m.bio;

            let icons = document.createElement("div");
            icons.classList.add("icons");
            if (m.githubHandle) {
                let git = document.createElement("a");
                git.href = `https://github.com/${m.githubHandle}`;
                let gitIcon = document.createElement("img");
                gitIcon.src = "./assets/icons/github.svg";
                git.appendChild(gitIcon);
                icons.appendChild(git);
            }
            if (m.url || !/\n/.exec(m.url)) {
                let web = document.createElement("a");
                web.href = m.url;
                let webIcon = document.createElement("img");
                webIcon.src = "./assets/icons/web.svg";
                web.appendChild(webIcon);
                icons.appendChild(web);
            }
            card.appendChild(name);
            card.appendChild(nickname);
            card.appendChild(img);
            card.appendChild(bio);
            card.appendChild(icons);
            res(card);
        });
    },

    /**
     * Method returns a promise of filling the pages
     * @returns returns promise with pages as resolve
     */
    async fillPages() {
        return await new Promise((res) => {
            // calculate how many per page
            let cardsPerPage = 8;
            let amount =
                (this.cards.length - (this.cards.length % cardsPerPage)) /
                    cardsPerPage +
                (this.cards.length % cardsPerPage != 0 ? 1 : 0);
            console.log(amount);
            Promise.all(
                [...Array(amount)].map(async (_, i) => {
                    let list = [...Array(cardsPerPage)].map((_, idx) => {
                        return this.cards[i * cardsPerPage + idx];
                    });
                    return await this.createPage(list);
                })
            ).then((pages) => {
                pages.forEach((p) =>
                    document.querySelector(".book_pages").appendChild(p)
                );

                res(pages);
            });
        });
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
        return await new Promise(async (res) => {
            // promise to create all cards after image loads
            await Promise.all(
                members.map(async (m) => {
                    return new Promise(async (res, err) => {
                        await this.loadIMG(m.avatar)
                            .then(async (mIMG) => {
                                this.cards.push(await this.createCard(m, mIMG));
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
            });
            console.log("filling pages");
            // function to fill all pages
            await this.fillPages().then((_) => {
                this.init();
                res();
            });
        }).then((_) => console.log("resolved"));
    },
};
