/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/azatecas')
  .then(res => {
    // console.log(res);
    const apiInfo = res.data;
    const apiCard = gitCard(apiInfo);
    cardsContainer.append(apiCard);

  })
  .catch(error => {
    console.log(`FATAL ERROR !!!!!!YOU COMPUTER WILL NOW BLOW UP!!!!!`, error);
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

//selects the container where the gitCard() information will go
const cardsContainer = document.querySelector('.cards');

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

//adds followers to the empty array above
axios.get('https://api.github.com/users/azatecas/followers')
  .then(res => {
    res.data.forEach(item => {
      followersArray.push(item.login);
    })

    followersArray.forEach(item => {
      axios.get(`https://api.github.com/users/${item}`)
      .then(res => {
        const followerInfo = res.data;
        const followersApiCard = gitCard(followerInfo);
        cardsContainer.append(followersApiCard);
      })
    })

  })
  .catch(error => {
    console.log('error on foll0wers array', error);
  });

  // followersArray.forEach(item => {
  //   axios.get(`https://api.github.com/users/${item}`)
  //   .then(res => {
  //     console.log(res)
  //   })
  //   console.log(`https://api.github.com/users/${item}`)
  // })



/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

//Creates user card from Github API
function gitCard(obj){

  //store html elements to local variables
  let myDiv = document.createElement('div');
  let myImg = document.createElement('img');
  let myDiv2 = document.createElement('div');
  let myH3 = document.createElement('h3');
  let pUser = document.createElement('p');
  let pLocation = document.createElement('p');
  let pProfile = document.createElement('p');
  let profileLink = document.createElement('a');
  let pFollowers = document.createElement('p');
  let pFollowing = document.createElement('p');
  let pBio = document.createElement('p');

  let link = document.createTextNode(`${obj.html_url}`);
  profileLink.append(link);

  //appending html elements
  myDiv.append(myImg);
  myDiv.append(myDiv2);
  myDiv2.append(myH3);
  myDiv2.append(pUser);
  myDiv2.append(pLocation);
  myDiv2.append(pProfile);

  pProfile.append(profileLink);
  myDiv2.append(pFollowers);
  myDiv2.append(pFollowing);
  myDiv2.append(pBio);

  //adding classes to html elements
  myDiv.classList.add('card');
  myDiv2.classList.add('card-info');
  myH3.classList.add('name')
  pUser.classList.add('username')

  //content from obj being passed to function variables
  myImg.src = obj.avatar_url;
  myH3.textContent = obj.name;
  pUser.textContent = obj.login;
  pLocation.textContent = obj.location;

  profileLink.title = obj.html_url;
  profileLink.href = obj.html_url;
  pProfile.textContent = `Profile: ${profileLink.href}`;

 

  // profileLink.href = obj.html_url;


  pFollowers.textContent = `${obj.followers} followers`;
  pFollowing.textContent = `${obj.following} following`;
  pBio.textContent = `Bio: ${obj.bio}`;

  //RETURNS THE PARENT DIV WITH ALL OTHER ELEMENTS ATTACHED
  return myDiv;  
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
