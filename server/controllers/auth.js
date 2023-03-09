const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPass = bcrypt.compareSync(password, users[i].password)
        if (users[i].username === username && existingPass) {
          const secureUser = {...users[i]}
          delete secureUser.password
          console.log(secureUser)
          res.status(200).send(secureUser)
          console.log('It worked')
          return
        } 
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)
        const { username, email, password, firstName, lastName,  } = req.body
      
        const salt = bcrypt.genSaltSync(5)
        const passwordHash = bcrypt.hashSync(password, salt)
        
        let msgObj = {
          password: passwordHash,
          firstName,
          lastName,
          email,
          username
        }

        users.push(msgObj)
        
        let secureMessage = {...msgObj}
        delete secureMessage.password

        res.status(200).send(secureMessage)

    }

}