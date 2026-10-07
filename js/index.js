const signupBtn = document.getElementById("signup")
const googleBtn=document.getElementById("google")

signupBtn.addEventListener("click",()=>{
    const username = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password=document.getElementById("password").value
    // console.log(username, email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential)=>{
        // console.log(userCredential);
const user = userCredential.user
// console.log(user);

firebase.firestore().collection("users").doc(user.uid).set({
  username,
  email,
  userId: user.uid,
  createdOn: user.metadata.creationTime
}).then(()=>{
          window.location.href=  "home.html"

        }).catch((error)=>{
          console.error(error);
          
        })
        
    }).catch((error)=>{
        console.error(error.message);
        
    })
    
})


