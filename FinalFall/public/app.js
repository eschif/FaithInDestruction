//STEP 1: CLIENT SIDE set-up, wait to load full page
window.addEventListener('load', () => {

    //STEP 4: CLIENT SIDE socket connection
    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', ()=> {
        console.log("socket connected");
    });
    
    
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d", { willReadFrequently: true });

    //STEP 8: client-side on event, check for received emitted events/data
    let smallEllipse = document.getElementById('lil-ellipses');

    //Listen for objects named userPosition from server
    socket.on('userPosition', function (data) {
        console.log("user position detected");
        console.log(data);

        //Create an ellipse from data and page element
        // let receivedUser = data.userID;
        // let receivedXPos = data.X;
        // let receivedYPos = data.Y;
        let receivedXPos = data.X;
        let receivedYPos = data.Y;
        let ellipseEl = document.createElement('div');
        ellipseEl.setAttribute('id', 'lil-ellipses');
        document.getElementById('lil-ellipses').style.left = (receivedXPos-45)+'px';
        document.getElementById('lil-ellipses').style.top = (receivedYPos-50)+'px';
    });

    //STEP 1A, select for some elements
    // let causticEllipse = document.getElementById('lil-ellipses');
    let id = document.getElementById('user');
    let x = document.getElementById('Xpos');
    let y = document.getElementById('Ypos');
    let xyDetection = document.getElementById('lil-ellipses');

    //STEP 1B, set up event listener
    xyDetection.addEventListener('click', () => {
        //STEP 1C, grab data you want
        // let userID = socket.id;
        // let xCoord = xprediction;
        // let yCoord = yprediction;

        webgazer.setGazeListener(function(data, elapsedTime) {
            if (data == null) {
                return;
            }
            var xpredict = data.x; //these x coordinates are relative to the viewport
            var ypredict = data.y; //these y coordinates are relative to the viewport
            console.log(elapsedTime); //elapsed time is based on time since begin was called
            console.log('userX: '+xpredict + ',' + 'userY: '+ypredict);
        }).begin();
        //STEP 1D, make an object
        let userObj = { "userID": socket.id, "X": xpredict, "Y": ypredict };
        // let userObj = { "userID": userID, "X": xCoord, "Y": yCoord };



    //STEP 5: emit event, SEND socket objects to server
    socket.emit('userPosition', userObj);
});
    //Listen for messages named 'caustic' from the server
    // socket.on('caustic', function(data) {
    //     console.log("caustic detected");
    //     console.log(data);
    


    //Create a message string and page element
    // let receivedCaustic = data.name + ": " + data.msg;
    // let CausticEl = document.createElement('div');
    // CausticEl.innerHTML = receivedCaustic;
    //look through all the users and draw their ellipses at the x,y coordinates

    // let xCoord = document.getElementById('lil-ellipses').style.left;
    // xCoord = ((users[postion.x])-20)+'px';
    // let yCoord = document.getElementById('lil-ellipses').style.top;
    // yCoord = ((users[position.y])-25)+'px';

    // let CausticEl = document.createElement('div');
    // CausticEl.innerHTML = ellipse();
    
    //Add the element with the message to the page
    // chatBox.appendChild(CausticEl);
    // });


});


// function startAudioRecording() {
//     //start recording using the audio recording API
//     audioRecorder.start()
//         .then(() => { //on success
//             console.log("Recording Audio...")    
//         })    
//         .catch(error => { //on error
//             //No Browser Support Error
//             if (error.message.includes("mediaDevices API or getUserMedia method is not supported in this browser.")) {       
//                 console.log("To record audio, use browsers like Chrome and Firefox.");
//             }
//         });
// }
