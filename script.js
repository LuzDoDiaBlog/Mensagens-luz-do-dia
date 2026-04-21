// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Luz do Dia Blog loaded successfully!');
  loadMessages();
});

// Load messages from API or local storage
async function loadMessages() {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('VITE_GEMINI_API_KEY is not configured');
      return;
    }
    
    // Fetch daily message using Gemini API
    const message = await fetchDailyMessage(apiKey);
    displayMessage(message);
  } catch (error) {
    console.error('Error loading messages:', error);
  }
}

// Fetch message from Gemini API
async function fetchDailyMessage(apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{
      parts: [{
        text: 'Gere uma mensagem inspiradora e positiva para o dia em português.'
      }]
    }]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error('API request failed');
    
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return 'Tenha um dia maravilhoso e cheio de luz!';
  }
}

// Display message on page
function displayMessage(message) {
  const article = document.querySelector('article');
  if (article) {
    article.querySelector('p').textContent = message;
  }
}