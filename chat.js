// Initialize Firebase
const config = {
    apiKey: 'AIzaSyBVVD3pqxS_AVxAsVfXqS16wfaUu32CIWs',
    authDomain: 'chat-db62f.firebaseapp.com',
    databaseURL: 'https://chat-db62f.firebaseio.com',
    projectId: 'chat-db62f',
    storageBucket: '',
    messagingSenderId: '296866489974'
}

const getUserneme = () => swal({
    content: {
        element: "input",
        attributes: {
            placeholder: "Ingresa tu usuario",
            type: "text",
        },
    }
})

const textSend = document.getElementById('textSend')
const btnSend = document.getElementById('btnSend')
const messagesDisplayer = document.getElementById('messagesDisplayer')
const userName = document.getElementById('userName')

const addToDispalyer = (username, message) => {

    const bubbleContainer = document.createElement('div')
    const mb_username = document.createElement('div')
    const mb_message = document.createElement('div')

    const p_username = document.createElement('p')
    const p_message = document.createElement('p')

    bubbleContainer.className = 'mensaje_bubble_container'
    mb_username.className = 'mb_username'
    mb_message.className = 'mb_message'

    p_username.appendChild(document.createTextNode(username))
    p_message.appendChild(document.createTextNode(message))

    mb_username.appendChild(p_username)
    mb_message.appendChild(p_message)

    bubbleContainer.appendChild(mb_username)
    bubbleContainer.appendChild(mb_message)
    messagesDisplayer.appendChild(bubbleContainer)
}

const main = async () => {

    firebase.initializeApp(config)

    const meUsername = await getUserneme()
    const chatReference = firebase.database().ref('chat')
    const push = (username, message) => {
        chatReference.push({
            username,
            message
        })
    }

    userName.appendChild(document.createTextNode(meUsername))

    btnSend.addEventListener('click', () => {
        const message = textSend.value
        push(meUsername, message)
        textSend.value = ''
    })

    textSend.addEventListener('keydown', (eve) => {
        const message = textSend.value
        if (eve.keyCode === 13) {
            push(meUsername, message)
            textSend.value = ''
        }
    })

    chatReference
        .endAt()
        .limitToLast(1)
        .on('child_added', (snapShot) => {
            const {
                username,
                message
            } = snapShot.val()
            addToDispalyer(username, message)
        });

}

main()