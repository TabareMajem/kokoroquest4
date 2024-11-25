import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  Star, 
  Heart,
  Trophy,
  Sparkles 
} from 'lucide-react';
import QuizMascot from './QuizMascot';
import CelebrationScreen from './CelebrationScreen';
import type { Question, Answer } from './types';

const questions: Question[] = [
  {
    id: 1,
    text: "How do you feel when you help a friend?",
    answers: [
      { id: 'a', text: "Happy because I made someone smile", isCorrect: true },
      { id: 'b', text: "Nothing special", isCorrect: false },
      { id: 'c', text: "Proud of being helpful", isCorrect: true },
      { id: 'd', text: "I don't like helping others", isCorrect: false }
    ],
    explanation: "Helping others can make us feel happy and proud! These positive feelings help build stronger friendships."
  },
  {
    id: 2,
    text: "What could you do when you see someone feeling sad?",
    answers: [
      { id: 'a', text: "Walk away and ignore them", isCorrect: false },
      { id: 'b', text: "Ask if they want to talk", isCorrect: true },
      { id: 'c', text: "Tell them to cheer up", isCorrect: false },
      { id: 'd', text: "Offer to help or listen", isCorrect: true }
    ],
    explanation: "Being there for others and showing you care can help them feel better and strengthen your friendship."
  }
  // Add more questions as needed
];

type Props = {
  onBack: () => void;
  onComplete: (score: number) => void;
};

export default function QuizScreen({ onBack, onComplete }: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerSelect = (answerId: string) => {
    if (selectedAnswer || showFeedback) return;
    
    setSelectedAnswer(answerId);
    const answer = currentQuestion.answers.find(a => a.id === answerId);
    
    if (answer?.isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setShowCelebration(true);
      onComplete(score);
      return;
    }

    setSelectedAnswer(null);
    setShowFeedback(false);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  if (showCelebration) {
    return (
      <CelebrationScreen
        score={score}
        totalQuestions={questions.length}
        onBack={onBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-purple-100 z-10">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button
              onClick={onBack}
              className="p-2 hover:bg-purple-50 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-purple-600" />
            </button>
            <div className="ml-4">
              <h1 className="text-lg font-semibold text-purple-900">
                Emotions Quiz
              </h1>
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <Star className="w-4 h-4" />
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-purple-100">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Question */}
        <div className="mb-8">
          <motion.h2
            key={currentQuestion.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold text-gray-800 mb-4"
          >
            {currentQuestion.text}
          </motion.h2>
        </div>

        {/* Mascot */}
        <div className="flex justify-center mb-8">
          <QuizMascot
            state={
              !selectedAnswer 
                ? 'thinking' 
                : currentQuestion.answers.find(a => a.id === selectedAnswer)?.isCorrect
                  ? 'happy'
                  : 'sad'
            }
          />
        </div>

        {/* Answers */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          <AnimatePresence mode="wait">
            {currentQuestion.answers.map((answer) => (
              <motion.button
                key={answer.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleAnswerSelect(answer.id)}
                disabled={!!selectedAnswer}
                className={`p-4 rounded-xl text-left transition-all transform hover:scale-[1.02]
                  ${selectedAnswer === answer.id
                    ? answer.isCorrect
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-red-100 border-2 border-red-500'
                    : selectedAnswer && answer.isCorrect
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-white border-2 border-purple-100 hover:border-purple-300'
                  }
                  ${!!selectedAnswer && 'cursor-default'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${selectedAnswer === answer.id
                      ? answer.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : selectedAnswer && answer.isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-purple-100 text-purple-500'
                    }`}
                  >
                    {answer.id.toUpperCase()}
                  </div>
                  <span className="flex-1 text-gray-700">{answer.text}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="bg-purple-50 rounded-xl p-6 mb-8"
            >
              <div className="flex items-start gap-4">
                {currentQuestion.answers.find(a => a.id === selectedAnswer)?.isCorrect ? (
                  <div className="p-2 bg-green-100 rounded-full">
                    <Heart className="w-6 h-6 text-green-500" />
                  </div>
                ) : (
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Sparkles className="w-6 h-6 text-purple-500" />
                  </div>
                )}
                <p className="text-gray-700">{currentQuestion.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {showFeedback && (
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            onClick={handleNext}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-pink-500 
              text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
              transform hover:scale-[1.02] transition-all
              flex items-center justify-center gap-2"
          >
            {currentQuestionIndex === questions.length - 1 ? (
              <>
                <Trophy className="w-5 h-5" />
                Complete Quiz
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Next Question
              </>
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
}