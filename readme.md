How is it works

- it is an operation manager
- it is a simply nodejs server which accepts stdin and returns stdout events
- in helpers folder, you can access some general system functions
- in scripts folder, you can access the system's main functions
- in temp folder, you can view all the operations like a log, which restarts every time the server is close or starts.

How to use:

- You will need Nodejs, so you can dowload it at : https://nodejs.org/en/
- Before the node install, you can be able to execute this script.

How to execute:

- simply do `node ./start.js`
- you will ask about the next operation

To create an account:

- this is an account creation exemple : {"account": {"active-card": true, "available-limit": 100}}
- simply put this command before the script starts and you will be able to execute more operations

- Operations:

- this is an operation call exemple : {"transaction": {"merchant": "Burger King", "amount": 20, "time": "2019-02-13T10:00:00.000Z"}}

- you will not be able tl execute the same operation twice, for this you need wait 2 minutes.
- you will not be able to execute more than three successful operations, for this you need wait 2 minutes.

How to exit:

- Simply type 'exit' inside the terminal