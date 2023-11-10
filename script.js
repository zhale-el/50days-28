const APIURL = "https://api.github.com/users/";
const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    console.log(data);
    createUserCard(data);
  } catch (err) {
    if (err.response.status == 404) {
      creatErrorCard("No profile with this username");
    }
  }
}

function createUserCard(user) {
  const cardHtml = `<div class="card">
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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);
    console.log(user);
    search.value = "";
  }
});
