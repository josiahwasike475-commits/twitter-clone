  firebase.auth().onAuthStateChanged((user)=>{
  
  if(user){
    let uid = user.uid
      const selectedTweet=decodeURIComponent(window.location.search)
    const selectedTweetId=selectedTweet.substring(1)
    // console.log(selectedTweetId);

    firebase.firestore().collection("users").doc(uid).get().then((userDoc)=>{
        let user = userDoc.data()
        // console.log(user);
    document.getElementById("username").innerText = user.username
    document.getElementById("username1").innerText = user.username
        document.getElementById("handle").innerText = `@${user.username}`
        document.getElementById("bio").innerText = user?.bio || "javascript"
    document.getElementById("edtName").value=user.username
    document.getElementById("edtBio").value=user.bio||""

  })

    document.getElementById("saveChanges").addEventListener("click",()=>{
      let edtName=document.getElementById("edtName").value
      let edtBio=document.getElementById("edtBio").value
      firebase.firestore().collection("users").doc(uid).update({
        username:edtName,
        bio:edtBio
      }).then(()=>{
        window.location.reload()
      }).catch(error=>{
        console.error(error)
      })
    })    
  
    firebase.firestore().collection("tweets").where("userId","==",uid).get().then(queryTweets=>{
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
    window.location.href = "login.html"
}})
 

 document.getElementById("logout").addEventListener("click",()=>{
    firebase.auth().signOut().then(() => {
  // Sign-out successful.
  window.location.href  ="login.html"
}).catch((error) => {
  // An error happened.
});
})


