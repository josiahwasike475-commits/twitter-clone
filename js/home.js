const profileBtn=document.getElementById("profile")
firebase.auth().onAuthStateChanged((user)=>{
  
  if(user){
    let uid = user.uid
  
    // console.log(uid);

    firebase.firestore().collection("users").doc(uid).get().then((userDoc)=>{
        let user = userDoc.data()
        // console.log(user);

        document.getElementById("name").innerText = user.username
        document.getElementById("hashtag").innerText = `@${user.username}`
    
document.getElementById("postBtn").addEventListener("click",()=>{
    let post = document.getElementById("post").value
    firebase.firestore().collection("tweets").doc().set({
        username: user.username,
        userId:uid,
        post,
        createdOn: Date.now()
    }).then(()=>{
        window.location.reload()
    }).catch((error)=>{
        console.error(error);
        
    })


})

        
    })
    
firebase.firestore().collection("tweets").orderBy("createdOn","asc").get().then((queryTweets)=>{
    queryTweets.forEach((tweetDoc)=>{
        let tweet = tweetDoc.data()
        // console.log(tweet);
        let tweetId=tweetDoc.id
        let tweetHTML=generateTweetHTML(tweet,tweetId)
        document.getElementById("tweetcontainer").insertAdjacentHTML("afterbegin",tweetHTML)
        
    })
})


function generateTweetHTML(tweet,tweetId){
return `
<div class="post">
   <div class="think" onclick="naviagatToCommentspage(\'${tweetId}\')">
            <span>${tweet.username}</span>
            <p>${tweet.post}</p>
            </div>
  <div class="icons">

                <i class="fa-solid fa-comment"></i>
                <i class="fa-solid fa-retweet"></i>
                <i class="fa-regular fa-heart"></i>
            </div>
            </div>

`
}

window.naviagatToCommentspage=(tweetId)=>{
    window.location.href=`comment.html?${tweetId}`
}
  }
  else{
    window.location.href="login.html"
  }
})


document.getElementById("logout").addEventListener("click",()=>{
    firebase.auth().signOut().then(() => {
  // Sign-out successful.
  window.location.href  ="login.html"
}).catch((error) => {
  // An error happened.
});
})


