// Talk data
const allTalks = [
    {
        title: "The Future of Quantum Computing",
        speakers: ["Dr. Evelyn Reed"],
        category: ["Quantum Physics", "Future Tech"],
        duration: 60, // minutes
        description: "An in-depth look at the potential and challenges of quantum computing."
    },
    {
        title: "Deep Learning for Natural Language Processing",
        speakers: ["Prof. Alan Turing", "Dr. Grace Hopper"],
        category: ["AI", "Machine Learning", "NLP"],
        duration: 60,
        description: "Exploring the latest advancements in NLP using deep learning architectures."
    },
    {
        title: "Securing Cloud Native Applications",
        speakers: ["Maria Rodriguez"],
        category: ["Cybersecurity", "Cloud"],
        duration: 60,
        description: "Best practices for securing applications deployed in cloud-native environments."
    },
    { // Placeholder talks to complete the 6-talk schedule
        title: "Advanced JavaScript Patterns",
        speakers: ["Jane Developer"],
        category: ["Web Development", "JavaScript"],
        duration: 60,
        description: "A dive into modern JavaScript design patterns."
    },
    {
        title: "Microservices Architecture Design",
        speakers: ["Robert Builder"],
        category: ["Software Architecture", "Cloud"],
        duration: 60,
        description: "Designing scalable and resilient microservices."
    },
    {
        title: "DevOps with Kubernetes",
        speakers: ["Kubernetes King"],
        category: ["DevOps", "Containers"],
        duration: 60,
        description: "Streamlining deployment and operations with Kubernetes."
    }
];

const eventStartTime = new Date();
eventStartTime.setHours(10, 0, 0); // Event starts at 10:00 AM

const transitionTime = 10; // 10 minutes between talks
const lunchDuration = 60; // 1 hour lunch

function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function generateSchedule(talksToDisplay) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = ''; // Clear previous schedule

    let currentTime = new Date(eventStartTime);
    let talkCounter = 0;

    talksToDisplay.forEach((talk) => {
        talkCounter++;
        const talkStartTime = new Date(currentTime);
        const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

        const talkCard = document.createElement('div');
        talkCard.className = 'talk-card';
        talkCard.innerHTML = `
            <h2>${talk.title}</h2>
            <p><strong>Time:</strong> ${formatTime(talkStartTime)} - ${formatTime(talkEndTime)}</p>
            <p class="speakers"><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
            <p class="category"><strong>Category:</strong> ${talk.category.join(', ')}</p>
            <p class="description">${talk.description}</p>
        `;
        scheduleContainer.appendChild(talkCard);

        currentTime = new Date(talkEndTime);

        // Add transition time or lunch break
        if (talkCounter === 3) { // Lunch after the 3rd talk
            const lunchStart = new Date(currentTime);
            const lunchEnd = new Date(currentTime.getTime() + lunchDuration * 60 * 1000);
            const breakCard = document.createElement('div');
            breakCard.className = 'break-card';
            breakCard.innerHTML = `
                <h2>Lunch Break</h2>
                <p><strong>Time:</strong> ${formatTime(lunchStart)} - ${formatTime(lunchEnd)}</p>
                <p>Enjoy your meal!</p>
            `;
            scheduleContainer.appendChild(breakCard);
            currentTime = new Date(lunchEnd);
        } else if (talkCounter < allTalks.length) { // Add transition if not the very last talk
            currentTime = new Date(currentTime.getTime() + transitionTime * 60 * 1000);
        }
    });
}

function filterTalks() {
    const searchTerm = document.getElementById('categorySearch').value.toLowerCase();
    const filteredTalks = allTalks.filter(talk =>
        talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
    );
    generateSchedule(filteredTalks);
}

// Initial render and event listeners
document.addEventListener('DOMContentLoaded', () => {
    generateSchedule(allTalks);

    document.getElementById('searchButton').addEventListener('click', filterTalks);
    document.getElementById('categorySearch').addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            filterTalks();
        } else if (document.getElementById('categorySearch').value === "") {
            // If search box is cleared, show all talks again
            generateSchedule(allTalks);
        }
    });
});
