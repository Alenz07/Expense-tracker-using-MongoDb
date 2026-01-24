
console.log("This is working")
async function sendEmail(){
    const email = document.getElementById("email").value
    
        try {
            const resetting =  await axios.post("http://localhost:2000/reset/password",{email})
            console.log("yes reset email sent")
        } catch (error) {
            console.log("it does not work")
        
    }
}