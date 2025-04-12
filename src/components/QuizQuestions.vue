<template>
  <div class="max-w-md mx-auto p-5 min-h-screen">
    <!-- Quiz Intro Screen -->
    <div v-if="!quizStarted" class="flex flex-col items-center justify-center h-full">
      <h1 class="text-3xl font-bold mb-6">Science Quiz</h1>
      <p class="text-lg mb-8 text-center">Test your knowledge with interactive swipe and tap questions!</p>
      <button @click="startQuiz"
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg">
        Start Quiz
      </button>
    </div>

    <!-- Quiz Content -->
    <div v-else>
      <!-- Swipe Question -->
      <div v-if="currentQuestion.type === 'swipe'" class="flex flex-col items-center">
        <h2 class="text-xl font-bold mb-6 text-center">{{ currentQuestion.question }}</h2>

        <!-- Swipe Card -->
        <div
          class="w-4/5 h-48 bg-white rounded-lg shadow-md flex items-center justify-center text-lg mb-8 transition-all duration-300 touch-pan-y select-none"
          :class="{
            '-translate-x-24 opacity-70': swipeDirection === 'left',
            'translate-x-24 opacity-70': swipeDirection === 'right',
            'bg-green-100': feedback === 'Correct!',
            'bg-red-100': feedback === 'Try Again!'
          }" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
          {{ currentQuestion.content }}
        </div>

        <!-- Swipe Options -->
        <div class="flex justify-between w-full mb-6">
          <div class="w-[45%] p-3 border-2 rounded-lg text-center" :class="{
            'border-green-500 bg-green-50': swipeDirection === 'left',
            'border-gray-300': swipeDirection !== 'left'
          }">
            {{ currentQuestion.options[0] }}
          </div>
          <div class="w-[45%] p-3 border-2 rounded-lg text-center" :class="{
            'border-green-500 bg-green-50': swipeDirection === 'right',
            'border-gray-300': swipeDirection !== 'right'
          }">
            {{ currentQuestion.options[1] }}
          </div>
        </div>

        <!-- Feedback -->
        <div v-if="feedback" class="mb-6 font-bold text-lg" :class="{
          'text-green-600': feedback === 'Correct!',
          'text-red-600': feedback === 'Try Again!'
        }">
          {{ feedback }}
        </div>

        <button v-if="showNext" @click="nextQuestion"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
          Next Question
        </button>
      </div>

      <!-- Tap-to-Reveal Question -->
      <div v-else-if="currentQuestion.type === 'tap'" class="flex flex-col items-center">
        <h2 class="text-xl font-bold mb-6 text-center">{{ currentQuestion.question }}</h2>

        <div class="grid grid-cols-2 gap-4 w-full mb-8">
          <div v-for="(option, index) in currentQuestion.options" :key="index"
            class="h-32 bg-white rounded-lg shadow-md p-4 flex items-center justify-center text-center cursor-pointer transition-all duration-300"
            :class="{
              'bg-green-100 border-2 border-green-500': option.flipped && option.correct,
              'bg-red-100 border-2 border-red-500': option.flipped && !option.correct,
              'bg-gray-50 border-2 border-gray-300': !option.flipped
            }" @click="flipCard(option)">
            <div v-if="!option.flipped" class="font-medium">
              {{ option.label }}
            </div>
            <div v-else class="text-left" v-html="option.answer"></div>
          </div>
        </div>

        <button v-if="showNext" @click="nextQuestion"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
          Next Question
        </button>
      </div>

      <!-- Quiz Completion Screen -->
      <div v-else class="flex flex-col items-center justify-center h-64">
        <h2 class="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p class="text-lg mb-6">You answered {{ correctAnswers }} out of {{ questions.length }} questions correctly</p>
        <button @click="resetQuiz" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg">
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Quiz questions data
const questions = [
  // Swipe questions
  {
    id: 1,
    type: 'swipe',
    question: "Is this a physical or chemical change?",
    content: "Burning Paper",
    options: ["Physical Change", "Chemical Change"],
    correctAnswer: "right"
  },
  {
    id: 2,
    type: 'swipe',
    question: "Is this a physical or chemical change?",
    content: "Melting Ice",
    options: ["Physical Change", "Chemical Change"],
    correctAnswer: "left"
  },
  {
    id: 3,
    type: 'swipe',
    question: "Is this a physical or chemical change?",
    content: "Rusting Iron",
    options: ["Physical Change", "Chemical Change"],
    correctAnswer: "right"
  },

  // Tap-to-reveal questions
  {
    id: 4,
    type: 'tap',
    question: "Tap to Discover States of Matter!",
    options: [
      {
        label: "Steam",
        answer: '<p><span class="font-bold text-blue-500">Gas</span> - A gas expands freely in its container</p>',
        correct: true,
        flipped: false
      },
      {
        label: "Water",
        answer: '<p><span class="font-bold text-blue-500">Liquid</span> - Has fixed volume but no fixed shape</p>',
        correct: true,
        flipped: false
      },
      {
        label: "Ice",
        answer: '<p><span class="font-bold text-blue-500">Solid</span> - Has fixed shape and volume</p>',
        correct: true,
        flipped: false
      },
      {
        label: "Lightning",
        answer: '<p><span class="font-bold text-blue-500">Plasma</span> - An ionized gas with free electrons</p>',
        correct: false,
        flipped: false
      }
    ]
  },
  {
    id: 5,
    type: 'tap',
    question: "Tap to Identify Chemical Elements!",
    options: [
      {
        label: "O₂",
        answer: '<p><span class="font-bold text-blue-500">Oxygen</span> - Essential for respiration</p>',
        correct: true,
        flipped: false
      },
      {
        label: "H₂O",
        answer: '<p><span class="font-bold text-blue-500">Water</span> - Universal solvent</p>',
        correct: true,
        flipped: false
      },
      {
        label: "CO₂",
        answer: '<p><span class="font-bold text-blue-500">Carbon Dioxide</span> - Greenhouse gas</p>',
        correct: true,
        flipped: false
      },
      {
        label: "NaCl",
        answer: '<p><span class="font-bold text-blue-500">Salt</span> - Common table salt</p>',
        correct: false,
        flipped: false
      }
    ]
  }
];

// Shuffle array function
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Quiz state
const quizStarted = ref(false);
const shuffledQuestions = ref([]);
const currentQuestionIndex = ref(0);
const correctAnswers = ref(0);

// Swipe question state
const touchStartX = ref(0);
const touchEndX = ref(0);
const swipeDirection = ref(null);
const feedback = ref("");
const showNext = ref(false);

// Current question computed property
const currentQuestion = computed(() => {
  return shuffledQuestions.value[currentQuestionIndex.value];
});

// Start quiz function
const startQuiz = () => {
  quizStarted.value = true;
  shuffledQuestions.value = shuffleArray(questions);
  currentQuestionIndex.value = 0;
  correctAnswers.value = 0;
};

// Swipe handlers
const touchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
};

const touchMove = (e) => {
  touchEndX.value = e.touches[0].clientX;
  const diff = touchStartX.value - touchEndX.value;

  if (Math.abs(diff) > 10) {
    swipeDirection.value = diff > 0 ? 'left' : 'right';
  }
};

const touchEnd = () => {
  if (swipeDirection.value) {
    if (swipeDirection.value === currentQuestion.value.correctAnswer) {
      feedback.value = "Correct!";
      correctAnswers.value++;
      showNext.value = true;
    } else {
      feedback.value = "Try Again!";
    }

    if (swipeDirection.value !== currentQuestion.value.correctAnswer) {
      setTimeout(() => {
        swipeDirection.value = null;
        feedback.value = "";
      }, 1000);
    }
  }

  touchStartX.value = 0;
  touchEndX.value = 0;
};

// Tap question handler
const flipCard = (option) => {
  if (!option.flipped) {
    option.flipped = true;

    // Check if all correct cards are flipped
    const allCorrectFlipped = currentQuestion.value.options
      .filter(opt => opt.correct)
      .every(opt => opt.flipped);

    if (allCorrectFlipped) {
      correctAnswers.value++;
      showNext.value = true;
    }
  }
};

// Next question handler
const nextQuestion = () => {
  // Reset question state
  swipeDirection.value = null;
  feedback.value = "";
  showNext.value = false;

  if (currentQuestion.value.type === 'tap') {
    // Reset card flips for tap questions
    currentQuestion.value.options.forEach(opt => {
      opt.flipped = false;
    });
  }

  // Move to next question or end quiz
  if (currentQuestionIndex.value < shuffledQuestions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    currentQuestionIndex.value = -1; // Triggers completion screen
  }
};

// Reset quiz function
const resetQuiz = () => {
  quizStarted.value = false;
};
</script>