const welcomeComp = (req, res) =>{
    res.send(`Hi! This is a test of clustering application. Creating different instances of nodejs application using cluster module on different cores. This app is running on process ${process.pid}`)
}

module.exports = {
    welcomeComp: welcomeComp
}