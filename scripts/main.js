const baseUrl = "https://tribe.api.fdnd.nl/v1";

getMembers();
async function getMembers() {
  const req = await fetch(`${baseUrl}/member`);
  await req.json().then(function (json) {
    //  console.log(json);
    json.data.forEach((student) => {
      if (student.squadId == 1) {
        document.querySelector(".overzicht").insertAdjacentHTML(
          "afterbegin",
          `
          <section class="card">
        <h1>${student.name}</h1>
        <h2>${student.nickname}</h2>
        <h3>${student.githubHandle}</h3>
        <p>${student.bio}</p>
        <a href="${student.url}">${student.url}</a>
        <a href="./update.html/${student.memberId}"></a>
        </section>
        `
          // document.querySelector("#name").innerHTML =
          //   student.name + " " + student.prefix + " " + student.surname;
          // document.querySelector("#nickname").innerHTML = student.nickname;
          // document.querySelector("#githubHandle").innerHTML =
          //   student.githubHandle;
          // document.querySelector("#bio").innerHTML = student.bio;
          // document.querySelector("#url").innerHTML = student.url;
          // // console.log(item.surname)
          // console.log(student);
        );
      }
      // console.log(item.memberId)
    });
  });
}
