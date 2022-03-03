/**
 * Script to promise loading a script and insert it in the dom
 * before the firs script
 * @param {*} src the location of the script to load
 * @returns the loaded script as a script element
 */
const loadScript = (src) => {
    return new Promise((res, err) => {
        let s = document.createElement("script");
        s.src = src;
        document.head.append(s);
        s.onload = () => {
            res("Succesfully inserted script " + src);
        };
        s.onerror = () => {
            err("Error loading script " + src);
        };
    });
};

const scripts = ["./scripts/CRUD.js", "./scripts/book.js"];

(async () => {
    // Dom loaded defer script called
    console.log("%cDOM Loaded", "color: green");
    // Load scripts
    await Promise.all(
        scripts.map((s) =>
            loadScript(s).catch((err) => {
                return err;
            })
        )
    ).then((msg) => console.log(msg));
    console.log("%cScripts Loaded", "color: green");
    // Fetch members from api all pages
    let allMembers = await new CRUD().Read("member");
    console.log("%cFetched members:\n" + allMembers.length, "color: green");
    // Load all members in book
    console.log("%cLoading members", "color: green");
    await Book.load(allMembers).then((_) => console.log("cards: ", Book.cards));
    console.log("%cLoaded", "color: green");
})();
