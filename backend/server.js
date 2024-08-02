// Import the server application from the app module
const server=require("./app");

// PORT number
const PORT= process.env.PORT||7000;


// server listening on port 
server.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})