import React, { useState } from 'react';
import { BookOpen, DollarSign, Zap, Brain, RefreshCw, Trophy, ArrowLeft, Shield, ScrollText, Play, MessageSquare, ChevronDown, ChevronUp, ChevronRight, Users, Briefcase } from 'lucide-react';

// --- DATA FROM THE BOOK ---

const BOOK_DATA = {
  social: {
    title: "Social Basics",
    icon: <Users className="w-6 h-6" />, 
    color: "text-blue-400",
    intro: "Socializing is a game of perception. The strongest reality wins.",
  },
  business: {
    title: "Business Basics",
    icon: <Briefcase className="w-6 h-6" />, 
    color: "text-green-400",
    intro: "Feelings are irrelevant. The scoreboard is Money.",
  },
  power: {
    title: "Power Basics",
    icon: <Zap className="w-6 h-6" />,
    color: "text-amber-400",
    intro: "Power first. Then Money. Then Women.",
  }
};

const SOCIAL_CHAPTERS = [
  {
    title: "1. The Poker Game of Value",
    content: "When you walk into a room, nobody knows your cards (your value) and you don't know theirs. People naturally assume others have better cards. \n\nLESSON: Stop putting people on a pedestal. That guy with the models? He might have saved for 5 months to hire them. Start from neutral or assume you have the high hand until proven otherwise."
  },
  {
    title: "2. Thermodynamics of Cool",
    content: "Can a 100-degree piece of metal heat a colder piece to 110? No. But a cold piece can cool down a hot one. \n\nLESSON: People are like metal. The person with the lower social value (colder) drags down the higher value (hotter). You must be the heat source. Maintain your temperature (frame) regardless of who you touch."
  },
  {
    title: "3. The Polarity Responder (Tests)",
    content: "Some people (especially attractive women) will say the opposite of what you want just to see you squirm. If you say you like art, they say art is for losers.\n\nTHE FIX: Don't change your story to please them. Be the guy who 'doesn't care' about their approval. If you passed the beer test (throwing it away when he was late), you pass the test of character."
  },
  {
    title: "4. Reality Projection (The Frame)",
    content: "Perception is reality. History shows that if you hold a frame strongly enough (like the Church saying the earth is flat), people believe it. \n\nTACTIC: When you are unsure, do not label your uncertainty. Commit to your reality. If you are sane and they are 'crazy' (committed to their frame), they win. You must be the one with the unshakeable reality."
  },
  {
    title: "5. Value Flipping & The Bratty Sister",
    content: "Think of a guy with a bratty stepsister. He teases her, he doesn't seek her approval, and she follows him around. \n\nMETHOD: When you seek approval, you lose value. When you show you don't value their opinion ('I have plenty of talent, I just don't care'), you flip the script. They start seeking *your* approval."
  },
  {
    title: "6. The Interrupt (Derailing the Train)",
    content: "When someone throws a curveball or an insult, don't argue logic. Derail the train. \n\nEXAMPLE: A woman says 'I don't talk to ugly men.' You say, 'That's okay, I wanted you to buy me a drink.' You interrupted her pattern. She has to stop and process your reality."
  },
  {
    title: "7. Perceptual Flexibility",
    content: "There is always another angle. If they imply you are dumb, assume you were being sarcastic. If they say 'Nice shirt' sarcastically, say 'Thanks, I'm glad you like it.'\n\nRULE: Interpret everything in a way that serves your frame. Control the meaning of every interaction."
  }
];

const BUSINESS_CHAPTERS = [
  {
    title: "1. The Scoreboard is Money",
    content: "In social life, feelings matter. In business, the only scoreboard is money. \n\nLESSON: If you are getting paid, you are winning. If you are 'feeling good' but losing money, you are losing. Don't let your ego (needing a title or a pat on the back) distract you from the cash."
  },
  {
    title: "2. The 'Pain in the Ass' Fee",
    content: "When a client annoys you, do not get angry. Anger is emotional. \n\nLOGIC: Calculate the resources they are wasting. Charge them for it. If Client B takes 2 extra hours of arguing, raise their price. Now you don't hate them; you are being paid to deal with them. Emotion replaced by logic."
  },
  {
    title: "3. Vulnerability in Happiness",
    content: "You are most vulnerable when you are happy and smiling (like a dog rolling over). \n\nWARNING: Do not get giddy when the deal is close. Stay cold. Stay calculated. An organization that prioritizes 'feeling good' will always be crushed by an organization that prioritizes the scoreboard."
  },
  {
    title: "4. Perspective: The Movie Theater",
    content: "When things go wrong, detach. Imagine you are sitting in a movie theater watching yourself on screen. \n\nANALYSIS: What does the client perceive? Not what you 'meant' to do, but what did they see/hear/feel? Solve the problem from their reality, not yours."
  },
  {
    title: "5. Value is Perception (The No Refunds Sign)",
    content: "Everything is negotiable. A 'No Refunds' sign is just an opening position.\n\nSTORY: The author bought a broken toy. The clerk refused a refund. The author loudly thanked the owner for 'ensuring his happiness' in front of other customers. The owner refunded him to save the frame of his store. Create a win/win where giving you what you want is their easiest path."
  },
  {
    title: "6. The Interrupt in Business",
    content: "Use the interrupt to change focus. \n\nEXAMPLE: Gordon wanted to be a bodybuilder. He started acting like one (working out 5 days a week) before he looked like one. He interrupted his current reality with his future reality. In business, act like the big company you want to be until you are one."
  },
  {
    title: "7. Gaps of Understanding",
    content: "Whenever there is ambiguity, fill it with your reality. \n\nTACTIC: Don't ask 'When can I get the check?' Say 'I'll pick up the check at 10 AM.' Assume the sale. Assume the positive outcome. People are lazy; they will often just agree with your plan rather than make their own."
  }
];

const POWER_CHAPTERS = [
  {
    title: "1. The Setup: Playing with Fire",
    content: "The section opens with a story of a man on a date in New York with a model named Cynthia. He stretched the truth to get her and stretched his finances to impress her. When the waiter says, 'I'm sorry sir, your card didn't go through,' his world collapses.\n\nLESSON: If you don't understand the dangers of the toys you're playing with, you can really hurt yourself. You need a foundation of power, not just a credit limit."
  },
  {
    title: "2. The Lie: Money, Women, Power",
    content: "Society (and Scarface) teaches the order: Money -> Power -> Women. This is dead wrong. The masses chase money to buy things (External Validation) hoping it brings power and women.\n\nREALITY: A guy driving a Lamborghini with a hot girl isn't powerful because of the car. The car and the girl are results of his inner power. If you chase money first, you enter a hamster wheel with no finish line."
  },
  {
    title: "3. The True Order: Power -> Money -> Women",
    content: "The correct equation is Power First. Then Money. Then Women. Power is the root. If you have inner power, money is easily generated, and women are naturally attracted to that energy.\n\nKEY CONCEPT: 'Power is a gift from the weak.' There is no physical object stopping you from having power. It is 100% in your head. You only lack power because you give it away to others out of fear."
  },
  {
    title: "4. External Validation is Weakness",
    content: "If you need a corner office or a BMW to feel like a 'somebody,' you are weak. If those things are taken away, your confidence vanishes. True Alphas don't need props. If you start bragging about your stuff to women, it backfires and you look like a pompous jackass."
  },
  {
    title: "5. Money Before Power (The Trap)",
    content: "Giving money to someone without power is like giving a cure for cancer to a 2-year-old on a napkin—they will just choke on it. Lottery winners go broke because money just amplifies who you already are. If you are stressed and broke, money just buys you more stress."
  },
  {
    title: "6. The Samurai Sword Analogy",
    content: "Place a Samurai sword in the hands of a master, and he is deadly. Place it in the hands of a baby, and it can't even lift it. Money is the sword. Power is the hand. You must train the hand (Power) before you sharpen the sword (Money)."
  },
  {
    title: "7. The Money Smokescreen (Drill vs. Hole)",
    content: "People get obsessed with buying a 'drill' when all they want is a 'hole'. Money is just a tool. Don't let the pursuit of money blind you to the actual goal. Often, you can get the result (the trip, the experience) without the traditional cost if you focus on the outcome."
  },
  {
    title: "8. The Magician's Bank Account",
    content: "For the truly powerful, money feels like Monopoly money. It isn't 'real'—it's just a way to keep score. They don't care about owning things; they care about CONTROLLING things. Ownership is a liability; Control is power."
  },
  {
    title: "9. How Women Prevent Wealth (Larry vs. Doug)",
    content: "Story: Larry spends $350/mo on a girlfriend. Doug invests $350/mo in a business. A year later, Larry is dumped and broke. Doug is rich. \n\nRULE: Money spent on women is an EXPENSE, not an investment. You will never see a financial return on it. Do not enter a serious relationship until you have built your empire. Build the foundation first."
  },
  {
    title: "10. Disconnecting Cash from the Vagina",
    content: "Money can only 'rent' women (prostitutes or gold diggers). Power 'possesses' women. If you have to bribe a woman to be with you, something is wrong. Sex is natural. Money makes it unnatural.\n\nQUOTE: 'You've got a pussy. I have a dick. So what's the problem? Let's do it quick.' (Rammstein reference). Keep it simple and natural."
  },
  {
    title: "11. Kunta Kinte vs. Toby",
    content: "We are born as 'Kunta Kinte'—wild, uninhibited, treating everyone equal. Society beats us until we accept the name 'Toby'—apologetic, fearful, asking for permission.\n\nTHE TEST: Do you walk up to a woman and say 'Hi, I'm Toby, can I buy you a drink?' OR do you say 'Hi, I came over to flirt with you'? Remember who you were before society broke you."
  },
  {
    title: "12. The Elephant's Stake",
    content: "Baby elephants are tied with chains and learn they can't escape. Adults are tied with weak ropes but still don't try, because they believe they can't. You are the adult elephant. The only thing holding you back is a mental stake. Pull it out. There is no person or object stopping you from having power."
  }
];

const SOCIAL_TACTICS = [
  {
    trigger: "Someone points out a mistake you made.",
    response: "Ah... I see the screw-up fairy has visited us again. Lucky for me, she is the tooth fairy's sister and I will have two dollars under my pillow tomorrow morning.",
    type: "Value Flip / Amusement"
  },
  {
    trigger: "Someone asks 'What's wrong with you?'",
    response: "I keep a list. It's alphabetized for easy reference. Can you read?",
    type: "Value Flip / Agree & Amplify"
  },
  {
    trigger: "Awkward silence or they say something boring.",
    response: "Did you know that the Native American Indians called corn Maize? ... I think that is a-MAZ-ing. Don't you?",
    type: "The Interrupt (Confusion)"
  },
  {
    trigger: "A woman says 'Nice shirt' sarcastically.",
    response: "I'm glad you like it.",
    type: "Perceptual Flexibility (Ignore Sarcasm)"
  },
  {
    trigger: "Someone tries to insult you.",
    response: "I have plenty of talent and vision; I just don't care.",
    type: "Apathy / High Value"
  }
];

const STORIES = [
  {
    title: "The 'Millionaire' at the Club",
    category: "social",
    icon: <Users className="w-4 h-4" />,
    color: "text-blue-400",
    story: "The author saw an old, balding man with two gorgeous women at a club. He assumed the man was rich and powerful (assigning high value). Later, he found out the guy had saved up for 5 months just to hire two prostitutes.",
    lesson: "Stop assigning value based on appearances. People are just people. Even the 'cool' crowd has flaws you can't see."
  },
  {
    title: "The Vegas Beer Negotiation",
    category: "business",
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-green-400",
    story: "A friend negotiated a free beer from a waitress by betting a huge tip. He argued he 'paid zero for the beer' even though the tip cost more than the beer. He maintained his reality that he won the negotiation.",
    lesson: "The strongest reality wins. It wasn't about the cost; it was about the control and the fun of the interaction."
  },
  {
    title: "Cookie Diplomacy",
    category: "business",
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-green-400",
    story: "Selling equipment to schools meant getting paid late. Instead of fighting, the author visited the accounting lady with fresh chocolate chunk cookies every time he picked up a check. Suddenly, his checks started getting cut early.",
    lesson: "Win the people to win the game. The scoreboard is money; use whatever social lubricant is necessary to put points on the board."
  },
  {
    title: "The 'No Refunds' Sign",
    category: "business",
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-green-400",
    story: "The author bought a broken toy. The clerk pointed to a 'No Refunds' sign. Instead of arguing the policy, the author loudly thanked the owner for 'ensuring his happiness' in front of other customers. The owner refunded him immediately to avoid a scene.",
    lesson: "Everything is negotiable. Policies are just opening positions. Create a reality where giving you what you want is the path of least resistance."
  },
  {
    title: "The Drill vs. The Hole",
    category: "business",
    icon: <DollarSign className="w-4 h-4" />,
    color: "text-green-400",
    story: "A man wants to buy a drill. But he doesn't actually want a drill; he wants a hole. If you focus on the drill (the money/method), you miss options. Maybe you can get the hole without buying the drill.",
    lesson: "Don't get fixated on money as the only tool. Focus on the end result (the hole). There are often creative ways to get the result without the standard cost."
  }
];

const QUOTES = [
  "Reality is a crutch for those lacking enthusiasm and imagination.",
  "Perception is ALWAYS of greater significance than fact.",
  "The strongest frame always wins.",
  "Your feelings are irrelevant to the process.",
  "Action is the only way to fail enough to learn and thereby learn enough to succeed.",
  "If you don't have anything going wrong, you do not have enough going on.",
  "Power is a gift from the weak.",
  "It's not that you lost, it's how you played the game? Try success.",
];

const SCENARIOS = [
  {
    question: "A woman at a bar tells you: 'I don't talk to ugly men.' What is the Alpha response?",
    options: [
      { text: "Get angry and tell her she's not that hot anyway.", correct: false, feedback: "Too emotional. You lost your frame." },
      { text: "Apologize and walk away.", correct: false, feedback: "Weakness. You accepted her value assignment." },
      { text: "'That's okay, I wasn't interested in talking, I wanted you to buy me a drink.'", correct: true, feedback: "Correct! This is 'The Interrupt'. You derailed her logic and amused yourself." }
    ]
  },
  {
    question: "You need a specific tool for a project, but it costs $500. You only have $500 in the bank.",
    options: [
      { text: "Buy the tool. You need it.", correct: false, feedback: "You focused on the drill, not the hole. Now you're broke." },
      { text: "Wait until you save more money.", correct: false, feedback: "Analysis paralysis. You are delaying action." },
      { text: "Find a way to borrow the tool or hire someone who has it.", correct: true, feedback: "Correct. You focused on the 'hole' (the result), not the 'drill' (the purchase)." }
    ]
  },
  {
    question: "A client pays late. You are furious. What do you do?",
    options: [
      { text: "Call them and scream to show dominance.", correct: false, feedback: "Emotional. Business is about the scoreboard, not feelings." },
      { text: "Analyze the cost of their difficulty and raise their rates next time.", correct: true, feedback: "Correct. Use logic. Make them pay for the resources they consume." },
      { text: "Drop the client immediately.", correct: false, feedback: "Maybe, but only if they aren't profitable. Don't fire them just because you're mad." }
    ]
  },
  {
    question: "You want to buy a luxury car to get respect. The book says:",
    options: [
      { text: "Do it. People respect money.", correct: false, feedback: "That is External Validation. If you lose the car, you lose the respect." },
      { text: "Only buy it if you truly enjoy it, not for validation.", correct: true, feedback: "Correct. Objects don't give you power. You give objects power." },
      { text: "Lease it so you have more cash flow.", correct: false, feedback: "Missing the point. It's about why you want it, not how you pay for it." }
    ]
  }
];

// --- COMPONENTS ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-slate-800 border border-slate-700 rounded-xl p-6 shadow-lg ${className}`}>
    {children}
  </div>
);

const SectionView = ({ section, onBack }) => {
  const [expandedChapter, setExpandedChapter] = useState(null);

  // Determine which data to use based on section title
  let chapters = [];
  let manifestoText = "";
  
  if (section.title === "Power Basics") {
    chapters = POWER_CHAPTERS;
    manifestoText = "The Power Manifesto. This section contains the core philosophy of the Alpha Male. Read each chapter carefully.";
  } else if (section.title === "Social Basics") {
    chapters = SOCIAL_CHAPTERS;
    manifestoText = "The Social Playbook. Learn to control the frame, flip value, and dominate perception.";
  } else if (section.title === "Business Basics") {
    chapters = BUSINESS_CHAPTERS;
    manifestoText = "The Business Logic. Eliminate emotion, focus on the scoreboard, and negotiate everything.";
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>
      
      <div className="text-center mb-8">
        <div className={`inline-block p-3 rounded-full bg-slate-800 mb-4 ${section.color}`}>
          {section.icon}
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">{section.title}</h2>
        <p className="text-slate-400 italic">"{section.intro}"</p>
      </div>

      {/* MANIFESTO VIEW FOR ALL SECTIONS */}
      <div className="space-y-4">
        <div className={`bg-slate-800/50 border border-slate-700 p-4 rounded-lg text-slate-300 text-sm mb-6 flex items-start gap-3`}>
            <Shield className={`w-5 h-5 flex-shrink-0 mt-0.5 ${section.color}`} />
            <p>{manifestoText}</p>
        </div>
        {chapters.map((chapter, idx) => {
            const isOpen = expandedChapter === idx;
            return (
              <div key={idx} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300">
                  <button 
                    onClick={() => setExpandedChapter(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 hover:bg-slate-750 transition-colors text-left"
                  >
                    <h3 className={`text-lg font-bold ${isOpen ? section.color : 'text-white'}`}>{chapter.title}</h3>
                    {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 bg-slate-800/50 border-t border-slate-700/50">
                        <p className="text-slate-300 leading-relaxed whitespace-pre-line">{chapter.content}</p>
                    </div>
                  )}
              </div>
            )
        })}
      </div>

      {/* Specific Module for Social Tactics (Only for Social Section) */}
      {section.title === "Social Basics" && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" /> Tactical Retorts
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {SOCIAL_TACTICS.map((tactic, idx) => (
              <Card key={idx} className="bg-slate-800/50">
                <div className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">{tactic.type}</div>
                <div className="mb-2 text-sm text-slate-400 italic">" {tactic.trigger} "</div>
                <div className="text-white font-medium border-l-2 border-blue-500 pl-3 py-1">
                  "{tactic.response}"
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StoriesView = ({ onBack }) => (
  <div className="space-y-6 animate-fadeIn">
    <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
    </button>

    <div className="text-center mb-8">
      <div className="inline-block p-3 rounded-full bg-slate-800 mb-4 text-purple-400">
        <ScrollText className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-2">The Vault</h2>
      <p className="text-slate-400 italic">"Real world scenarios from the book that defined the mindset."</p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      {STORIES.map((item, idx) => (
        <Card key={idx} className="hover:border-slate-500 transition-colors flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <span className={`${item.color}`}>{item.icon}</span>
            <span className={`text-xs font-bold uppercase tracking-wider ${item.color} bg-slate-900 px-2 py-1 rounded`}>
              {item.category}
            </span>
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
          <div className="bg-slate-900/50 p-4 rounded-lg mb-4 flex-grow border-l-2 border-slate-600">
            <p className="text-slate-300 italic text-sm">"{item.story}"</p>
          </div>
          <div>
            <span className="text-xs text-slate-500 uppercase font-bold">The Lesson</span>
            <p className="text-slate-200 mt-1">{item.lesson}</p>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const SimulatorView = ({ onBack }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (idx) => {
    setSelected(idx);
    setShowFeedback(true);
    if (SCENARIOS[currentQ].options[idx].correct) {
      setScore(s => s + 1);
    }
  };

  const nextQ = () => {
    setSelected(null);
    setShowFeedback(false);
    if (currentQ < SCENARIOS.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setCurrentQ(-1); // Finished
    }
  };

  if (currentQ === -1) {
    return (
      <div className="text-center space-y-6 animate-fadeIn">
        <Trophy className="w-20 h-20 text-yellow-500 mx-auto" />
        <h2 className="text-3xl font-bold text-white">Simulation Complete</h2>
        <p className="text-xl text-slate-300">
          You scored {score} out of {SCENARIOS.length}
        </p>
        <p className="text-slate-400">
          {score === SCENARIOS.length 
            ? "You are operating at full Alpha capacity." 
            : "Review the basics and try again."}
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={onBack} className="px-6 py-3 bg-slate-700 text-white rounded-lg font-bold">Dashboard</button>
          <button onClick={() => { setCurrentQ(0); setScore(0); }} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold">Retry</button>
        </div>
      </div>
    );
  }

  const scenario = SCENARIOS[currentQ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      <button onClick={onBack} className="flex items-center text-slate-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Quit Simulator
      </button>

      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-blue-500 h-full transition-all duration-300"
          style={{ width: `${((currentQ) / SCENARIOS.length) * 100}%` }}
        />
      </div>

      <Card>
        <h3 className="text-xl font-bold text-white mb-6">Scenario {currentQ + 1}</h3>
        <p className="text-lg text-slate-200 mb-8">{scenario.question}</p>
        
        <div className="space-y-3">
          {scenario.options.map((opt, idx) => (
            <button
              key={idx}
              disabled={showFeedback}
              onClick={() => handleAnswer(idx)}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                showFeedback 
                  ? opt.correct 
                    ? "bg-green-900/30 border-green-500 text-green-100" 
                    : selected === idx 
                      ? "bg-red-900/30 border-red-500 text-red-100"
                      : "bg-slate-800 border-slate-700 opacity-50"
                  : "bg-slate-800 border-slate-700 hover:bg-slate-700 hover:border-blue-500 text-slate-200"
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {showFeedback && (
          <div className="mt-6 p-4 bg-slate-900 rounded-lg border-l-4 border-blue-500 animate-slideUp">
            <p className="text-slate-200">
              <span className="font-bold block mb-1">Analysis:</span>
              {scenario.options[selected].feedback}
            </p>
            <button 
              onClick={nextQ}
              className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold transition-colors"
            >
              {currentQ === SCENARIOS.length - 1 ? "Finish" : "Next Scenario"}
            </button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home'); // home, social, business, power, simulator, stories
  const [quote, setQuote] = useState(QUOTES[0]);

  const refreshQuote = () => {
    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(random);
  };

  const renderContent = () => {
    switch(view) {
      case 'social': return <SectionView section={BOOK_DATA.social} onBack={() => setView('home')} />;
      case 'business': return <SectionView section={BOOK_DATA.business} onBack={() => setView('home')} />;
      case 'power': return <SectionView section={BOOK_DATA.power} onBack={() => setView('home')} />;
      case 'stories': return <StoriesView onBack={() => setView('home')} />;
      case 'simulator': return <SimulatorView onBack={() => setView('home')} />;
      default: return (
        <div className="space-y-8 animate-fadeIn">
          {/* Quote Banner */}
          <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 to-slate-900 rounded-xl p-8 border border-slate-700">
            <div className="relative z-10">
              <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2">Alpha Principle</h3>
              <p className="text-xl md:text-2xl text-white font-serif italic mb-4">"{quote}"</p>
              <button onClick={refreshQuote} className="flex items-center text-xs text-slate-400 hover:text-white transition-colors">
                <RefreshCw className="w-3 h-3 mr-1" /> New Principle
              </button>
            </div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          </div>

          {/* Pillars Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            <button onClick={() => setView('social')} className="group text-left">
              <Card className="h-full hover:bg-slate-750 hover:border-blue-500/50 transition-all duration-300">
                <div className="p-3 bg-blue-500/20 w-fit rounded-lg text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Social Basics</h3>
                <p className="text-sm text-slate-400">Master value flipping, interrupts, and projection.</p>
                <div className="mt-4 flex items-center text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Section <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </button>

            <button onClick={() => setView('business')} className="group text-left">
              <Card className="h-full hover:bg-slate-750 hover:border-green-500/50 transition-all duration-300">
                <div className="p-3 bg-green-500/20 w-fit rounded-lg text-green-400 mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Business Basics</h3>
                <p className="text-sm text-slate-400">The scoreboard, emotionless logic, and negotiation.</p>
                <div className="mt-4 flex items-center text-green-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Section <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </button>

            <button onClick={() => setView('power')} className="group text-left">
              <Card className="h-full hover:bg-slate-750 hover:border-amber-500/50 transition-all duration-300">
                <div className="p-3 bg-amber-500/20 w-fit rounded-lg text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Power Basics</h3>
                <p className="text-sm text-slate-400">Internal power, facing fear, and the hierarchy.</p>
                <div className="mt-4 flex items-center text-amber-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  Open Section <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </Card>
            </button>
          </div>

          {/* New Rows: Stories & Simulator */}
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => setView('stories')} className="group text-left">
               <Card className="h-full hover:bg-slate-750 hover:border-purple-500/50 transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400 group-hover:scale-110 transition-transform">
                        <ScrollText className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-white">The Vault</h3>
                        <p className="text-sm text-slate-400">Stories & Lessons from the book.</p>
                     </div>
                  </div>
               </Card>
            </button>

            <button onClick={() => setView('simulator')} className="group text-left">
               <Card className="h-full hover:bg-slate-750 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-blue-600 rounded-lg text-white group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6" />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-white">Simulator</h3>
                        <p className="text-sm text-slate-400">Test your reflexes.</p>
                     </div>
                  </div>
               </Card>
            </button>
          </div>

        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500 selection:text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-white tracking-tight">DOMINATION BASICS <span className="text-blue-500">PLAYBOOK</span></h1>
          </div>
          <div className="text-xs text-slate-500 border border-slate-700 px-3 py-1 rounded-full">
            Based on the book by Drawk Kwast
          </div>
        </header>

        <main>
          {renderContent()}
        </main>

        <footer className="mt-20 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Alpha Playbook App. Built for Homie.</p>
        </footer>
      </div>
    </div>
  );
}