document.getElementById("signIn-btn").addEventListener('click',function(){
   const inputName =  document.getElementById('input-name');
   const name  = inputName.value;

   const inputPassword = document.getElementById('input-password');
   const password = inputPassword.value;
 

   if(name == "admin" && password == "admin123"){
     alert("login success");
     window.location.assign('/home.html')
   }else{
    alert("login failed");
    return;
   }
   
})