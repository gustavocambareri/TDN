document.addEventListener('DOMContentLoaded', () => {
    let sound; // Define the Howl instance variable

    function startAudioContext() {
        // Create a Howl instance
        sound = new Howl({
            src: ['bomb4.mp3'] // Adjust the path to your audio file
        });

        // Event listener for when the letters stop
        document.addEventListener('lettersStopped', () => {
            console.log('ciao');

            // Reset the playback position
            sound.seek(0);

            // Play the audio
            sound.play();

            // Get all article titles
            const articleTitles = document.querySelectorAll('#rss-feed li a');

            articleTitles.forEach(titleElement => {
                let originalTitle = titleElement.textContent;

                // Generate a random start and end index for the chunk to be replaced with spaces
                const startIdx = Math.floor(Math.random() * originalTitle.length);
                const endIdx = Math.min(startIdx + 2, originalTitle.length); // Replace up to 2 characters (smaller holes)

                // Create the modified title with the chunk replaced by spaces
                let modifiedTitle = originalTitle.slice(0, startIdx) + ' '.repeat(endIdx - startIdx) + originalTitle.slice(endIdx);

                titleElement.textContent = modifiedTitle;
            });
        });
    }

    // Function to handle button click
    function handleButtonClick() {
        // Start the audio context after the user clicks the button
        startAudioContext();

        // Show the audio element and the rss-feed div
        document.getElementById('myAudio').style.display = 'block';
        document.getElementById('rss-feed').style.display = 'block';

        // Remove the button after it's clicked
        document.getElementById('startButton').remove();
    }

    // Add event listener to the button
    document.getElementById('startButton').addEventListener('click', handleButtonClick);
});
