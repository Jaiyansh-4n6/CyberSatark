"use client";

import { useState, useEffect } from "react";
import { quizzes } from "@/data/quizzes";
import Navbar from "@/components/Navbar";
import CyberBackground from "@/components/cyberbackground";
import { motion } from "framer-motion";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { updateUserQuizScore } from "@/lib/db";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

type Quiz = {
  id: number;
  title: string;
  questions: Question[];
};

function getRandomQuestions(
  questions: Question[],
  count: number
): Question[] {
  const shuffled = [...questions].sort(
    () => Math.random() - 0.5
  );

  return shuffled.slice(0, count);
}

export default function QuizPage() {
  const [quizIndex, setQuizIndex] =
    useState<number | null>(null);

  const [questionIndex, setQuestionIndex] =
    useState(0);

  const [score, setScore] = useState(0);

  const [finished, setFinished] =
    useState(false);

  const [selectedQuestions, setSelectedQuestions] =
    useState<Question[]>([]);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  // QUIZ SELECTION PAGE
  if (quizIndex === null) {
    return (
      <>
        <Navbar />
        <CyberBackground />

        <main className="min-h-screen px-6 py-28 text-white">
          <div className="max-w-6xl mx-auto">

            {/* HERO */}
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-green-400">
                <motion.span
                  animate={{
                    textShadow: [
                      "0 0 6px rgba(34,197,94,0.4)",
                      "0 0 18px rgba(34,197,94,1)",
                      "0 0 6px rgba(34,197,94,0.4)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                  }}
                >
                  Cyber Awareness Quiz
                </motion.span>
              </h1>

              <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
                Test your cybersecurity
                knowledge through interactive
                phishing awareness and cyber
                safety quizzes.
              </p>
            </motion.div>

            {/* QUIZ GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

              {quizzes
                .slice(0, 9)
                .map((quiz, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.03,
                      y: -4,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    onClick={() => {
                      setQuizIndex(index);

                      setSelectedQuestions(
                        getRandomQuestions(
                          quizzes[index]
                            .questions,
                          10
                        )
                      );
                    }}
                    className="
                      backdrop-blur-[40px]
                      bg-white/[0.03]
                      border
                      border-white/12
                      rounded-3xl
                      overflow-hidden
                      shadow-[0_25px_50px_rgba(0,0,0,0.65)]
                      hover:shadow-green-500/5
                      cursor-pointer
                      transition-all
                      duration-300
                      p-8
                      hover:border-green-400/30
                    "
                  >

                    {/* TOP BAR */}
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-500/70"></div>

                      <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>

                      <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                    </div>

                    <h2 className="text-2xl font-semibold text-green-300">
                      {quiz.title}
                    </h2>

                    <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                      10 Questions • Cyber
                      Awareness Test
                    </p>

                    <div className="mt-8 flex items-center gap-3 text-xs text-gray-500 font-mono">
                      <span className="text-green-400">
                        ●
                      </span>
                      Interactive Simulation
                    </div>
                  </motion.div>
                ))}
            </div>

            {/* LAST QUIZ */}
            <div className="flex justify-center mt-10">

              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => {
                  setQuizIndex(9);

                  setSelectedQuestions(
                    getRandomQuestions(
                      quizzes[9].questions,
                      10
                    )
                  );
                }}
                className="
                  backdrop-blur-[40px]
                  bg-white/[0.03]
                  border
                  border-white/12
                  rounded-3xl
                  overflow-hidden
                  shadow-[0_25px_50px_rgba(0,0,0,0.65)]
                  hover:shadow-green-500/5
                  cursor-pointer
                  transition-all
                  duration-300
                  p-8
                  hover:border-green-400/30
                  max-w-md
                  w-full
                "
              >

                {/* TOP BAR */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500/70"></div>

                  <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>

                  <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                </div>

                <h2 className="text-2xl font-semibold text-green-300">
                  {quizzes[9].title}
                </h2>

                <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                  Advanced Level • 10 Questions
                </p>

                <div className="mt-8 flex items-center gap-3 text-xs text-gray-500 font-mono">
                  <span className="text-green-400">
                    ●
                  </span>
                  Advanced Threat Analysis
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const quiz = quizzes[quizIndex];

  const question =
    selectedQuestions[questionIndex];

  async function handleAnswer(index: number) {
    const isCorrect = index === question.answer;
    const finalScore = score + (isCorrect ? 1 : 0);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (
      questionIndex + 1 <
      selectedQuestions.length
    ) {
      setQuestionIndex(
        questionIndex + 1
      );
    } else {
      setFinished(true);
      if (user) {
        try {
          await updateUserQuizScore(user.uid, finalScore, quiz.title);
        } catch (error) {
          console.error("Failed to save score:", error);
        }
      }
    }
  }

  // FINISHED PAGE
  if (finished) {
    return (
      <>
        <Navbar />
        <CyberBackground />

        <main className="min-h-screen px-6 py-28 flex items-center justify-center text-white">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="
              backdrop-blur-[40px]
              bg-white/[0.03]
              border
              border-white/12
              rounded-3xl
              shadow-[0_25px_60px_rgba(0,0,0,0.7)]
              p-10
              text-center
              max-w-xl
              w-full
            "
          >

            <h1 className="text-4xl font-bold text-green-400">
              Quiz Completed
            </h1>

            <p className="text-gray-300 mt-6 text-lg">
              Final Score
            </p>

            <h2 className="text-6xl font-bold text-white mt-4">
              {score}/10
            </h2>

            <div className="mt-8 w-full h-3 rounded-full bg-white/5 overflow-hidden">
              <div
                className={`h-full ${
                  score >= 8
                    ? "bg-green-500"
                    : score >= 5
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${score * 10}%`,
                }}
              />
            </div>

            {user ? (
              <p className="text-green-400 text-sm mt-6 font-mono">
                ✓ Score saved to your profile dashboard
              </p>
            ) : (
              <p className="text-yellow-400 text-sm mt-6 font-mono">
                ⚠ Log in to save quiz scores and track progress
              </p>
            )}

            <button
              className="
                mt-10
                px-8
                py-3
                rounded-xl
                bg-green-500
                text-black
                font-bold
                shadow-lg
                shadow-green-500/20
                hover:shadow-green-400/40
                transition
              "
              onClick={() => {
                setQuizIndex(null);
                setQuestionIndex(0);
                setScore(0);
                setFinished(false);
              }}
            >
              Back to Quizzes
            </button>
          </motion.div>
        </main>
      </>
    );
  }

  // QUIZ PAGE
  return (
    <>
      <Navbar />
      <CyberBackground />

      <main className="min-h-screen px-6 py-28 flex items-center justify-center text-white">

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            backdrop-blur-[40px]
            bg-white/[0.03]
            border
            border-white/12
            rounded-3xl
            overflow-hidden
            shadow-[0_25px_60px_rgba(0,0,0,0.7)]
            max-w-3xl
            w-full
          "
        >

          {/* TOP BAR */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-green-500/10 bg-black/40">

            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/70"></div>

              <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>

              <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
            </div>

            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-green-400 font-semibold">
              Cyber Awareness Assessment
            </p>

            <div className="text-xs text-gray-500 font-mono">
              quiz-engine.ts
            </div>
          </div>

          <div className="p-8">

            {/* SCORE BAR */}
            <div className="flex justify-between mb-4 text-green-400 text-base font-mono font-bold">
              <span>
                Question{" "}
                {questionIndex + 1}/10
              </span>

              <span>
                Score: {score}
              </span>
            </div>

            <div className="w-full bg-white/5 h-3 rounded-full mb-8 overflow-hidden">
              <div
                className="bg-green-400 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${
                    ((questionIndex + 1) /
                      selectedQuestions.length) *
                    100
                  }%`,
                }}
              />
            </div>

            {/* QUESTION */}
            <h2 className="text-3xl font-bold text-white leading-relaxed mb-10">
              {question.question}
            </h2>

            {/* OPTIONS */}
            <div className="space-y-5">

              {question.options.map(
                (
                  option: string,
                  index: number
                ) => (
                  <motion.button
                    key={index}
                    whileHover={{
                      scale: 1.015,
                    }}
                    whileTap={{
                      scale: 0.985,
                    }}
                    onClick={() =>
                      handleAnswer(index)
                    }
                    className="
                      w-full
                      p-5
                      border
                      border-white/10
                      rounded-2xl
                      bg-black/35
                      text-left
                      hover:bg-green-500/10
                      hover:border-green-400/30
                      transition-all
                      duration-300
                      text-gray-200
                      cursor-pointer
                      font-mono
                      text-base
                    "
                  >
                    {option}
                  </motion.button>
                )
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
}