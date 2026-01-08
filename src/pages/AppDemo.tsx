import { useState, useRef, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Play, RotateCcw, SkipForward, CheckCircle, Volume2, VolumeX, Square, Lock, Eye, Brain, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

const learningCapsules = [
  {
    id: "intro",
    title: "Intro / AV Architecture",
    description: "Understanding the foundation of autonomous vehicle systems",
    path: "/platform_demo_videos/Intro_AV_architecture_01.mp4",
    poster: "/placeholder.svg",
    questions: [
      {
        question: "What is the primary purpose of an Autonomous Vehicle architecture?",
        options: [
          "To maximize vehicle speed",
          "To safely navigate and make decisions without human intervention",
          "To reduce manufacturing costs",
          "To improve fuel efficiency"
        ],
        correctAnswer: "To safely navigate and make decisions without human intervention"
      },
      {
        question: "Which module acts as the 'brain' of the AV system?",
        options: [
          "Control Module",
          "Sensor Module", 
          "Planning Module",
          "Perception Module"
        ],
        correctAnswer: "Planning Module"
      }
    ]
  },
  {
    id: "sensors",
    title: "Sensors",
    description: "The eyes and ears of autonomous vehicles",
    path: "/platform_demo_videos/Sensor_module_02.mp4",
    poster: "/placeholder.svg",
    questions: [
      {
        question: "Which sensors are typically used in AV perception systems?",
        options: [
          "Only cameras",
          "Only GPS",
          "LiDAR, radar, cameras, and ultrasonic sensors",
          "Just LiDAR and radar"
        ],
        correctAnswer: "LiDAR, radar, cameras, and ultrasonic sensors"
      },
      {
        question: "What is the main advantage of LiDAR over cameras?",
        options: [
          "Lower cost",
          "Better color detection",
          "Accurate depth perception in all lighting",
          "Higher resolution"
        ],
        correctAnswer: "Accurate depth perception in all lighting"
      }
    ]
  },
  {
    id: "perception",
    title: "Perception",
    description: "Making sense of the world through sensor data",
    path: "/platform_demo_videos/Perception_module_03.mp4",
    poster: "/placeholder.svg",
    questions: [
      {
        question: "What does the perception module primarily process?",
        options: [
          "Route planning data",
          "Sensor data to understand the environment",
          "Vehicle control commands",
          "Passenger comfort settings"
        ],
        correctAnswer: "Sensor data to understand the environment"
      }
    ]
  },
  {
    id: "planning",
    title: "Planning",
    description: "Deciding the vehicle's next moves",
    path: "/platform_demo_videos/planning_module_04.mp4",
    poster: "/placeholder.svg",
    questions: [
      {
        question: "What is the main responsibility of the planning module?",
        options: [
          "Processing sensor data",
          "Deciding vehicle actions and trajectory",
          "Executing steering commands",
          "Monitoring tire pressure"
        ],
        correctAnswer: "Deciding vehicle actions and trajectory"
      }
    ]
  },
  {
    id: "control",
    title: "Control",
    description: "Executing decisions in the physical world",
    path: "/platform_demo_videos/Control_module_05.mp4",
    poster: "/placeholder.svg",
    questions: [
      {
        question: "What does the control module directly manage?",
        options: [
          "Sensor fusion",
          "Path planning algorithms", 
          "Physical vehicle components (steering, acceleration, braking)",
          "Traffic light detection"
        ],
        correctAnswer: "Physical vehicle components (steering, acceleration, braking)"
      }
    ]
  }
];

const knowledgeGraphNodes = [
  { id: "intro", label: "AV Architecture", x: 50, y: 10 },
  { id: "sensors", label: "Sensors", x: 20, y: 35 },
  { id: "perception", label: "Perception", x: 80, y: 35 },
  { id: "planning", label: "Planning", x: 35, y: 70 },
  { id: "control", label: "Control", x: 65, y: 70 }
];

const knowledgeGraphEdges = [
  { from: "intro", to: "sensors" },
  { from: "intro", to: "perception" },
  { from: "sensors", to: "perception" },
  { from: "perception", to: "planning" },
  { from: "perception", to: "control" },
  { from: "planning", to: "control" }
];

type CapsuleState = "locked" | "viewed" | "weak" | "mastered";

export default function AppDemo() {
  const [capsuleStates, setCapsuleStates] = useState<Record<string, CapsuleState>>(() => 
    learningCapsules.reduce((acc, capsule) => ({ ...acc, [capsule.id]: "locked" }), {})
  );
  const [currentCapsuleIndex, setCurrentCapsuleIndex] = useState(0);
  const [showQuestions, setShowQuestions] = useState<Record<string, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCapsules, setVisibleCapsules] = useState<Set<string>>(new Set());

  const currentCapsule = learningCapsules[currentCapsuleIndex];

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initialize first capsule as viewed
  useEffect(() => {
    setCapsuleStates(prev => ({
      ...prev,
      [learningCapsules[0].id]: "viewed"
    }));
  }, []);

  // Scroll-based progression logic
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile) return;
      
      const capsuleElements = document.querySelectorAll('[data-capsule-id]');
      const visible = new Set<string>();
      
      capsuleElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const capsuleId = element.getAttribute('data-capsule-id');
        
        if (capsuleId && rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3) {
          visible.add(capsuleId);
        }
      });
      
      setVisibleCapsules(visible);
      
      // Update current capsule based on scroll
      if (visible.size > 0) {
        const firstVisible = Array.from(visible)[0];
        const index = learningCapsules.findIndex(c => c.id === firstVisible);
        if (index !== -1 && index !== currentCapsuleIndex) {
          setCurrentCapsuleIndex(index);
        }
      }
    };

    if (isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile, currentCapsuleIndex]);

  const handleVideoEnd = (capsuleId: string) => {
    setShowQuestions(prev => ({ ...prev, [capsuleId]: true }));
    setIsPlaying(prev => ({ ...prev, [capsuleId]: false }));
  };

  const handleAnswerSubmit = (capsuleId: string, questionIndex: number) => {
    const capsule = learningCapsules.find(c => c.id === capsuleId);
    if (!capsule) return;

    const question = capsule.questions[questionIndex];
    const userAnswer = selectedAnswers[`${capsuleId}-${questionIndex}`];
    
    if (!userAnswer) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = userAnswer === question.correctAnswer;
    
    // Update capsule state based on answer correctness
    setCapsuleStates(prev => {
      const currentState = prev[capsuleId];
      let newState = currentState;
      
      if (isCorrect && currentState !== "mastered") {
        newState = "mastered";
      } else if (!isCorrect && currentState === "viewed") {
        newState = "weak";
      }
      
      return { ...prev, [capsuleId]: newState };
    });

    // Check if this is the last question of the capsule
    const isLastQuestion = questionIndex === capsule.questions.length - 1;
    
    if (isLastQuestion) {
      const capsuleIndex = learningCapsules.findIndex(c => c.id === capsuleId);
      
      // Unlock next capsule if there is one
      if (capsuleIndex < learningCapsules.length - 1) {
        const nextCapsule = learningCapsules[capsuleIndex + 1];
        setCapsuleStates(prev => ({
          ...prev,
          [nextCapsule.id]: "viewed"
        }));
        
        // Auto-advance to next capsule after a short delay
        setTimeout(() => {
          setCurrentCapsuleIndex(capsuleIndex + 1);
          setShowQuestions(prev => ({ ...prev, [capsuleId]: false }));
        }, 1500);
      }
      
      // Check if all capsules are completed
      const allCapsules = learningCapsules.map(c => c.id);
      const allCompleted = allCapsules.every(id => {
        const state = capsuleStates[id];
        return state === "mastered" || state === "weak";
      });
      
      if (allCompleted) {
        setIsCompleted(true);
      }
    }

    toast({
      title: isCorrect ? "Correct!" : "Not quite right",
      description: isCorrect ? "Great understanding!" : "Keep learning!",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const getStateColor = (state: CapsuleState) => {
    switch (state) {
      case "mastered": return "text-green-500";
      case "weak": return "text-yellow-500";
      case "viewed": return "text-blue-500";
      default: return "text-gray-400";
    }
  };

  const getStateBgColor = (state: CapsuleState) => {
    switch (state) {
      case "mastered": return "bg-green-500";
      case "weak": return "bg-yellow-500";
      case "viewed": return "bg-blue-500";
      default: return "bg-gray-400";
    }
  };

  const getStateIcon = (state: CapsuleState) => {
    switch (state) {
      case "mastered": return <Brain className="w-4 h-4" />;
      case "weak": return <TrendingUp className="w-4 h-4" />;
      case "viewed": return <Eye className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  // Calculate analytics
  const analytics = {
    locked: learningCapsules.filter(c => capsuleStates[c.id] === "locked").length,
    viewed: learningCapsules.filter(c => capsuleStates[c.id] === "viewed").length,
    weak: learningCapsules.filter(c => capsuleStates[c.id] === "weak").length,
    mastered: learningCapsules.filter(c => capsuleStates[c.id] === "mastered").length,
  };

  const totalCapsules = learningCapsules.length;

  if (isCompleted) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                You've mastered the AV Architecture learning path!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Sensors → Perception → Planning → Control
              </p>
              <Button asChild size="lg" className="w-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-primary/30">
                <Link to="/try">
                  Join the KnowGraph Beta
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-card border-b border-border flex-shrink-0">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-foreground">KnowGraph Demo</h1>
                <p className="text-sm text-muted-foreground">Graph-based structured learning</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{analytics.mastered}</span>/{totalCapsules} mastered
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-1 gap-4 px-4 py-4 overflow-hidden">
          {/* Left Column - Learning Feed (Full Height) */}
          <div className="flex-1 lg:flex-[2] overflow-hidden">
            {learningCapsules.map((capsule, index) => {
              const state = capsuleStates[capsule.id];
              const isLocked = state === "locked" && index > 0;
              const isActive = index === currentCapsuleIndex;
              
              if (isLocked) {
                return (
                  <div key={capsule.id} className="h-full flex items-center justify-center">
                    <Card className="opacity-50">
                      <CardContent className="p-8 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                          <Lock className="w-8 h-8 text-gray-400" />
                          <h3 className="text-lg font-semibold text-gray-400">{capsule.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">Complete previous capsules to unlock</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              }

              // Only show current capsule on desktop, all on mobile
              if (!isMobile && !isActive) {
                return null;
              }

              return (
                <div key={capsule.id} className="h-full" data-capsule-id={capsule.id}>
                  <Card className="h-full overflow-hidden">
                    <CardContent className="p-0 h-full">
                      {!showQuestions[capsule.id] ? (
                        /* Video Container - Full Height */
                        <div className="relative bg-black h-full">
                          <video
                            ref={el => { if (el) videoRefs.current[capsule.id] = el; }}
                            className="w-full h-full object-contain"
                            poster={capsule.poster}
                            muted={isMuted}
                            playsInline
                            onEnded={() => handleVideoEnd(capsule.id)}
                            key={capsule.id}
                          >
                            <source src={capsule.path} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {/* Play/Pause Overlay */}
                          {!isPlaying[capsule.id] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                              <Button
                                size="lg"
                                onClick={() => {
                                  if (videoRefs.current[capsule.id]) {
                                    videoRefs.current[capsule.id].play();
                                    setIsPlaying(prev => ({ ...prev, [capsule.id]: true }));
                                  }
                                }}
                                className="w-20 h-20 rounded-full bg-white/95 hover:bg-white hover:scale-110 text-black transition-all duration-300 shadow-2xl border-2 border-white/30 backdrop-blur-sm"
                              >
                                <Play className="w-8 h-8 ml-1" fill="currentColor" />
                              </Button>
                            </div>
                          )}
                          
                          {/* Video Title Overlay */}
                          <div className="absolute top-4 left-4 right-4">
                            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                              <h3 className="text-white text-lg font-medium">{capsule.title}</h3>
                              <p className="text-white/80 text-sm">{capsule.description}</p>
                            </div>
                          </div>

                          {/* State Badge */}
                          <div className="absolute top-4 right-4">
                            <div className={`flex items-center gap-2 px-3 py-2 rounded-full ${getStateBgColor(state)} bg-opacity-20 backdrop-blur-sm`}>
                              <div className={`w-2 h-2 rounded-full ${getStateBgColor(state)}`} />
                              <span className="text-white text-sm capitalize">{state}</span>
                            </div>
                          </div>

                          {/* Audio Controls */}
                          <div className="absolute bottom-4 right-4 flex gap-2">
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => {
                                if (videoRefs.current[capsule.id]) {
                                  if (isPlaying[capsule.id]) {
                                    videoRefs.current[capsule.id].pause();
                                  } else {
                                    videoRefs.current[capsule.id].play();
                                  }
                                  setIsPlaying(prev => ({ ...prev, [capsule.id]: !prev[capsule.id] }));
                                }
                              }}
                              className="bg-black/50 hover:bg-black/70 text-white border-none h-10 w-10 p-0"
                            >
                              {isPlaying[capsule.id] ? (
                                <Square className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              onClick={() => setIsMuted(!isMuted)}
                              className="bg-black/50 hover:bg-black/70 text-white border-none h-10 w-10 p-0"
                            >
                              {isMuted ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* Questions Section - Full Height */
                        <div className="h-full p-8 overflow-y-auto">
                          <div className="max-w-2xl mx-auto">
                            <div className="mb-6">
                              <h3 className="text-2xl font-bold mb-2">{capsule.title}</h3>
                              <p className="text-muted-foreground">Test Your Understanding</p>
                            </div>
                            <div className="space-y-6">
                              {capsule.questions.map((question, qIndex) => (
                                <div key={qIndex} className="space-y-4 p-6 bg-muted/30 rounded-lg">
                                  <p className="text-lg font-medium">{question.question}</p>
                                  <RadioGroup 
                                    value={selectedAnswers[`${capsule.id}-${qIndex}`] || ""} 
                                    onValueChange={(value) => setSelectedAnswers(prev => ({
                                      ...prev,
                                      [`${capsule.id}-${qIndex}`]: value
                                    }))}
                                    className="space-y-3"
                                  >
                                    {question.options.map((option, oIndex) => (
                                      <div key={oIndex} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                        <RadioGroupItem value={option} id={`${capsule.id}-${qIndex}-${oIndex}`} />
                                        <Label htmlFor={`${capsule.id}-${qIndex}-${oIndex}`} className="flex-1 cursor-pointer text-base">
                                          {option}
                                        </Label>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                  <Button 
                                    onClick={() => handleAnswerSubmit(capsule.id, qIndex)}
                                    disabled={!selectedAnswers[`${capsule.id}-${qIndex}`]}
                                    className="w-full"
                                    size="lg"
                                  >
                                    Submit Answer
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Right Column - Learning Intelligence (Sticky on Desktop) */}
          <div className="flex-1 lg:flex-[1] overflow-hidden">
            <div className={`h-full space-y-4 ${!isMobile ? 'overflow-y-auto' : ''}`}>
              {/* Learning Path */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Learning Path
                  </h3>
                  <div className="space-y-2">
                    {learningCapsules.map((capsule, index) => {
                      const state = capsuleStates[capsule.id];
                      const isCurrent = index === currentCapsuleIndex;
                      
                      return (
                        <div
                          key={capsule.id}
                          className={`flex items-center gap-2 p-2 rounded transition-all ${
                            isCurrent ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className={`flex items-center justify-center w-6 h-6 rounded-full ${getStateBgColor(state)} bg-opacity-20`}>
                            {getStateIcon(state)}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-xs">{capsule.title}</div>
                            <div className="text-xs text-muted-foreground capitalize">{state}</div>
                          </div>
                          {isCurrent && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Knowledge Graph */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-3">Knowledge Graph</h3>
                  <div className="relative w-full h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="nodeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Edges */}
                      {knowledgeGraphEdges.map((edge, index) => {
                        const fromNode = knowledgeGraphNodes.find(n => n.id === edge.from);
                        const toNode = knowledgeGraphNodes.find(n => n.id === edge.to);
                        const fromState = capsuleStates[edge.from];
                        const toState = capsuleStates[edge.to];
                        const edgeColor = (fromState === "mastered" && toState === "mastered") ? '#10b981' :
                                       (fromState === "weak" || toState === "weak") ? '#f59e0b' :
                                       (fromState === "viewed" || toState === "viewed") ? '#60a5fa' : '#6b7280';
                        const edgeWidth = (fromState === "mastered" && toState === "mastered") ? '3' : '2';
                        const edgeOpacity = (fromState === "mastered" && toState === "mastered") ? '1' : '0.7';
                        
                        return (
                          <g key={index}>
                            <line
                              x1={fromNode?.x || 0}
                              y1={fromNode?.y || 0}
                              x2={toNode?.x || 0}
                              y2={toNode?.y || 0}
                              stroke={edgeColor}
                              strokeWidth={edgeWidth}
                              className="transition-all duration-500"
                              opacity={edgeOpacity}
                            />
                          </g>
                        );
                      })}
                      
                      {/* Nodes */}
                      {knowledgeGraphNodes.map((node) => {
                        const state = capsuleStates[node.id];
                        const isActive = currentCapsule?.id === node.id;
                        const nodeSize = isActive ? "8" : "6";
                        const nodeColor = state === "mastered" ? "#10b981" : 
                                         state === "weak" ? "#f59e0b" : 
                                         state === "viewed" ? "#3b82f6" : 
                                         isActive ? "url(#nodeGradient)" : "#6b7280";
                        
                        return (
                          <g key={node.id} className="transition-all duration-300">
                            {isActive && (
                              <circle
                                cx={node.x}
                                cy={node.y}
                                r="12"
                                fill="url(#nodeGradient)"
                                opacity="0.3"
                                className="animate-pulse"
                              />
                            )}
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={nodeSize}
                              fill={nodeColor}
                              filter={isActive ? "url(#glow)" : ""}
                              className="transition-all duration-300"
                            />
                            <text
                              x={node.x}
                              y={node.y - 12}
                              textAnchor="middle"
                              className="text-[8px] font-semibold fill-white"
                              style={{ textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}
                            >
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </CardContent>
              </Card>

              {/* Analytics Panel */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Learning Analytics
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Mastered</span>
                        <span className="font-semibold">{Math.round((analytics.mastered / totalCapsules) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analytics.mastered / totalCapsules) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Viewed</span>
                        <span className="font-semibold">{Math.round((analytics.viewed / totalCapsules) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analytics.viewed / totalCapsules) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Weak</span>
                        <span className="font-semibold">{Math.round((analytics.weak / totalCapsules) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-yellow-500 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analytics.weak / totalCapsules) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Locked</span>
                        <span className="font-semibold">{Math.round((analytics.locked / totalCapsules) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-gray-400 h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${(analytics.locked / totalCapsules) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
