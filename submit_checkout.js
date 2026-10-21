const scriptUrl = "https://script.google.com/macros/s/AKfycbwHywSWUsa0Rv4Lhd6WEpivYCi3mLxFpbNSIEIdzzAeblXQEN2gKSIR6C0zQBBTVl57KA/exec";

let form = document.getElementById('form_contact');

form.addEventListener('submit' , (e)=>{
    e.preventDefault();

    fetch(scriptUrl , {
        method: "post",
        body: new FormData(form),
    }).then((response) =>{
        setTimeout(()=>{
            localStorage.removeItem("cart")
            window.location.reload()
        },1000)
    })
    
    
    .catch((error) => console.log("error" , error.message))
})