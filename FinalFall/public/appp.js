// STEP 1: CLIENT SIDE set-up, wait to load full page
window.addEventListener('load', () => {

    // STEP 4: CLIENT SIDE socket connection
    // Open and connect socket
    let socket = io();

    // Listen for confirmation of connection
    socket.on('connect', () => {
        console.log("socket connected");
    });

    // STEP 8: client-side on event, check for received emitted events/data
    // Listen for objects named userPosition from server
    socket.on('userPosition', function (data) {

     // STEP 1A, select for some elements

     // STEP 1B, set up event listener
     addEventListener('click', () => {
         let xPos = MouseEvent.clientX;
         let yPos = MouseEvent.clientY;

            console.log('userX: ' + xPos + ', ' + 'userY: ' + yPos);
            // STEP 1C, grab data you want
            let userObj = { "userID": socket.id, "X": xPos, "Y": yPos };

            // STEP 5: emit event, SEND socket objects to server
            socket.emit('userPosition', userObj);
        }).begin();
        });
        console.log("user position detected");
        console.log(data);

        // Create an ellipse from data and page element
        let receivedXPos = data.X;
        let receivedYPos = data.Y;

        // Create a new ellipse element
        let ellipseEl = document.createElement('div');
        ellipseEl.className = 'ellipses'; // Add appropriate styling to your ellipse
        ellipseEl.style.position = 'absolute';
        ellipseEl.style.left = (receivedXPos - 45) + 'px'; // Adjust as needed
        ellipseEl.style.top = (receivedYPos - 50) + 'px'; // Adjust as needed

        // Append the ellipse to the '.ellipses' div container
        document.querySelector(".ellipses").appendChild(ellipseEl);
    });
    // Update the green ellipse on receiving gaze data from the server
    // socket.on('updateGaze', function (data) {
    //     // Update the position of the green ellipse
    //     document.getElementById('elli').style.left = data.x + 'px';
    //     document.getElementById('elli').style.top = data.y + 'px';
    // });

