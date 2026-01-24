

console.log("Yees connected")
authenticate =  async (event)=>{
event.preventDefault()
obj = {
    email: document.getElementById("email").value,
    password: document.querySelector("#password").value
}
try {
    console.log("yes function is working")
    const response = await axios.post("http://localhost:2000/auth/login", obj)
    localStorage.setItem('userId', response.data.userId)
    localStorage.setItem("email",response.data.email)
    window.location.href  ="http://localhost:2000/expense.html"
} catch (error) {
alert(error.response.data)
}
} 