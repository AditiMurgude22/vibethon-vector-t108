function buildQuiz(topicTitle, points) {
  const first = points[0] || `${topicTitle} is an important concept`;
  const second = points[1] || `${topicTitle} has practical applications`;
  const third = points[2] || `${topicTitle} is studied in science and technology`;
  const fourth = points[3] || `${topicTitle} helps explain real-world systems`;
  const fifth = points[4] || `${topicTitle} is useful for problem-solving`;

  return [
    {
      question: `${topicTitle} is best described as:`,
      options: [first, "A random unrelated idea", "Only a historical event", "A type of hardware part"],
      answer: 0
    },
    {
      question: `Which statement about ${topicTitle} is correct?`,
      options: ["It has no practical use", second, "It is only a fiction concept", "It can never be learned"],
      answer: 1
    },
    {
      question: `A key feature of ${topicTitle} is:`,
      options: ["It removes the need for understanding", "It is only used in one subject", third, "It has no structure"],
      answer: 2
    },
    {
      question: `In simple learning contexts, ${topicTitle} helps to:`,
      options: ["Create confusion only", "Avoid real examples", "Connect ideas to applications", "Ignore observations"],
      answer: 2
    },
    {
      question: `Which of these aligns with ${topicTitle}?`,
      options: [fourth, "It is based on luck only", "It has no definitions", "It is impossible to explain"],
      answer: 0
    },
    {
      question: `A student should study ${topicTitle} because:`,
      options: ["It never appears in real life", "It supports understanding and analysis", "It replaces all subjects", "It has no key points"],
      answer: 1
    },
    {
      question: `Which learning outcome is most likely from ${topicTitle}?`,
      options: ["Better conceptual clarity", "No improvement", "Only memorizing names", "Avoiding logic"],
      answer: 0
    },
    {
      question: `Another important point about ${topicTitle} is:`,
      options: ["It can be connected to real-world examples", "It should always be ignored", "It has no relevance", "It blocks critical thinking"],
      answer: 0
    },
    {
      question: `Which statement is NOT accurate about ${topicTitle}?`,
      options: [fifth, "It has educational value", "It has no meaning at all", "It can be discussed with examples"],
      answer: 2
    },
    {
      question: `A good way to master ${topicTitle} is to:`,
      options: ["Read definition, key points, and examples", "Skip all explanations", "Avoid quiz practice", "Memorize without understanding"],
      answer: 0
    }
  ];
}

function makeTopic(category, title, definition, detailedExplanation, keyPoints, example) {
  const content = { title, definition, detailedExplanation, keyPoints, example };
  return {
    category,
    title,
    content,
    definition,
    detailedExplanation,
    keyPoints,
    example,
    quiz: buildQuiz(title, keyPoints)
  };
}

export const TOPIC_LIBRARY = {
  "artificial intelligence": makeTopic(
    "AIML",
    "Artificial Intelligence",
    "Artificial Intelligence is the field of creating systems that can perform tasks needing human-like thinking. It includes understanding language, patterns, and decisions.",
    "AI combines data, algorithms, and computing power to solve practical problems. Some AI systems follow predefined rules while others learn from examples. AI is used in assistants, recommendations, healthcare support, and automation. Businesses use AI to improve speed and reduce repetitive manual work. Modern AI systems also require responsible design to avoid bias. As AI grows, human oversight remains important for fairness and safety.",
    [
      "AI enables machines to perform intelligent tasks.",
      "AI includes machine learning, NLP, and computer vision.",
      "AI improves efficiency in many industries.",
      "Good data quality strongly affects AI results.",
      "Responsible AI focuses on fairness and safety."
    ],
    "Voice assistants use AI to understand spoken commands and respond with useful answers."
  ),
  "machine learning": makeTopic(
    "AIML",
    "Machine Learning",
    "Machine Learning is a part of AI where systems learn from data instead of fixed instructions. The model improves based on examples and feedback.",
    "Machine Learning starts with data collection and preprocessing. A model is trained to detect patterns and make predictions. Supervised learning uses labeled examples, while unsupervised learning discovers hidden structures. Reinforcement learning improves decisions through rewards. ML is common in recommendations, fraud detection, and forecasting. Model performance is measured using evaluation metrics before real use.",
    [
      "ML learns patterns from data automatically.",
      "Supervised learning uses labeled datasets.",
      "Unsupervised learning finds hidden clusters and structures.",
      "Reinforcement learning improves through reward signals.",
      "Evaluation metrics are needed to compare model quality."
    ],
    "A music app recommending songs based on listening history is an ML application."
  ),
  "deep learning": makeTopic(
    "AIML",
    "Deep Learning",
    "Deep Learning is a specialized area of machine learning that uses multi-layer neural networks. It is useful for large and complex data tasks.",
    "Deep learning models have many hidden layers that learn features step by step. They are effective in image recognition, speech processing, and language tasks. Training deep networks usually needs large datasets and strong compute resources. These models can outperform traditional methods in complex problems. However, they may also be harder to interpret. Proper tuning and validation are essential for reliable performance.",
    [
      "Deep learning uses multi-layer neural networks.",
      "It works well for images, audio, and text tasks.",
      "Large datasets improve deep learning performance.",
      "Training can be computationally expensive.",
      "Model tuning is important for accuracy."
    ],
    "Face recognition in smartphones is often powered by deep learning."
  ),
  "neural networks": makeTopic(
    "AIML",
    "Neural Networks",
    "Neural Networks are computing models inspired by the human brain structure. They process inputs through connected layers of artificial neurons.",
    "A neural network includes input, hidden, and output layers. Each neuron applies weights and activation functions to transform data. During training, the network updates weights to reduce prediction error. Different network designs are used for different tasks, such as images or sequences. Neural networks are a core building block of deep learning. Their strength is pattern recognition in complex data.",
    [
      "Neural networks are made of layered artificial neurons.",
      "Weights control how signals pass through layers.",
      "Training updates weights to reduce errors.",
      "Activation functions add non-linearity.",
      "They are widely used in modern AI systems."
    ],
    "Handwritten digit recognition models often use neural networks."
  ),
  "natural language processing": makeTopic(
    "AIML",
    "Natural Language Processing",
    "Natural Language Processing (NLP) focuses on helping computers understand and generate human language. It works with text and speech data.",
    "NLP includes tasks like sentiment analysis, translation, and question answering. Systems learn grammar patterns, meanings, and contextual relations. Modern NLP models use embeddings and transformer architectures for better understanding. NLP is used in chatbots, assistants, and document analysis tools. Language ambiguity makes NLP challenging. Good datasets and evaluation are important for usable results.",
    [
      "NLP helps machines understand human language.",
      "Common tasks include translation and sentiment analysis.",
      "Context is important in language understanding.",
      "NLP powers chatbots and virtual assistants.",
      "Language ambiguity makes model design challenging."
    ],
    "Customer support chatbots use NLP to respond to user questions."
  ),
  "computer vision": makeTopic(
    "AIML",
    "Computer Vision",
    "Computer Vision helps systems interpret images and videos. It enables machines to detect objects, patterns, and scenes.",
    "Computer vision models process pixels and extract meaningful features. They are used in object detection, face recognition, and medical imaging. Convolutional neural networks are common for many image tasks. Video-based applications combine image understanding with temporal context. Performance depends on diverse and clean visual data. Vision systems are used in safety, automation, and analytics.",
    [
      "Computer vision analyzes image and video data.",
      "Object detection is a major computer vision task.",
      "CNNs are commonly used in vision models.",
      "Data diversity improves visual model robustness.",
      "Vision is widely used in automation and healthcare."
    ],
    "Self-driving systems use computer vision to identify lanes and obstacles."
  ),
  "supervised learning": makeTopic(
    "AIML",
    "Supervised Learning",
    "Supervised learning is a machine learning approach that trains models using labeled examples. Each input has a known correct output.",
    "In supervised learning, the model learns mapping from inputs to outputs. Classification and regression are common supervised tasks. Data is usually split into training and testing sets. Model performance is measured to avoid overfitting. Label quality strongly influences final predictions. This method is widely used in recommendation, diagnosis, and detection systems.",
    [
      "Supervised learning uses labeled data.",
      "Classification and regression are key task types.",
      "Training and testing sets are both necessary.",
      "Label quality impacts prediction quality.",
      "It is common in practical prediction systems."
    ],
    "Email category prediction based on labeled examples uses supervised learning."
  ),
  "unsupervised learning": makeTopic(
    "AIML",
    "Unsupervised Learning",
    "Unsupervised learning finds patterns in data without labeled outputs. The model explores structure directly from raw input.",
    "This method is useful when labeled data is unavailable or expensive. Clustering groups similar items together. Dimensionality reduction simplifies high-dimensional data for analysis. Unsupervised methods are often used for exploration before predictive modeling. Results need careful interpretation by domain experts. It is widely used in segmentation and anomaly discovery.",
    [
      "Unsupervised learning does not require labels.",
      "Clustering is a common unsupervised technique.",
      "Dimensionality reduction helps simplify data.",
      "It supports exploratory data analysis.",
      "Interpretation of clusters needs domain context."
    ],
    "Customer segmentation by buying behavior is a common unsupervised learning task."
  ),
  "reinforcement learning": makeTopic(
    "AIML",
    "Reinforcement Learning",
    "Reinforcement learning trains an agent to take actions by maximizing long-term rewards. The agent learns from trial and error.",
    "The agent interacts with an environment and receives feedback signals. Positive rewards reinforce good actions, while penalties discourage poor choices. RL problems involve states, actions, and policies. It is used in robotics, game AI, and control systems. Balancing exploration and exploitation is a key challenge. Training can require many simulations for stable behavior.",
    [
      "Reinforcement learning uses reward-driven learning.",
      "The agent learns by interacting with an environment.",
      "Policies define how the agent chooses actions.",
      "Exploration vs exploitation is a core trade-off.",
      "RL is common in games and robotics."
    ],
    "Game-playing agents that improve after many matches use reinforcement learning."
  ),
  "data science": makeTopic(
    "AIML",
    "Data Science",
    "Data Science combines statistics, programming, and domain knowledge to extract useful insights from data. It supports better decisions through analysis.",
    "Data science workflow includes collection, cleaning, analysis, and communication. Analysts use visualization to reveal trends and anomalies. Predictive models may be built when forecasting is needed. Domain context is necessary for interpreting results correctly. Good data governance ensures quality and privacy. Data science is used in healthcare, finance, retail, and research.",
    [
      "Data science turns raw data into actionable insights.",
      "Cleaning and preprocessing are critical early steps.",
      "Visualization helps communicate findings clearly.",
      "Domain knowledge improves interpretation quality.",
      "Data science supports data-driven decisions."
    ],
    "A retail team uses data science to forecast demand and reduce stock-outs."
  ),
  photosynthesis: makeTopic(
    "Biology",
    "Photosynthesis",
    "Photosynthesis is the process by which plants make food using sunlight, carbon dioxide, and water. It also releases oxygen as a by-product.",
    "Photosynthesis mainly occurs in chloroplasts inside leaf cells. Chlorophyll absorbs light energy and starts chemical reactions. Plants convert this energy into glucose for growth and survival. Water comes from roots and carbon dioxide enters through stomata. Oxygen is released into the air during the process. This process is vital for food chains and atmospheric balance.",
    [
      "Photosynthesis happens mainly in leaf chloroplasts.",
      "Chlorophyll captures light energy.",
      "Plants produce glucose as food.",
      "Oxygen is released as a by-product.",
      "It supports ecosystems and life on Earth."
    ],
    "Healthy plants in sunlight grow faster because they perform photosynthesis effectively."
  ),
  "human digestive system": makeTopic(
    "Biology",
    "Human Digestive System",
    "The human digestive system breaks down food into nutrients that the body can absorb and use. It includes organs like the stomach and intestines.",
    "Digestion starts in the mouth with chewing and saliva. Food then moves through the esophagus to the stomach, where acids help break it down. In the small intestine, nutrients are absorbed into the bloodstream. The large intestine absorbs water and forms waste. Digestive enzymes and gut microbes support this process. Proper digestion is essential for energy, growth, and health.",
    [
      "Digestion begins in the mouth.",
      "Stomach acids and enzymes break down food.",
      "Small intestine absorbs most nutrients.",
      "Large intestine absorbs water.",
      "Efficient digestion supports body energy."
    ],
    "Eating fiber-rich food helps smooth movement through the digestive system."
  ),
  "human heart": makeTopic(
    "Biology",
    "Human Heart",
    "The human heart is a muscular organ that pumps blood throughout the body. It supplies oxygen and nutrients to tissues.",
    "The heart has four chambers that coordinate blood flow. The right side sends blood to the lungs for oxygenation. The left side pumps oxygen-rich blood to the body. Heart valves ensure one-way movement of blood. Electrical impulses regulate heartbeat rhythm. A healthy heart supports all organs by maintaining circulation.",
    [
      "The heart has four chambers.",
      "It circulates blood across the body.",
      "Valves prevent backflow of blood.",
      "Heartbeat is controlled by electrical signals.",
      "Heart health is central to overall wellness."
    ],
    "Regular exercise improves heart efficiency and circulation."
  ),
  "respiration in plants": makeTopic(
    "Biology",
    "Respiration in Plants",
    "Respiration in plants is the process of releasing energy from glucose. It happens continuously, both day and night.",
    "Plant cells use oxygen to break down glucose and release usable energy. This energy supports growth, transport, and repair. Respiration occurs in mitochondria. During this process, carbon dioxide and water are produced. It differs from photosynthesis because respiration releases energy instead of storing it. Both processes are essential for plant survival.",
    [
      "Respiration releases energy from glucose.",
      "It occurs throughout day and night.",
      "Mitochondria are the main site of respiration.",
      "Carbon dioxide and water are produced.",
      "Respiration supports plant growth and repair."
    ],
    "Seeds germinate using respiration energy before leaves fully develop."
  ),
  "cell structure": makeTopic(
    "Biology",
    "Cell Structure",
    "Cells are the basic structural and functional units of life. Different cell parts perform specific roles needed for survival.",
    "A typical cell includes membrane, cytoplasm, and nucleus. The membrane controls what enters or leaves the cell. The nucleus stores genetic material and controls activities. Organelles like mitochondria and ribosomes support energy and protein production. Plant cells have chloroplasts and cell walls, unlike most animal cells. Understanding cell structure helps explain growth, repair, and inheritance.",
    [
      "Cells are the basic units of living organisms.",
      "The nucleus controls major cell activities.",
      "Membrane regulates transport across the cell.",
      "Organelles perform specialized functions.",
      "Plant and animal cells share core structures but differ in some parts."
    ],
    "Muscle growth after exercise depends on cell repair and protein synthesis."
  ),
  "food chain": makeTopic(
    "Biology",
    "Food Chain",
    "A food chain shows how energy moves from one organism to another in an ecosystem. It usually starts with producers and ends with top consumers.",
    "Plants are producers because they make food through photosynthesis. Herbivores eat producers, and carnivores eat herbivores. Decomposers break down dead matter and return nutrients to the environment. Food chains are connected into food webs in real ecosystems. If one link is disturbed, other organisms are affected. Balanced food chains are essential for ecological stability.",
    [
      "Food chains represent energy transfer in ecosystems.",
      "Producers form the first level.",
      "Consumers depend on lower trophic levels.",
      "Decomposers recycle nutrients.",
      "Disruption of one level affects others."
    ],
    "If insects decline sharply, birds that feed on them may also decline."
  ),
  ecosystem: makeTopic(
    "Biology",
    "Ecosystem",
    "An ecosystem is a community of living organisms interacting with non-living components like air, water, and soil. These interactions maintain environmental balance.",
    "Ecosystems can be forests, deserts, rivers, or urban spaces. Biotic factors include plants, animals, and microbes. Abiotic factors include sunlight, temperature, and water. Energy flows through food webs while nutrients cycle repeatedly. Human activity can disturb ecosystem balance through pollution or habitat loss. Conservation helps protect biodiversity and long-term sustainability.",
    [
      "Ecosystems include biotic and abiotic components.",
      "Energy flows and nutrient cycles sustain life.",
      "Biodiversity improves ecosystem resilience.",
      "Human activity can harm ecological balance.",
      "Conservation supports ecosystem health."
    ],
    "A pond ecosystem includes fish, algae, insects, water, and sunlight interacting together."
  ),
  gravity: makeTopic(
    "Science",
    "Gravity",
    "Gravity is a force that pulls objects toward each other. On Earth, gravity pulls objects toward the ground.",
    "Gravity affects everything with mass. It keeps planets in orbit around the sun and the moon around Earth. The stronger the mass, the stronger the gravitational pull. Gravity gives objects weight and influences motion. Without gravity, atmosphere and oceans would not stay in place. It is one of the fundamental forces in physics.",
    [
      "Gravity is an attractive force between masses.",
      "Earth's gravity pulls objects downward.",
      "Gravity keeps planets and moons in orbit.",
      "Mass influences gravitational strength.",
      "Gravity affects weight and motion."
    ],
    "When you drop a ball, gravity causes it to fall to the ground."
  ),
  "newton's laws of motion": makeTopic(
    "Science",
    "Newton's Laws of Motion",
    "Newton's laws describe how objects move when forces act on them. They are foundational principles in classical mechanics.",
    "The first law explains inertia and unchanged motion without net force. The second law relates force, mass, and acceleration through F = m*a. The third law states every action has an equal and opposite reaction. These laws explain motion in daily life and engineering systems. They help analyze vehicles, sports, and machine design. Understanding these laws builds strong physical reasoning.",
    [
      "First law describes inertia.",
      "Second law links force to acceleration.",
      "Third law explains action-reaction pairs.",
      "These laws are used in mechanics and engineering.",
      "They explain everyday motion behavior."
    ],
    "Seat belts protect passengers because of inertia during sudden braking."
  ),
  "states of matter": makeTopic(
    "Science",
    "States of Matter",
    "States of matter describe physical forms such as solid, liquid, and gas. Matter changes state based on temperature and pressure.",
    "Solids have fixed shape and volume due to tightly packed particles. Liquids have fixed volume but flow to take container shape. Gases have neither fixed shape nor fixed volume. Heating and cooling can cause melting, freezing, evaporation, or condensation. Particle movement changes across states. This concept is fundamental in chemistry and daily observations.",
    [
      "Matter exists mainly as solid, liquid, or gas.",
      "Particle arrangement determines physical properties.",
      "Temperature changes can shift states.",
      "Phase changes include melting and condensation.",
      "State behavior explains many natural processes."
    ],
    "Ice melting into water and then turning into steam shows state changes."
  ),
  "water cycle": makeTopic(
    "Science",
    "Water Cycle",
    "The water cycle is the continuous movement of water through evaporation, condensation, precipitation, and collection. It maintains water balance on Earth.",
    "Sunlight causes water from oceans and lakes to evaporate. Water vapor cools and forms clouds by condensation. When droplets become heavy, precipitation occurs as rain or snow. Water then collects in rivers, lakes, and groundwater. Plants also release water vapor through transpiration. This cycle supports weather systems, agriculture, and life.",
    [
      "Evaporation moves water from surface to atmosphere.",
      "Condensation forms clouds.",
      "Precipitation returns water to Earth.",
      "Collection stores water in natural reservoirs.",
      "Transpiration contributes water vapor from plants."
    ],
    "Rainfall after cloud buildup is part of the water cycle."
  ),
  "solar system": makeTopic(
    "Science",
    "Solar System",
    "The solar system includes the sun and all objects orbiting it, such as planets, moons, asteroids, and comets. Gravity keeps this system organized.",
    "The sun is the central star and main energy source. Planets move in elliptical orbits around it. Inner planets are rocky, while outer planets are gas or ice giants. Moons orbit planets, and smaller bodies travel through space. Distances in the solar system are very large and measured in astronomical units. Studying the solar system helps understand Earth's place in space.",
    [
      "The sun is the center of the solar system.",
      "Planets orbit the sun due to gravity.",
      "Inner and outer planets differ in composition.",
      "Moons, asteroids, and comets are also part of the system.",
      "Solar system study supports astronomy and space science."
    ],
    "Earth's yearly revolution around the sun defines one year."
  )
};

const ALIASES = {
  ai: "artificial intelligence",
  "artificial intelligence": "artificial intelligence",
  ml: "machine learning",
  "machine learning": "machine learning",
  dl: "deep learning",
  nlp: "natural language processing",
  cv: "computer vision",
  "newton laws": "newton's laws of motion",
  "newton law": "newton's laws of motion"
};

export function normalizeTopicInput(inputValue) {
  return (inputValue || "").trim().toLowerCase();
}

function ensureMinimumQuizQuestions(topic) {
  const questions = Array.isArray(topic.quiz) ? [...topic.quiz] : [];
  const title = topic.title || "this topic";

  while (questions.length < 10) {
    const number = questions.length + 1;
    questions.push({
      question: `Quick check ${number}: Which option best supports learning ${title}?`,
      options: [
        "Study definition, key points, and examples",
        "Skip all concepts",
        "Avoid practice questions",
        "Memorize without understanding"
      ],
      answer: 0
    });
  }

  return { ...topic, quiz: questions };
}

export function resolveTopic(inputValue) {
  const normalized = normalizeTopicInput(inputValue);
  const aliasKey = ALIASES[normalized] || normalized;
  if (TOPIC_LIBRARY[aliasKey]) {
    return { key: aliasKey, topic: ensureMinimumQuizQuestions(TOPIC_LIBRARY[aliasKey]), fallback: false };
  }
  return { key: normalized, topic: ensureMinimumQuizQuestions(createFallbackTopic(inputValue)), fallback: true };
}

export function getTopicsByCategory(category = "All") {
  const allEntries = Object.entries(TOPIC_LIBRARY);
  if (category === "All") return allEntries;
  return allEntries.filter(([, topic]) => topic.category === category);
}

export function getUniqueTopicsByCategory(category = "All") {
  const seen = new Set();
  return getTopicsByCategory(category).filter(([, topic]) => {
    if (seen.has(topic.title)) return false;
    seen.add(topic.title);
    return true;
  });
}

function createFallbackTopic(rawInput) {
  const label = (rawInput || "Selected Topic").trim() || "Selected Topic";
  const title = label
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  const content = {
    title,
    definition:
      `${title} is an important learning concept. It can be understood by focusing on core meaning, practical use, and key principles.`,
    detailedExplanation:
      `${title} can be explored step by step with simple examples. Start by understanding what it means and where it is used. Then connect it to daily life or real systems around you. Breaking the topic into smaller points helps with memory and clarity. Practice questions can strengthen understanding. Consistent revision helps build long-term confidence.`,
    keyPoints: [
      `${title} has a clear definition and context.`,
      `${title} can be understood through examples.`,
      `${title} includes important core principles.`,
      `${title} becomes easier with practice and revision.`,
      `${title} can connect with real-world situations.`
    ],
    example: `A student can learn ${title} by reading basics, observing examples, and solving short quizzes.`
  };

  return {
    category: "General",
    title,
    content,
    definition: content.definition,
    detailedExplanation: content.detailedExplanation,
    keyPoints: content.keyPoints,
    example: content.example,
    quiz: [
      {
        question: `What is the best first step to learn ${title}?`,
        options: ["Understand its definition", "Skip basics", "Ignore examples", "Avoid practice"],
        answer: 0
      },
      {
        question: `Why are examples useful for ${title}?`,
        options: ["They create confusion only", "They connect ideas to real use", "They replace understanding", "They are never needed"],
        answer: 1
      },
      {
        question: `Which habit improves understanding of ${title}?`,
        options: ["Regular revision", "No notes", "No questions", "Only guessing"],
        answer: 0
      },
      {
        question: `What helps remember ${title} better?`,
        options: ["Breaking into key points", "Reading once only", "Skipping details", "Avoiding summaries"],
        answer: 0
      },
      {
        question: `A good learning approach for ${title} is:`,
        options: ["Concept + Example + Practice", "Only memorization", "No structure", "No feedback"],
        answer: 0
      }
    ]
  };
}
