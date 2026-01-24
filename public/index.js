console.log("Yees connected")
authenticate =  async (event)=>{
event.preventDefault()
alert("data sent")
    errmsg = document.createElement("list")
    errmsg.innerHTML = ""
obj = {
    name: document.getElementById("Name").value,
    email: document.getElementById("email").value,
    password: document.querySelector("#password").value
}
try {
    console.log("yes function is working")
    await axios.post("http://localhost:2000/auth", obj)
    console.log(` data is sent ${obj.email}`)
} catch (error) {
    errmsg.innerHTML  = "Sorry, The email is already used"
    document.body.appendChild(errmsg)
}

} 