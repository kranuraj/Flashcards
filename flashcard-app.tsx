import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FlashCardApp = () => {
  // Extended content for different levels
  const levels = {
    1: {
      title: "Single Words",
      content: [
        // Animals
        "cat", "dog", "pig", "cow", "fox", "bat", "owl", "hen", "ant", "bee",
        // Nature
        "sun", "sky", "sea", "mud", "fog", "ice", "ray", "log", "dam", "web",
        // Objects
        "cup", "box", "bag", "hat", "pen", "toy", "fan", "bed", "map", "jar",
        // Actions
        "run", "hop", "sit", "jog", "eat", "nap", "dig", "fix", "mix", "tap",
        // Food
        "pie", "jam", "egg", "bun", "nut", "pea", "fig", "ham", "dip", "pop",
        // Colors
        "red", "tan", "sky", "ink", "ray", "fog", "ash", "jet", "dye", "wax",
        // Home
        "mat", "rug", "mop", "pan", "pot", "lid", "bin", "tap", "rag", "net",
        // Clothes
        "cap", "tie", "zip", "hem", "tag", "pin", "bow", "lap", "cot", "fit",
        // People
        "dad", "mom", "pal", "boy", "kid", "man", "tot", "sir", "lad", "fan",
        // Misc
        "set", "lot", "bit", "day", "way", "row", "end", "top", "fun", "joy"
      ]
    },
    2: {
      title: "Words with Meaning",
      content: [
        // Daily Activities
        "The cat naps.", "A dog runs.", "I can hop.", "She can run.", "We all eat.",
        "Dad can fix.", "Mom can mix.", "The sun shines.", "A pig digs.", "Birds fly high.",
        // Simple Actions
        "Let us play.", "Try to jump.", "Time to eat.", "Need to run.", "Want to read.",
        "Can you help?", "See the dog.", "Pet the cat.", "Feed the hen.", "Hold my hand.",
        // Nature Related
        "Sky is blue.", "Sun is hot.", "Rain is wet.", "Wind is cool.", "Snow is white.",
        "Tree is tall.", "Grass is green.", "Sea is big.", "Sand is soft.", "Mud is wet.",
        // Home Activities
        "I eat pie.", "You drink milk.", "We read books.", "They play games.", "She draws well.",
        "He runs fast.", "Dogs bark now.", "Cats sleep here.", "Fish swim far.", "Birds sing sweet.",
        // Learning
        "I can read.", "You can write.", "Add the sum.", "Count to ten.", "Draw a cat.",
        "Paint the sky.", "Sing the song.", "Dance with me.", "Jump so high.", "Run so fast.",
        // Social
        "Say hi now.", "Wave bye bye.", "Give a hug.", "Make a wish.", "Tell a tale.",
        "Share the toy.", "Help a friend.", "Join the fun.", "Take a turn.", "Make them smile.",
        // Observations
        "Dog is big.", "Cat is small.", "Cup is full.", "Box is empty.", "Day is warm.",
        "Night is dark.", "Food is hot.", "Ice is cold.", "Ball is round.", "Book is new.",
        // Questions
        "Can you see?", "Do you know?", "Why not try?", "How to do?", "What is that?",
        "Who did this?", "When to go?", "Where to look?", "May I come?", "Should we start?",
        // Emotions
        "I am happy.", "You look sad.", "We feel good.", "They are mad.", "She is shy.",
        "He is brave.", "Kids are fun.", "Mom is kind.", "Dad is cool.", "Friends are nice.",
        // Commands
        "Sit down now.", "Stand up tall.", "Come this way.", "Go that way.", "Look at me."
      ]
    },
    3: {
      title: "Sentences",
      content: [
        // Daily Routines
        "I wake up early today.", "Time to brush my teeth.", "Let us eat breakfast now.", 
        "We go to school by bus.", "The bell rings at nine.", "We play in the park.",
        "Mom makes good cookies.", "Dad reads me stories.", "I like to help at home.",
        "Time to go to sleep.",
        
        // Learning & School
        "I can read this book.", "We learn new things daily.", "Numbers are fun to count.",
        "Drawing makes me happy.", "My teacher is very nice.", "I made a new friend today.",
        "We sing songs in class.", "I love to solve puzzles.", "Writing is getting better.",
        "Science is lots of fun.",
        
        // Nature & Weather
        "The sun shines very bright.", "Rain makes the flowers grow.", "Birds fly in the sky.",
        "Trees give us fresh air.", "The wind blows the leaves.", "Snow falls very softly.",
        "Rainbow has many colors.", "Stars twinkle at night.", "Clouds look like cotton.",
        "The moon glows at night.",
        
        // Family & Friends
        "My family loves me lots.", "Friends play games with me.", "We share our toys nicely.",
        "Grandma tells good stories.", "Grandpa takes long walks.", "My sister helps me draw.",
        "Brother plays ball with me.", "We visit the park today.", "Family dinner is fun.",
        "Friends make me feel happy.",
        
        // Activities & Hobbies
        "I like to ride my bike.", "Swimming is very fun.", "Let us build with blocks.",
        "Dancing makes me happy.", "We can jump the rope.", "Playing sports is fun.",
        "I help water the plants.", "We make paper airplanes.", "Reading is an adventure.",
        "Drawing pictures is fun.",
        
        // Food & Meals
        "Breakfast gives us energy.", "Lunch time is at noon.", "Dinner with family rocks.",
        "Fruits are good for health.", "Milk makes bones stronger.", "Vegetables help us grow.",
        "We wash hands before food.", "Water keeps us healthy.", "Fresh food tastes better.",
        "Sharing food is caring.",
        
        // Places & Travel
        "The zoo has many animals.", "Parks are fun to visit.", "Libraries have many books.",
        "Beach waves are so cool.", "Mountains are very tall.", "Cities have tall buildings.",
        "Farms have many animals.", "Gardens have pretty flowers.", "Museums teach us things.",
        "Playground is lots of fun.",
        
        // Emotions & Feelings
        "Being kind makes me glad.", "Helping others feels good.", "Sharing makes us happy.",
        "Friends make me feel loved.", "Family hugs are the best.", "Smiling makes days better.",
        "Kind words make hearts warm.", "Good deeds bring joy.", "Love makes the world nice.",
        "Happy thoughts bring smiles.",
        
        // Safety & Health
        "Look both ways to cross.", "Always wear your seatbelt.", "Wash hands with soap well.",
        "Eat fruits every day.", "Sleep early at night.", "Exercise makes us strong.",
        "Drink water every day.", "Brush teeth twice daily.", "Stay safe while playing.",
        "Keep your body healthy.",
        
        // Imagination & Dreams
        "I can be anything.", "Dreams can come true.", "Magic happens in books.",
        "Stories take us places.", "We can reach the stars.", "Wishes sometimes come true.",
        "Imagination is magic.", "Adventure awaits us.", "Dreams help us grow big.",
        "Tomorrow brings new fun."
      ]
    }
  };

  const [currentLevel, setCurrentLevel] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isActive, setIsActive] = useState(true);
  const [progress, setProgress] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNext();
      setTimer(30);
    }
    return () => clearInterval(interval);
  }, [timer, isActive]);

  const handlePrevious = () => {
    const currentContent = levels[currentLevel].content;
    setCurrentIndex((prev) => (prev === 0 ? currentContent.length - 1 : prev - 1));
    setTimer(30);
    updateProgress();
  };

  const handleNext = () => {
    const currentContent = levels[currentLevel].content;
    setCurrentIndex((prev) => (prev === currentContent.length - 1 ? 0 : prev + 1));
    setTimer(30);
    updateProgress();
  };

  const updateProgress = () => {
    const totalCards = levels[currentLevel].content.length;
    setProgress(((currentIndex + 1) / totalCards) * 100);
  };

  const speakText = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(levels[currentLevel].content[currentIndex]);
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.toLowerCase().includes('child') || 
        voice.name.toLowerCase().includes('junior')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      utterance.pitch = 1.5;
      utterance.rate = 0.9;
      
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Levels</h2>
        {Object.entries(levels).map(([level, { title }]) => (
          <button
            key={level}
            onClick={() => {
              setCurrentLevel(Number(level));
              setCurrentIndex(0);
              setTimer(30);
              setProgress(0);
            }}
            className={`w-full text-left p-3 mb-2 rounded ${
              currentLevel === Number(level)
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Level {level}: {title}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Progress and Timer display */}
        <div className="w-full max-w-md mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress: {Math.round(progress)}%</span>
            <span>Timer: {timer}s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Card Counter */}
        <div className="text-sm mb-4">
          Card {currentIndex + 1} of {levels[currentLevel].content.length}
        </div>

        {/* Flash Card */}
        <Card className="w-96 h-64 bg-white shadow-lg flex flex-col items-center justify-center mb-8 p-6">
          <span className="text-4xl font-bold text-black text-center mb-4">
            {levels[currentLevel].content[currentIndex]}
          </span>
          <button
            onClick={speakText}
            className="mt-4 p-2 rounded-full bg-green-500 hover:bg-green-600 text-white"
            aria-label="Speak text"
          >
            <Volume2 size={24} />
          </button>
        </Card>

        {/* Navigation buttons */}
        <div className="flex gap-8 items-center">
          <button
            onClick={handlePrevious}
            className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            aria-label="Previous word"
          >
            <ArrowLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
            aria-label="Next word"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashCardApp;
