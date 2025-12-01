import { useState } from 'react';
import { X, MessageCircle, ThumbsUp, Lightbulb } from 'lucide-react';

interface InterviewPrepProps {
  onClose: () => void;
}

export function InterviewPrep({ onClose }: InterviewPrepProps) {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showTips, setShowTips] = useState(false);

  const questionCategories = {
    general: [
      {
        question: "Tell me about yourself.",
        tips: "Keep it professional and relevant. Start with your current role, highlight key achievements, and explain why you're interested in this opportunity. Aim for 2-3 minutes."
      },
      {
        question: "What are your greatest strengths?",
        tips: "Choose 2-3 strengths relevant to the job. Provide specific examples of how you've used these strengths. Focus on skills that match the job description."
      },
      {
        question: "What is your greatest weakness?",
        tips: "Choose a real weakness but show how you're working to improve it. Avoid clichés like 'I'm a perfectionist.' Show self-awareness and growth mindset."
      },
      {
        question: "Why do you want to work here?",
        tips: "Research the company beforehand. Mention specific aspects like their mission, values, products, or culture. Connect it to your career goals."
      },
      {
        question: "Where do you see yourself in 5 years?",
        tips: "Show ambition but be realistic. Align your goals with potential growth in the company. Demonstrate commitment without seeming like you'll leave soon."
      }
    ],
    behavioral: [
      {
        question: "Tell me about a time you faced a challenge at work.",
        tips: "Use the STAR method: Situation, Task, Action, Result. Focus on what YOU did and what you learned. Quantify the results if possible."
      },
      {
        question: "Describe a time you worked with a difficult team member.",
        tips: "Show emotional intelligence and conflict resolution skills. Focus on communication and finding solutions. Don't badmouth anyone."
      },
      {
        question: "Give an example of when you showed leadership.",
        tips: "Leadership isn't just managing people. Could be taking initiative, mentoring, or driving a project. Highlight the positive outcome."
      },
      {
        question: "Tell me about a mistake you made and what you learned.",
        tips: "Choose a real mistake but not a catastrophic one. Focus on what you learned and how you've improved. Show accountability."
      },
      {
        question: "Describe a situation where you had to meet a tight deadline.",
        tips: "Demonstrate time management, prioritization, and ability to work under pressure. Mention any tools or strategies you used."
      }
    ],
    technical: [
      {
        question: "What relevant skills do you bring to this role?",
        tips: "Match your skills directly to the job description. Provide concrete examples of using these skills. Mention any certifications or training."
      },
      {
        question: "How do you stay current in your field?",
        tips: "Mention specific resources: courses, publications, communities. Show genuine interest in continuous learning. Mention recent things you've learned."
      },
      {
        question: "Describe your experience with [specific tool/skill].",
        tips: "Be honest about your proficiency level. Give specific examples of projects. If limited experience, show willingness to learn."
      },
      {
        question: "How would you approach [job-specific scenario]?",
        tips: "Think out loud to show your problem-solving process. Ask clarifying questions if needed. Consider multiple approaches and explain your reasoning."
      }
    ]
  };

  const categories = [
    { id: 'general', label: 'General Questions', color: 'blue' },
    { id: 'behavioral', label: 'Behavioral Questions', color: 'green' },
    { id: 'technical', label: 'Technical Questions', color: 'purple' },
  ];

  const questions = questionCategories[selectedCategory as keyof typeof questionCategories];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div>
              <h2 className="text-2xl text-slate-900 mb-1">Interview Prep</h2>
              <p className="text-slate-600">Practice common interview questions</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-700" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Category Selection */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setCurrentQuestion(0);
                    setShowTips(false);
                  }}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    selectedCategory === category.id
                      ? `bg-${category.color}-600 text-white shadow-lg`
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Question Card */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border-2 border-blue-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-blue-600 text-white rounded-full p-3">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                  </div>
                  <h3 className="text-2xl text-slate-900 mb-4">
                    {questions[currentQuestion].question}
                  </h3>
                </div>
              </div>

              {/* Practice Area */}
              <div className="bg-white rounded-lg p-6 mb-4">
                <label className="block text-slate-700 mb-3">Your Answer:</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Type or speak your answer here to practice..."
                />
              </div>

              {/* Show Tips Button */}
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Lightbulb className="w-5 h-5" />
                {showTips ? 'Hide Tips' : 'Show Answer Tips'}
              </button>

              {/* Tips */}
              {showTips && (
                <div className="mt-4 bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
                  <div className="flex gap-3">
                    <ThumbsUp className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-slate-900 mb-2">How to Answer:</h4>
                      <p className="text-slate-700 leading-relaxed">
                        {questions[currentQuestion].tips}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => {
                  setCurrentQuestion(Math.max(0, currentQuestion - 1));
                  setShowTips(false);
                }}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Question
              </button>

              <div className="flex gap-2">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestion(index);
                      setShowTips(false);
                    }}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentQuestion ? 'bg-blue-600 w-8' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
                  setShowTips(false);
                }}
                disabled={currentQuestion === questions.length - 1}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Question
              </button>
            </div>

            {/* General Tips */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h4 className="text-slate-900 mb-3">General Interview Tips</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Practice out loud, not just in your head. Record yourself if possible.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Use the STAR method for behavioral questions: Situation, Task, Action, Result.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Prepare 2-3 questions to ask the interviewer at the end.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Research the company thoroughly before the interview.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>Be specific with examples and quantify results when possible.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
