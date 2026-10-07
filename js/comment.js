firebase.auth().onAuthStateChanged((user)=>{
  
  if(user){
    let uid = user.uid
      const selectedTweet=decodeURIComponent(window.location.search)
    const selectedTweetId=selectedTweet.substring(1)
    // console.log(selectedTweetId);

    firebase.firestore().collection("users").doc(uid).get().then((userDoc)=>{
        let user = userDoc.data()
        // console.log(user);
   document.getElementById("name").innerText = user.username
        document.getElementById("hashtag").innerText = `@${user.username}`
    document.getElementById("postBtn").addEventListener("click",()=>{
    let post = document.getElementById("post").value
    firebase.firestore().collection("comments").doc().set({
        username: user.username,
        userId:uid,
        email:user.email,
        TweetId:selectedTweetId,
        post,
        createdOn: Date.now()
    }).then(()=>{
        window.location.reload()
    }).catch((error)=>{
        console.error(error);
        
    })


  })

        
    
    
    

}
 )

 firebase.firestore().collection("tweets").doc(selectedTweetId).get().then((tweetDoc)=>{
        let tweet = tweetDoc.data()
        // console.log(tweet);

        
        let tweetHTML=generateTweetHTML(tweet)
        document.getElementById("tweetcontainer").insertAdjacentHTML("afterbegin",tweetHTML)

  })

firebase.firestore().collection("comments").where("TweetId", "==", selectedTweetId).orderBy("createdOn","asc").get().then((queryComments)=>{
    queryComments.forEach((commentDoc)=>{
        let comment = commentDoc.data()
        // console.log(comment);
        let commentHTML=generateTweetHTML(comment)
        document.getElementById("commentsContainer").insertAdjacentHTML("afterbegin",commentHTML)
        
    })
})

 function generateTweetHTML(tweet){
return `
<div class="post">
   <div class="think" >
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
