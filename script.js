const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);

    createUserCard(data);
    getRepos(username);
  } catch (err) {
    if (err.response.status == 404) {
      creatErrorCard("No profile with this username");
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos?sort=created");

    addReposToCard(data);
  } catch (err) {
    creatErrorCard("Problem fetching repos");
  }
}

function createUserCard(user) {
  const cardHtml = `
  <div class="card">
  <!------ profile ----->
  <div>
    <img
    src="${user.avatar_url}"
      class="avator"
      alth=""${user.name}
    />
  </div>
  <!------ user info ----->
  <div class="user__info">
    <h2>${user.name}</h2>
    <p>
   ${user.bio}
    </p>

    <ul>
      <li>${user.followers}<strong>Followers</strong></li>
      <li>${user.following}<strong>Following</strong></li>
      <li>${user.public_repos}<strong>Posts</strong></li>
    </ul>

    <div id="repos">
    
    </div>
  </div>
</div>`;
  main.innerHTML = cardHtml;
}

function creatErrorCard(msg) {
  const cardHtml = `<div class="card">
  <h1>${msg}</h1>
  </div>`;
  main.innerHTML = cardHtml;
}

function addReposToCard(repos) {
  const reposEl = document.getElementById("repos");

  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;
    reposEl.appendChild(repoEl);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
