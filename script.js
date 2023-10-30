document.addEventListener('DOMContentLoaded', () => {
    function displayRSSFeed() {
        const feedUrl = 'https://rss.app/feeds/hyjEGbj4b929y2Pn.xml'; // Replace with the actual URL of your RSS feed
        const feedElement = document.getElementById('rss-feed');

        fetch(feedUrl)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, 'application/xml');
                const items = xmlDoc.querySelectorAll('item');

                let feedHTML = '<ul>';

                items.forEach(item => {
                    const title = item.querySelector('title').textContent;
                    const link = item.querySelector('link').textContent;
                    feedHTML += `<li><a href="${link}" target="_blank">${title}</a></li>`;
                });

                feedHTML += '</ul>';
                feedElement.innerHTML = feedHTML;

                // Start removing and replacing letters every 5 seconds
                setInterval(() => {
                    removeRandomLettersAndReplaceWithSpaces(4);
                }, 5000);

                // Modify articles immediately after displaying the feed
                modifyArticles();

                // Start changing colors
                changeArticleColors();
            })
            .catch(error => console.error('Error:', error));
    }

    function removeRandomLettersAndReplaceWithSpaces(numToRemove) {
        const articleTitles = document.querySelectorAll('#rss-feed li a');

        articleTitles.forEach(titleElement => {
            let originalTitle = titleElement.textContent;

            // Generate an array of indices to remove
            const indicesToRemove = [];
            while (indicesToRemove.length < numToRemove) {
                const randomIndex = Math.floor(Math.random() * originalTitle.length);
                if (!indicesToRemove.includes(randomIndex)) {
                    indicesToRemove.push(randomIndex);
                }
            }

            // Remove the specified number of random letters and replace with spaces
            for (let i = indicesToRemove.length - 1; i >= 0; i--) {
                originalTitle = originalTitle.slice(0, indicesToRemove[i]) + ' ' + originalTitle.slice(indicesToRemove[i] + 1);
            }

            titleElement.textContent = originalTitle;
        });
    }

    function modifyArticles() {
        const articleTitles = document.querySelectorAll('#rss-feed li a');

        function applyDynamicEffect() {
            articleTitles.forEach(titleElement => {
                let originalTitle = titleElement.textContent;

                let interval = setInterval(() => {
                    let modifiedTitle = '';
                    for (let i = 0; i < originalTitle.length; i++) {
                        modifiedTitle += randomizeText(originalTitle[i]);
                    }
                    titleElement.textContent = modifiedTitle;
                }, 100); // Change every 100 milliseconds for a dynamic effect

                setTimeout(() => {
                    clearInterval(interval);
                    titleElement.textContent = originalTitle;

                    // Dispatch custom event when letters stop
                    const event = new Event('lettersStopped');
                    document.dispatchEvent(event);

                }, 5000); // Keep dynamic effect for 5 seconds, adjust as needed
            });

            setTimeout(applyDynamicEffect, 10000); // Repeat after 10 seconds
        }

        applyDynamicEffect(); // Start the initial dynamic effect
    }

    function randomizeText(text) {
        let modifiedText = '';
        const vowels = ['a', 'e', 'i', 'o', 'u'];

        for (let i = 0; i < text.length; i++) {
            if (text[i].match(/[aeiouAEIOU]/)) {
                let randomVowel = vowels[Math.floor(Math.random() * vowels.length)];
                if (text[i].toLowerCase() === text[i]) {
                    modifiedText += randomVowel;
                } else {
                    modifiedText += randomVowel.toUpperCase();
                }
            } else {
                modifiedText += text[i];
            }
        }

        return modifiedText;
    }

    function changeArticleColors() {
        const articleTitles = document.querySelectorAll('#rss-feed li a');
        const colors = ['black', 'red', 'lightgreen'];
    
        function getRandomColor() {
            return colors[Math.floor(Math.random() * colors.length)];
        }
    
        articleTitles.forEach(titleElement => {
            titleElement.style.color = getRandomColor();
        });
    }
    
    // Call the function when the page loads
    window.addEventListener('load', changeArticleColors);
    

    function logSeconds() {
        let startTime = new Date().getTime();

        function updateElapsedTime() {
            let currentTime = new Date().getTime();
            let elapsedTime = Math.floor((currentTime - startTime) / 1000);
            console.log(elapsedTime + ' seconds have passed.');
        }

        setInterval(updateElapsedTime, 1000); // Update every second
    }

    logSeconds();

    function applyNewFunction() {
        // Add your new function code here
        // For example:
        // console.log('New function executed!');
    }

    applyNewFunction(); // Call the new function

    // Call the function to display the RSS feed and modify articles immediately
    displayRSSFeed();
});
