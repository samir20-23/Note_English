
        // Sample data for words
        let words = [
            // General
            { word: "Hello", translation: "مرحبًا", category: "general", language: "english<->arabic", example: "Hello, how are you?", isFavorite: false, isMastered: false },
            { word: "Thank you", translation: "شكرًا", category: "general", language: "english<->arabic", example: "Thank you for your help.", isFavorite: false, isMastered: false },
            { word: "Goodbye", translation: "وداعًا", category: "general", language: "english<->arabic", example: "Goodbye, see you later.", isFavorite: false, isMastered: false },
            { word: "Please", translation: "من فضلك", category: "general", language: "english<->arabic", example: "Please pass me the salt.", isFavorite: false, isMastered: false },
            { word: "Sorry", translation: "آسف", category: "general", language: "english<->arabic", example: "I am sorry for being late.", isFavorite: false, isMastered: false },

            // Business
            { word: "Profit", translation: "ربح", category: "business", language: "english<->arabic", example: "The company made a high profit this year.", isFavorite: false, isMastered: false },
            { word: "Meeting", translation: "اجتماع", category: "business", language: "english<->arabic", example: "We have a meeting at 10 AM.", isFavorite: false, isMastered: false },
            { word: "Contract", translation: "عقد", category: "business", language: "english<->arabic", example: "The contract is valid for two years.", isFavorite: false, isMastered: false },

            // Technology
            { word: "Internet", translation: "الإنترنت", category: "technology", language: "english<->arabic", example: "The internet connects people worldwide.", isFavorite: false, isMastered: false },
            { word: "Software", translation: "البرمجيات", category: "technology", language: "english<->arabic", example: "This software helps manage accounts.", isFavorite: false, isMastered: false },
            { word: "Hardware", translation: "الأجهزة", category: "technology", language: "english<->arabic", example: "The computer hardware includes the processor and memory.", isFavorite: false, isMastered: false },

            // Science
            { word: "Gravity", translation: "الجاذبية", category: "science", language: "english<->arabic", example: "Gravity keeps us on the ground.", isFavorite: false, isMastered: false },
            { word: "Atom", translation: "ذرة", category: "science", language: "english<->arabic", example: "An atom is the smallest unit of matter.", isFavorite: false, isMastered: false },
            { word: "Experiment", translation: "تجربة", category: "science", language: "english<->arabic", example: "The scientist conducted an experiment.", isFavorite: false, isMastered: false },

            // Travel
            { word: "Airport", translation: "مطار", category: "travel", language: "english<->arabic", example: "The flight departs from the airport.", isFavorite: false, isMastered: false },
            { word: "Hotel", translation: "فندق", category: "travel", language: "english<->arabic", example: "We booked a hotel for the night.", isFavorite: false, isMastered: false },
            { word: "Passport", translation: "جواز سفر", category: "travel", language: "english<->arabic", example: "You need a passport to travel abroad.", isFavorite: false, isMastered: false },

            // Health
            { word: "Doctor", translation: "طبيب", category: "health", language: "english<->arabic", example: "The doctor checked my health.", isFavorite: false, isMastered: false },
            { word: "Medicine", translation: "دواء", category: "health", language: "english<->arabic", example: "You need to take your medicine.", isFavorite: false, isMastered: false },
            { word: "Exercise", translation: "تمرين", category: "health", language: "english<->arabic", example: "Exercise is good for the heart.", isFavorite: false, isMastered: false },

            // Emotions
            { word: "Happy", translation: "سعيد", category: "emotions", language: "english<->arabic", example: "I feel happy today.", isFavorite: false, isMastered: false },
            { word: "Angry", translation: "غاضب", category: "emotions", language: "english<->arabic", example: "He was angry about the mistake.", isFavorite: false, isMastered: false },
            { word: "Sad", translation: "حزين", category: "emotions", language: "english<->arabic", example: "She felt sad after the news.", isFavorite: false, isMastered: false }
        ];

        // DOM Elements
        const mainBody = document.getElementById('mainBody');
        const wordsTableBody = document.getElementById('wordsTableBody');
        const totalWords = document.getElementById('totalWords');
        const learningStreak = document.getElementById('learningStreak');
        const masteredWords = document.getElementById('masteredWords');
        const searchInput = document.getElementById('searchInput');
        const categoryFilter = document.getElementById('categoryFilter');
        const languageFilter = document.getElementById('languageFilter');
        const sortFilter = document.getElementById('sortFilter');
        const addWordModal = document.getElementById('addWordModal');
        const flashcardModal = document.getElementById('flashcardModal');
        const dailyChallengeModal = document.getElementById('dailyChallengeModal');
        const notification = document.getElementById('notification');

        // Theme Management
        function toggleTheme() {
            if (mainBody.classList.contains('dark')) {
                mainBody.classList.remove('dark');
                mainBody.classList.add('light');
            } else {
                mainBody.classList.remove('light');
                mainBody.classList.add('dark');
            }
        }

        // Toggle Import/Export Menu
        function toggleImportExportMenu() {
            const menu = document.getElementById('importExportMenu');
            menu.classList.toggle('hidden');
        }

        // Export Words
        function exportWords() {
            const dataStr = JSON.stringify(words);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'words.json';
            a.click();
            URL.revokeObjectURL(url);
            showNotification('Words exported successfully!','war_livl_0','war_livl_0');
        }

        // Import Words
        function importWords(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const content = e.target.result;
                    words = JSON.parse(content);
                    renderWordsTable();
                    showNotification('Words imported successfully!','war_livl_0');
                };
                reader.readAsText(file);
            }
        }

        // Show Add Word Modal
        function showAddModal() {
            // Reset the form fields
            const addWordForm = document.getElementById('addWordForm');
            addWordForm.reset();

            // Remove any previous animation classes
            addWordModal.classList.remove('animate__fadeIn', 'animate__slideInUp');

            // Show the modal
            addWordModal.classList.remove('hidden');

            // Add animation classes for a smooth appearance
            addWordModal.classList.add('animate__animated', 'animate__fadeIn');
            addWordModal.querySelector('.animate__slideInUp').classList.add('animate__animated', 'animate__slideInUp');

            // Focus on the first input field for better UX
            const firstInput = addWordForm.querySelector('input[name="word"]');
            firstInput.focus();

            // Center the modal on the screen
            centerModal(addWordModal);
        }

        // Helper function to center the modal
        function centerModal(modal) {
            const modalContent = modal.querySelector('.animate__slideInUp');
            const windowHeight = window.innerHeight;
            const modalHeight = modalContent.offsetHeight;

            // Calculate the top margin to center the modal
            const topMargin = (windowHeight - modalHeight) / 2;
            modalContent.style.marginTop = `${Math.max(topMargin, 20)}px`; // Ensure it's at least 20px from the top
        }

        // Hide Add Word Modal
        function hideAddModal() {
            // Add animation classes for a smooth exit
            addWordModal.classList.add('animate__animated', 'animate__fadeOut');
            addWordModal.querySelector('.animate__slideInUp').classList.add('animate__animated', 'animate__slideOutDown');

            // Hide the modal after the animation ends
            setTimeout(() => {
                addWordModal.classList.add('hidden');
                addWordModal.classList.remove('animate__fadeOut');
                addWordModal.querySelector('.animate__slideInUp').classList.remove('animate__slideOutDown');
            }, 300); // Match the duration of the animation
        }

        // Hide Add Word Modal
        function hideAddModal() {
            addWordModal.classList.add('hidden');
        }

        // Modified Add New Word with Local Storage
        document.getElementById('addWordForm').addEventListener('submit', function (e) {
            let wordInput = document.getElementById('word');
            let translation = document.getElementById('translation');
            if (wordInput.value !== "" && translation.value !== "") {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newWord = {
                    word: formData.get('word'),
                    translation: formData.get('translation'),
                    category: formData.get('category'),
                    language: formData.get('language'),
                    example: formData.get('example'),
                    isFavorite: false,
                    isMastered: false,
                    dateAdded: new Date().toISOString()
                };
                words.push(newWord);
                saveToLocalStorage();
                renderWordsTable();
                hideAddModal();
                showNotification('Word added successfully!', 'war_livl_0');
                e.target.reset();
                console.log("\\\\\\\\\\\\\\\\\\\\\#" + wordInput.value + "#\\\\\\\\\\\\\\\\\\\\\\#" + translation.value + "#\\\\\\\\\\\\\\\\\\\\\\#");

            } else if (wordInput.value == "" && translation.value !== "") {

                showNotification('Please enter a word to translate', 'war_livl_1');
            } if (translation.value == "" && wordInput.value !== "") {
                showNotification('Please enter a translate for word', 'war_livl_2');
            }
        });

        // Render Words Table
        function renderWordsTable() {
            wordsTableBody.innerHTML = '';
            words.forEach((word, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${word.word}</td>
            <td class="px-6 py-4 whitespace-nowrap">${word.translation}</td>
            <td class="px-6 py-4 whitespace-nowrap">${word.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">${word.language}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button onclick="toggleFavorite(${index})" class="text-yellow-400 hover:text-yellow-500">
                    <i class="fas ${word.isFavorite ? 'fa-star' : 'fa-star-o'}"></i>
                </button>
                <button onclick="deleteWord(${index})" class="text-red-400 hover:text-red-500 ml-2">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
                wordsTableBody.appendChild(row);
            });
            updateProgress();
        }

        // Modified Toggle Favorite with Local Storage
        function toggleFavorite(index) {
            words[index].isFavorite = !words[index].isFavorite;
            saveToLocalStorage();
            renderWordsTable();
        }
        // Modified Delete Word with Local Storage
        function deleteWord(index) {
            words.splice(index, 1);
            saveToLocalStorage();
            renderWordsTable();
            showNotification('Word deleted successfully!','war_livl_0');
        }

        // Update Progress
        function updateProgress() {
            totalWords.textContent = words.length;
            learningStreak.textContent = 0; // Placeholder for streak logic
            masteredWords.textContent = words.filter(word => word.isMastered).length;
        }

        // Show Notification
        function showNotification(message, livl) {
            notification.textContent = message;
            notification.classList.remove('hidden');

            if (livl == 'war_livl_1') {
                notification.style.backgroundColor = "#fd7d53";
                setTimeout(() => {
                    notification.classList.add('hidden');
                }, 4000); 

            } else if (livl == 'war_livl_2') {
                setTimeout(() => {
                    notification.classList.add('hidden');
                },2000);
                notification.style.backgroundColor = "#9bd100";

            } else if (livl == '' || livl == undefined || livl == null || livl == 'war_livl_0') {
                setTimeout(() => {
                    notification.classList.add('hidden');
                }, 3000);
            }
        }

        // Flashcard Logic
        let currentCardIndex = 0;
        let isFlipped = false;

        function showFlashcards() {
            flashcardModal.classList.remove('hidden');
            showCard(currentCardIndex);
        }

        function hideFlashcardModal() {
            flashcardModal.classList.add('hidden');
        }

        function showCard(index) {
            const card = words[index];
            const flashcardContent = document.getElementById('flashcardContent');
            flashcardContent.textContent = isFlipped ? card.translation : card.word;
        }

        function flipCard() {
            isFlipped = !isFlipped;
            showCard(currentCardIndex);
        }

        function nextCard() {
            currentCardIndex = (currentCardIndex + 1) % words.length;
            isFlipped = false;
            showCard(currentCardIndex);
        }

        function previousCard() {
            currentCardIndex = (currentCardIndex - 1 + words.length) % words.length;
            isFlipped = false;
            showCard(currentCardIndex);
        }

        // Daily Challenge Logic
        function showDailyChallenge() {
            dailyChallengeModal.classList.remove('hidden');
            const randomWord = words[Math.floor(Math.random() * words.length)];
            document.getElementById('dailyWord').textContent = randomWord.word;
            document.getElementById('dailyDefinition').textContent = randomWord.translation;
            document.getElementById('dailyExample').textContent = `Example: ${randomWord.example}`;
        }

        function hideDailyChallengeModal() {
            dailyChallengeModal.classList.add('hidden');
        }

        function markLearned() {
            const word = document.getElementById('dailyWord').textContent;
            const wordIndex = words.findIndex(w => w.word === word);
            if (wordIndex !== -1) {
                words[wordIndex].isMastered = true;
                updateProgress();
                showNotification('Word marked as learned!','war_livl_0');
            }
            hideDailyChallengeModal();
        }

        // Voice Recognition
        function startVoiceRecognition() {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.onresult = function (event) {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                filterWords();
            };
            recognition.start();
        }

        // Modified filter function to work with local storage
        function filterWords() {
            const searchTerm = searchInput.value.toLowerCase();
            const category = categoryFilter.value;
            const language = languageFilter.value;
            const sort = sortFilter.value;

            let filteredWords = words.filter(word => {
                return (word.word.toLowerCase().includes(searchTerm) ||
                    word.translation.toLowerCase().includes(searchTerm)) &&
                    (category === '' || word.category === category) &&
                    (language === '' || word.language === language);
            });

            // Apply sorting
            switch (sort) {
                case 'newest':
                    filteredWords.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    break;
                case 'alphabetical':
                    filteredWords.sort((a, b) => a.word.localeCompare(b.word));
                    break;
            }

            renderFilteredWords(filteredWords);
        }

        function renderFilteredWords(filteredWords) {
            wordsTableBody.innerHTML = '';
            filteredWords.forEach((word, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap">${word.word}</td>
            <td class="px-6 py-4 whitespace-nowrap">${word.translation}</td>
            <td class="px-6 py-4 whitespace-nowrap">${word.category}</td>
            <td class="px-6 py-4 whitespace-nowrap">${word.language}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <button onclick="toggleFavorite(${index})" class="text-yellow-400 hover:text-yellow-500">
                    <i class="fas ${word.isFavorite ? 'fa-star' : 'fa-star-o'}"></i>
                </button>
                <button onclick="deleteWord(${index})" class="text-red-400 hover:text-red-500 ml-2">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
                wordsTableBody.appendChild(row);
            });
        }

        // Event Listeners
        searchInput.addEventListener('input', filterWords);
        categoryFilter.addEventListener('change', filterWords);
        languageFilter.addEventListener('change', filterWords);
        sortFilter.addEventListener('change', filterWords);

        // Initial Render
        renderWordsTable();
        //speack

        function speakWord(button) {
            // Get the input field associated with the button
            const inputField = button.previousElementSibling;

            // Get the word from the input field
            const word = inputField.value.trim();

            // Check if the word is not empty
            if (word === "") {
                alert("Please enter a word to speak.");
                return;
            }

            // Check if the browser supports the Web Speech API
            if ('speechSynthesis' in window) {
                // Create a new SpeechSynthesisUtterance object
                const utterance = new SpeechSynthesisUtterance(word);

                // Get the language pair selected by the user
                const languagePair = document.querySelector('select[name="language"]').value;

                // Set the language based on the selected language pair
                switch (languagePair) {
                    case "english<->arabic":
                        utterance.lang = "ar-SA"; // Arabic (Saudi Arabia)
                        break;
                    case "english<->french":
                        utterance.lang = "fr-FR"; // French (France)
                        break;
                    case "english<->spanish":
                        utterance.lang = "es-ES"; // Spanish (Spain)
                        break;
                    default:
                        utterance.lang = "en-US"; // Default to English (US)
                        break;
                }

                // Get all available voices
                const voices = speechSynthesis.getVoices();

                // Try to find a voice that matches the selected language
                const selectedVoice = voices.find(voice => voice.lang === utterance.lang);
                if (selectedVoice) {
                    utterance.voice = selectedVoice; // Use the matching voice
                } else {
                    console.warn("No matching voice found for the selected language. Using default voice.");
                }

                // Set the pitch, rate, and volume
                utterance.pitch = 1; // Range: 0 to 2
                utterance.rate = 1; // Speed: 0.1 to 10
                utterance.volume = 1; // Range: 0 to 1

                // Speak the word
                speechSynthesis.speak(utterance);
            } else {
                alert("Your browser does not support the Web Speech API.");
            }
        }

        function submitForm(event) {
            event.preventDefault();  // Prevent the default form submission

            // Here, you can handle form submission, e.g., with an AJAX request or by submitting the form data
            const formData = new FormData(document.getElementById('addWordForm'));

            // Log or send the data
            console.log(Object.fromEntries(formData.entries()));

            // Example: Submit via AJAX (use your preferred method)

        }
        // AIzaSyBrQy3eKFbcn70c06R2CX1fQk-YAAe8TKg
        // + + +
        // + + +
        // + + +
        document.getElementById('word').addEventListener('input', autoTranslate);

        async function autoTranslate() {
            const wordInput = document.getElementById('word');
            const translationInput = document.querySelector('input[name="translation"]');
            const languageSelect = document.querySelector('select[name="language"]');
            const word = wordInput.value.trim();

            if (!word) {
                showNotification('Please enter a word to translate', 'war_livl_2');
                return;
            }
            if (word.value == "") {
                showNotification('Please enter a word to translate', 'war_livl_2');
                return;
            }


            // Check if word is already added
            if (isWordAlreadyAdded(word)) {
                showNotification('This word has already been translated', 'war_livl_1');
                return;
            }

            try {
                // if (translationInput.value ==""){

                // }
                // Show loading state
                translationInput.value = 'Translating...';

                // Detect the language of the word
                const detectedLang = detectLanguage(word);
                let sourceLang = 'en'; // Default source language is English
                let targetLang = 'ar'; // Default target language is Arabic

                // Change language pair based on detection
                if (detectedLang === 'en') {
                    sourceLang = 'en';
                    if (languageSelect.value === 'english<->french') {
                        targetLang = 'fr'; // English ↔ French
                    } else if (languageSelect.value === 'english<->spanish') {
                        targetLang = 'es'; // English ↔ Spanish
                    }
                } else if (detectedLang === 'ar') {
                    sourceLang = 'ar';
                    targetLang = 'en'; // Arabic ↔ English by default
                    if (languageSelect.value === 'arabic<->english') {
                        targetLang = 'en'; // Arabic ↔ English
                    }
                } else {
                    sourceLang = 'en';
                    targetLang = 'fr';
                }

                // Using MyMemory API (Free Translation API)
                const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${sourceLang}|${targetLang}`;
                const response = await fetch(url);
                const data = await response.json();

                // Check for the "MYMEMORY WARNING"
                if (data.responseData && data.responseData.translatedText && data.responseData.translatedText.includes('MYMEMORY WARNING')) {
                    console.warn('Translation limit reached');
                    translationInput.value = ''; // Empty the input value
                    return;
                }

                // Handle translation response
                if (!data.responseData || !data.responseData.translatedText) {
                    throw new Error('Translation failed');
                }

                translationInput.value = data.responseData.translatedText;
            } catch (error) {
                console.error('Translation error:', error);
                translationInput.value = '';
            }
        }

        function isWordAlreadyAdded(word) {
            // Replace with your logic to check if the word is already translated
            const alreadyTranslatedWords = ['hello', 'world']; // Example array, replace with actual storage/logic
            return alreadyTranslatedWords.includes(word.toLowerCase());
        }



        function detectLanguage(word) {
            // Simple check to detect Arabic or English based on characters
            const arabicPattern = /[\u0600-\u06FF]/; // Arabic range in Unicode
            const englishPattern = /^[a-zA-Z\s]*$/; // English letters only (ignores spaces)

            if (arabicPattern.test(word)) {
                return 'ar'; // Arabic
            } else if (englishPattern.test(word)) {
                return 'en'; // English
            } else {
                return 'unknown'; // Unknown language
            }
        }

        // Store predefined word sets
        const wordSets = {
            general: [
                { word: "analyze", translation: "تحليل", category: "general", language: "english<->arabic", example: "We need to analyze the data before making decisions." },
                { word: "sequence", translation: "تسلسل", category: "general", language: "english<->arabic", example: "The sequence of events led to a surprising conclusion." },
                { word: "Exceptions", translation: "استثناءات", category: "general", language: "english<->arabic", example: "There are exceptions to this rule." }
            ],
            business: [
                { word: "investment", translation: "استثمار", category: "business", language: "english<->arabic", example: "This is a long-term investment." },
                { word: "strategy", translation: "استراتيجية", category: "business", language: "english<->arabic", example: "We need a new marketing strategy." }
            ],
            technology: [
                { word: "algorithm", translation: "خوارزمية", category: "technology", language: "english<->arabic", example: "The algorithm processes data efficiently." },
                { word: "database", translation: "قاعدة بيانات", category: "technology", language: "english<->arabic", example: "The database stores customer information." }
            ]
        };
        // Keep track of which sets have been added
        let addedSets = new Set();
        function newWord() {
            // Show loading state on the button
            const button = document.getElementById('btnAddNewData');
            const originalContent = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            button.disabled = true;

            try {
                // Get all available sets that haven't been fully added yet
                const availableSets = Object.keys(wordSets).filter(set => {
                    const remainingWords = wordSets[set].filter(word =>
                        !words.some(w => w.word === word.word)
                    );
                    return remainingWords.length > 0;
                });

                if (availableSets.length === 0) {
                    showNotification('All available words have been added! Try adding custom words instead.','war_livl_1');
                    return;
                }

                // Pick a random set from available sets
                const randomSet = availableSets[Math.floor(Math.random() * availableSets.length)];

                // Filter out words already in the table
                let newWords = wordSets[randomSet].filter(word =>
                    !words.some(w => w.word === word.word)
                );

                if (newWords.length === 0) {
                    showNotification(`No new words available in the ${randomSet} set.`);
                    return;
                }

                // Select a random subset of words (e.g., 2-3 words at a time)
                const randomWords = [];
                const count = Math.min(3, newWords.length); // Adjust number of words to add
                for (let i = 0; i < count; i++) {
                    const randomIndex = Math.floor(Math.random() * newWords.length);
                    randomWords.push(newWords.splice(randomIndex, 1)[0]);
                }

                // Add timestamp and initialize properties for each word
                const wordsToAdd = randomWords.map(word => ({
                    ...word,
                    dateAdded: new Date().toISOString(),
                    isFavorite: false,
                    isMastered: false,
                    id: generateUniqueId() // Add unique ID for each word
                }));

                // Add words to the main array
                words.push(...wordsToAdd);

                // Save to local storage
                saveToLocalStorage();

                // Re-render the words table
                renderWordsTable();

                // Show success notification
                showNotification(`Added ${wordsToAdd.length} new ${randomSet} words successfully!`);

                // Add animation to new words
                animateNewWords(wordsToAdd);

            } catch (error) {
                console.error('Error adding new words:', error);
                showNotification('Error adding new words. Please try again.','war_livl_2');
            } finally {
                // Restore button state
                setTimeout(() => {
                    button.innerHTML = originalContent;
                    button.disabled = false;
                }, 1000);
            }
        }

        // Local Storage Management  testestes 
        function saveToLocalStorage() {
            localStorage.setItem('vocabularyWords', JSON.stringify(words));
        }

        function loadFromLocalStorage() {
            const savedWords = localStorage.getItem('vocabularyWords');
            if (savedWords) {
                words = JSON.parse(savedWords);
                renderWordsTable();
            }
        }
        // Initialize the app
        document.addEventListener('DOMContentLoaded', function () {
            // Load word data from local storage
            loadFromLocalStorage();

            // Initialize added sets from local storage
            const savedSets = localStorage.getItem('addedWordSets');
            if (savedSets) {
                addedSets = new Set(JSON.parse(savedSets));
            }

            // Add event listeners for filters
            searchInput.addEventListener('input', filterWords);
            categoryFilter.addEventListener('change', filterWords);
            languageFilter.addEventListener('change', filterWords);
            sortFilter.addEventListener('change', filterWords);

            // Add auto-translate event listener
            // const wordInput = document.getElementById('word');
            // if (wordInput) {
            //     wordInput.addEventListener('blur', autoTranslate);
            // }
        });

        // Generate unique ID for each word
        function generateUniqueId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }

        // Animate new words in the table
        function animateNewWords(newWords) {
            const rows = document.querySelectorAll('#wordsTableBody tr');
            rows.forEach(row => {
                const wordId = row.dataset.wordId;
                if (newWords.some(word => word.id === wordId)) {
                    row.classList.add('animate__animated', 'animate__fadeIn');
                    setTimeout(() => {
                        row.classList.remove('animate__animated', 'animate__fadeIn');
                    }, 1000);
                }
            });
        }

    