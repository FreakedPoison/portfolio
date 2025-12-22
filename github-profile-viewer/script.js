const input = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");
const profileDiv = document.getElementById("profile");
const reposDiv = document.getElementById("repos");

searchBtn.addEventListener("click", () => {
  const username = input.value.trim();
  if (username) {
    fetchProfile(username);
  }
});
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    fetchProfile();
  }
});
async function fetchProfile() {
  const username = input.value.trim();
  if (!username) return;

  profileDiv.innerHTML = "Loading...";
  reposDiv.innerHTML = "";

  try {
    const profileRes = await fetch(`https://api.github.com/users/${username}`);
    const profile = await profileRes.json();

    if (profile.message === "Not Found") {
      profileDiv.innerHTML = "User not found";
      return;
    }

    profileDiv.innerHTML = `
      <div class="card">
        <img src="${profile.avatar_url}" />
        <h2>${profile.name || profile.login}</h2>
        <p>${profile.bio || "No bio available"}</p>
        <p>Followers: ${profile.followers}</p>
        <p>Public Repos: ${profile.public_repos}</p>
        <a href="${profile.html_url}" target="_blank">View Profile</a>
      </div>
    `;

    fetchRepos(username);

  } catch (error) {
    profileDiv.innerHTML = "Something went wrong";
  }
}
async function fetchRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
  const repos = await res.json();

  reposDiv.innerHTML = "<h3>Repositories</h3>";

  repos.forEach(repo => {
    const repoEl = document.createElement("div");
    repoEl.className = "repo";

    repoEl.innerHTML = `
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <p>${repo.description || "No description"}</p>
    `;

    reposDiv.appendChild(repoEl);
  });
}

console.log(profile);
console.log(repos);
