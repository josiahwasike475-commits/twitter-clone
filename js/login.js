const loginBtn=document.getElementById("login")

loginBtn.addEventListener("click",()=>{
    const email=document.getElementById("email").value
    const password=document.getElementById("password").value
    

    // console.log(email,password);
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // console.log(user);
            window.location.href=  "home.html"

    
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error(errorMessage);
    
  });
})
