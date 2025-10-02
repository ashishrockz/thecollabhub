import React, { useState } from 'react';
import { Search, Building2, Users, Briefcase, TrendingUp, Bell, Menu, X, Plus, Mail, Phone, MapPin, Star, ArrowRight, CheckCircle, Clock, Target, Send, Paperclip, ChevronLeft, Calendar, Award, Globe, ExternalLink, AlertCircle, Check } from 'lucide-react';

// Types
export type Company = {
  id: number;
  name: string;
  logo: string;
  industry: string;
  size: string;
  location: string;
  description: string;
  verified: boolean;
  rating: number;
  requirements: number;
  collaborations: number;
  founded: string;
  website: string;
  email: string;
  phone: string;
  about: string;
  services: string[];
  achievements: string[];
};

export type Requirement = {
  id: number;
  companyId: number;
  companyName: string;
  title: string;
  type: 'Resource' | 'Partnership' | 'Service';
  category: string;
  budget: string;
  duration: string;
  posted: string;
  status: string;
  description: string;
  skills: string[];
  responses: number;
  responsibilities?: string[];
  requirements_list?: string[];
};

export type Notification = {
  id: number;
  type: 'response' | 'message' | 'match' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
};

export type Stat = {
  label: string;
  value: string;
  icon: React.ElementType;
  change: string;
};

export type Message = {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
};

export type NewRequirement = {
  title: string;
  type: 'Resource' | 'Partnership' | 'Service';
  category: string;
  budget: string;
  duration: string;
  description: string;
  skills: string;
};

// Static Data
const companies: Company[] = [
  {
    id: 1,
    name: "TechVentures Inc",
    logo: "TV",
    industry: "Technology",
    size: "50-200",
    location: "San Francisco, CA",
    description: "Leading SaaS solutions provider specializing in AI-driven analytics",
    verified: true,
    rating: 4.8,
    requirements: 3,
    collaborations: 12,
    founded: "2018",
    website: "techventures.com",
    email: "contact@techventures.com",
    phone: "+1 (555) 123-4567",
    about: "TechVentures Inc is a pioneer in AI-driven analytics solutions, helping businesses make data-informed decisions. Our platform processes millions of data points daily, providing actionable insights to over 500 enterprise clients worldwide.",
    services: ["AI Analytics", "Cloud Solutions", "Data Integration", "Machine Learning"],
    achievements: ["Forbes Cloud 100", "Best Startup 2020", "ISO 27001 Certified"]
  },
  {
    id: 2,
    name: "InnovateLabs",
    logo: "IL",
    industry: "Software Development",
    size: "10-50",
    location: "Austin, TX",
    description: "Startup focused on blockchain and decentralized applications",
    verified: true,
    rating: 4.6,
    requirements: 2,
    collaborations: 5,
    founded: "2020",
    website: "innovatelabs.io",
    email: "hello@innovatelabs.io",
    phone: "+1 (555) 234-5678",
    about: "InnovateLabs is building the future of decentralized finance. We create secure, scalable blockchain solutions for enterprises looking to leverage Web3 technologies.",
    services: ["Blockchain Development", "Smart Contracts", "DeFi Solutions", "NFT Platforms"],
    achievements: ["Y Combinator W21", "Ethereum Foundation Grant", "Best Blockchain Startup"]
  },
  {
    id: 3,
    name: "GreenEnergy Solutions",
    logo: "GE",
    industry: "Clean Energy",
    size: "200-500",
    location: "Seattle, WA",
    description: "Renewable energy consulting and implementation services",
    verified: true,
    rating: 4.9,
    requirements: 5,
    collaborations: 18,
    founded: "2015",
    website: "greenenergy.com",
    email: "info@greenenergy.com",
    phone: "+1 (555) 345-6789",
    about: "GreenEnergy Solutions is committed to accelerating the world's transition to sustainable energy. We've installed over 100MW of solar capacity and helped 200+ companies achieve carbon neutrality.",
    services: ["Solar Installation", "Energy Consulting", "Carbon Offsetting", "Sustainability Planning"],
    achievements: ["EPA Green Power Partner", "LEED Certified", "Carbon Neutral Certified"]
  },
  {
    id: 4,
    name: "DataStream Analytics",
    logo: "DS",
    industry: "Data Science",
    size: "20-50",
    location: "Boston, MA",
    description: "Advanced data analytics and machine learning solutions",
    verified: true,
    rating: 4.7,
    requirements: 4,
    collaborations: 9,
    founded: "2019",
    website: "datastream.ai",
    email: "contact@datastream.ai",
    phone: "+1 (555) 456-7890",
    about: "DataStream Analytics empowers businesses with cutting-edge machine learning and predictive analytics. Our solutions have helped clients increase revenue by 25% on average through data-driven decision making.",
    services: ["Predictive Analytics", "ML Model Development", "Data Engineering", "BI Dashboards"],
    achievements: ["Gartner Cool Vendor", "AWS Partner of the Year", "Microsoft Gold Partner"]
  }
];

const requirements: Requirement[] = [
  {
    id: 1,
    companyId: 1,
    companyName: "TechVentures Inc",
    title: "Senior Full-Stack Developer for SaaS Platform",
    type: "Resource",
    category: "Development",
    budget: "$80k - $120k",
    duration: "6 months",
    posted: "2 days ago",
    status: "Open",
    description: "Looking for an experienced full-stack developer proficient in React, Node.js, and cloud technologies to help build our next-generation analytics platform.",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    responses: 12,
    responsibilities: [
      "Design and implement scalable microservices",
      "Build responsive user interfaces with React",
      "Collaborate with product team on feature development",
      "Write clean, maintainable code with tests"
    ],
    requirements_list: [
      "5+ years of full-stack development experience",
      "Expert knowledge of React and Node.js",
      "Experience with AWS services (Lambda, S3, RDS)",
      "Strong communication skills"
    ]
  },
  {
    id: 2,
    companyId: 3,
    companyName: "GreenEnergy Solutions",
    title: "Partnership for Solar Panel Installation",
    type: "Partnership",
    category: "Collaboration",
    budget: "Equity-based",
    duration: "Long-term",
    posted: "5 days ago",
    status: "Open",
    description: "Seeking installation partners for commercial solar projects across the West Coast. Great opportunity for growth-focused companies.",
    skills: ["Solar Installation", "Project Management", "Licensing"],
    responses: 8,
    responsibilities: [
      "Execute solar panel installations for commercial clients",
      "Manage installation teams and timelines",
      "Ensure compliance with local regulations",
      "Provide warranty and maintenance services"
    ],
    requirements_list: [
      "Licensed solar installation company",
      "5+ years in commercial solar projects",
      "Teams available in CA, OR, or WA",
      "Proven safety record"
    ]
  },
  {
    id: 3,
    companyId: 2,
    companyName: "InnovateLabs",
    title: "Blockchain Security Audit Services",
    type: "Service",
    category: "Security",
    budget: "$15k - $25k",
    duration: "1 month",
    posted: "1 week ago",
    status: "Open",
    description: "Need comprehensive security audit for our DeFi smart contracts before mainnet launch. Critical for our Q4 deployment.",
    skills: ["Solidity", "Security Auditing", "DeFi"],
    responses: 5,
    responsibilities: [
      "Conduct thorough smart contract security audit",
      "Identify vulnerabilities and attack vectors",
      "Provide detailed report with recommendations",
      "Support remediation efforts"
    ],
    requirements_list: [
      "Proven track record in smart contract audits",
      "Experience with DeFi protocols",
      "Familiarity with common vulnerabilities",
      "Fast turnaround capability"
    ]
  }
];

const notifications: Notification[] = [
  {
    id: 1,
    type: "response",
    title: "New response to your requirement",
    message: "InnovateLabs responded to 'Senior Full-Stack Developer'",
    time: "5 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "message",
    title: "New message from TechVentures Inc",
    message: "We'd like to discuss potential collaboration",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    type: "match",
    title: "Perfect match found!",
    message: "Your profile matches 'Blockchain Security Audit' requirement",
    time: "2 hours ago",
    read: true
  }
];

const stats: Stat[] = [
  { label: "Active Companies", value: "2,847", icon: Building2, change: "+12%" },
  { label: "Open Requirements", value: "1,234", icon: Briefcase, change: "+8%" },
  { label: "Successful Matches", value: "5,692", icon: CheckCircle, change: "+23%" },
  { label: "Total Collaborations", value: "$45M", icon: TrendingUp, change: "+18%" }
];

export default function CollaborationPlatform() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPostRequirement, setShowPostRequirement] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any | null>(null);
  const [notificationList, setNotificationList] = useState(notifications);
  
  const [messages, setMessages] = useState<Record<any, Message[]>>({
    1: [
      { id: 1, sender: "them", text: "Hi! We're interested in your Full-Stack Developer requirement.", time: "10:30 AM" },
      { id: 2, sender: "me", text: "Great! Can you share your team's experience?", time: "10:32 AM" },
      { id: 3, sender: "them", text: "We have 5 senior developers with React and Node.js expertise. Would you like to schedule a call?", time: "10:35 AM" }
    ],
    2: [
      { id: 1, sender: "them", text: "Hello! We saw your solar installation requirement.", time: "Yesterday" },
      { id: 2, sender: "me", text: "Thanks for reaching out! What's your experience in commercial projects?", time: "Yesterday" }
    ]
  });
  const [currentMessage, setCurrentMessage] = useState('');

  const [newRequirement, setNewRequirement] = useState<NewRequirement>({
    title: '',
    type: 'Resource',
    category: 'Development',
    budget: '',
    duration: '',
    description: '',
    skills: ''
  });

  const unreadCount = notificationList.filter(n => !n.read).length;

  const filteredRequirements = requirements.filter(req => {
    const matchesCategory = filterCategory === 'all' || req.category === filterCategory;
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         req.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredCompanies = companies.filter(company => {
    return company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
           company.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSendMessage = () => {
    if (!currentMessage.trim() || !selectedChat) return;
    
    const newMsg = {
      id: messages[selectedChat].length + 1,
      sender: "me",
      text: currentMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages({
      ...messages,
      [selectedChat]: [...messages[selectedChat], newMsg]
    });
    setCurrentMessage('');
  };

  const handlePostRequirement = () => {
    if (!newRequirement.title || !newRequirement.description) return;
    alert('Requirement posted successfully!');
    setShowPostRequirement(false);
    setNewRequirement({
      title: '',
      type: 'Resource',
      category: 'Development',
      budget: '',
      duration: '',
      description: '',
      skills: ''
    });
  };

  const markNotificationAsRead = (id:any) => {
    setNotificationList(notificationList.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotificationList(notificationList.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900">CollabHub</h1>
                <p className="text-xs text-slate-500 hidden sm:block">B2B Collaboration Platform</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-1">
              {['dashboard', 'companies', 'requirements', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 max-h-96 overflow-y-auto">
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="divide-y divide-slate-100">
                      {notificationList.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-4 hover:bg-slate-50 cursor-pointer transition-colors ${
                            !notif.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              notif.type === 'response' ? 'bg-blue-100' :
                              notif.type === 'message' ? 'bg-purple-100' :
                              notif.type === 'match' ? 'bg-green-100' :
                              'bg-slate-100'
                            }`}>
                              {notif.type === 'response' && <Briefcase className="w-5 h-5 text-blue-600" />}
                              {notif.type === 'message' && <Mail className="w-5 h-5 text-purple-600" />}
                              {notif.type === 'match' && <Target className="w-5 h-5 text-green-600" />}
                              {notif.type === 'system' && <Bell className="w-5 h-5 text-slate-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm text-slate-900">{notif.title}</p>
                              <p className="text-sm text-slate-600 truncate">{notif.message}</p>
                              <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setShowPostRequirement(true)}
                className="hidden sm:flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:shadow-lg transition-all text-sm sm:text-base"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden md:inline">Post Requirement</span>
                <span className="md:hidden">Post</span>
              </button>
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="flex flex-col p-4 space-y-2">
              {['dashboard', 'companies', 'requirements', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium capitalize text-left ${
                    activeTab === tab
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
              <button 
                onClick={() => {
                  setShowPostRequirement(true);
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-left"
              >
                Post Requirement
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 sm:space-y-8">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to CollabHub</h2>
                <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
                  Connect with companies, share requirements, and build meaningful partnerships
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => setActiveTab('companies')}
                    className="px-6 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:shadow-lg transition-all text-center"
                  >
                    Explore Companies
                  </button>
                  <button 
                    onClick={() => setActiveTab('requirements')}
                    className="px-6 py-3 bg-blue-500 bg-opacity-30 text-white rounded-lg font-semibold hover:bg-opacity-40 transition-all text-center"
                  >
                    View Requirements
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${
                      idx === 0 ? 'from-blue-500 to-blue-600' :
                      idx === 1 ? 'from-purple-500 to-purple-600' :
                      idx === 2 ? 'from-green-500 to-green-600' :
                      'from-orange-500 to-orange-600'
                    } rounded-lg flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <span className="text-green-600 text-xs sm:text-sm font-semibold">{stat.change}</span>
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Latest Requirements</h3>
                <button 
                  onClick={() => setActiveTab('requirements')}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1 text-sm sm:text-base"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid gap-4">
                {requirements.slice(0, 3).map((req) => (
                  <div
                    key={req.id}
                    className="border border-slate-200 rounded-lg p-4 sm:p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedRequirement(req)}
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          req.type === 'Resource' ? 'bg-blue-100 text-blue-700' :
                          req.type === 'Partnership' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {req.type}
                        </span>
                        <span className="text-xs text-slate-500">{req.posted}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{req.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600">{req.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {req.skills.slice(0, 3).map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-slate-100 gap-2">
                        <span className="text-xs sm:text-sm text-slate-600">{req.companyName}</span>
                        <span className="text-xs sm:text-sm font-semibold text-blue-600">{req.budget}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Companies View */}
        {activeTab === 'companies' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Companies</h2>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {filteredCompanies.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No companies found</h3>
                <p className="text-slate-600">Try adjusting your search query</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredCompanies.map((company) => (
                  <div 
                    key={company.id} 
                    onClick={() => setSelectedCompany(company)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-4 sm:p-6 cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg sm:text-xl">{company.logo}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-slate-900 truncate text-sm sm:text-base">{company.name}</h3>
                          {company.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold text-slate-700">{company.rating}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2">{company.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-slate-500 mb-3">
                          <span className="flex items-center space-x-1">
                            <Building2 className="w-3 h-3" />
                            <span>{company.industry}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Users className="w-3 h-3" />
                            <span>{company.size}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate max-w-[150px]">{company.location}</span>
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex gap-3 text-xs sm:text-sm">
                            <span className="text-slate-600">
                              <span className="font-semibold text-slate-900">{company.requirements}</span> Req
                            </span>
                            <span className="text-slate-600">
                              <span className="font-semibold text-slate-900">{company.collaborations}</span> Proj
                            </span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Requirements View */}
        {activeTab === 'requirements' && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">All Requirements</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search requirements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="Development">Development</option>
                  <option value="Collaboration">Collaboration</option>
                  <option value="Security">Security</option>
                </select>
              </div>
            </div>

            {filteredRequirements.length === 0 ? (
              <div className="bg-white rounded-xl p-12 text-center">
                <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No requirements found</h3>
                <p className="text-slate-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {filteredRequirements.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all p-4 sm:p-6 cursor-pointer"
                    onClick={() => setSelectedRequirement(req)}
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          req.type === 'Resource' ? 'bg-blue-100 text-blue-700' :
                          req.type === 'Partnership' ? 'bg-purple-100 text-purple-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {req.type}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                          {req.category}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{req.posted}</span>
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">{req.title}</h3>
                      <p className="text-sm sm:text-base text-slate-600">{req.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {req.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm rounded-lg font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs sm:text-sm">
                          <span className="text-slate-600">
                            <span className="font-semibold text-slate-900">{req.companyName}</span>
                          </span>
                          <span className="text-slate-600">
                            Budget: <span className="font-semibold text-slate-900">{req.budget}</span>
                          </span>
                          <span className="text-slate-600">
                            Duration: <span className="font-semibold text-slate-900">{req.duration}</span>
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <span className="text-xs sm:text-sm text-slate-500">{req.responses} responses</span>
                          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                            Respond
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Messages View */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[calc(100vh-12rem)] sm:h-[600px]">
            <div className="flex h-full">
              {/* Chat List */}
              <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 border-r border-slate-200 flex-col`}>
                <div className="p-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900">Messages</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {companies.slice(0, 2).map((company) => (
                    <div
                      key={company.id}
                      onClick={() => setSelectedChat(company.id)}
                      className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedChat === company.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{company.logo}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-slate-900 truncate text-sm">{company.name}</h4>
                            {company.id === 1 && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 truncate">
                            {messages[company.id] ? messages[company.id][messages[company.id].length - 1].text : 'No messages yet'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              {selectedChat ? (
                <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button 
                        onClick={() => setSelectedChat(null)}
                        className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                      </button>
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">{companies.find(c => c.id === selectedChat)?.logo}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm sm:text-base">{companies.find(c => c.id === selectedChat)?.name}</h4>
                        <p className="text-xs text-green-600">● Online</p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages[selectedChat]?.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${
                          msg.sender === 'me' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 text-slate-900'
                        } rounded-lg p-3`}>
                          <p className="text-xs sm:text-sm">{msg.text}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'me' ? 'text-blue-100' : 'text-slate-500'
                          }`}>
                            {msg.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-3 sm:p-4 border-t border-slate-200">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden sm:block">
                        <Paperclip className="w-5 h-5 text-slate-600" />
                      </button>
                      <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-3 sm:px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <button 
                        onClick={handleSendMessage}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex flex-1 items-center justify-center">
                  <div className="text-center">
                    <Mail className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Select a conversation</h3>
                    <p className="text-slate-600">Choose a company to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Company Profile Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setSelectedCompany(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="relative h-24 sm:h-32 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-2xl">
              <button
                onClick={() => setSelectedCompany(null)}
                className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Company Info */}
            <div className="px-4 sm:px-8 pb-6 sm:pb-8">
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 -mt-12 sm:-mt-16 mb-6">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white font-bold text-3xl sm:text-4xl">{selectedCompany.logo}</span>
                </div>
                <div className="flex-1 mt-12 sm:mt-16 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{selectedCompany.name}</h2>
                    {selectedCompany.verified && (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm sm:text-base text-slate-600 mb-4">
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-semibold">{selectedCompany.rating}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center space-x-1">
                      <Building2 className="w-4 h-4" />
                      <span>{selectedCompany.industry}</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedCompany.location}</span>
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
                    <button 
                      onClick={() => {
                        setSelectedChat(selectedCompany.id);
                        setActiveTab('messages');
                        setSelectedCompany(null);
                      }}
                      className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Send Message
                    </button>
                    <button className="w-full sm:w-auto px-6 py-2 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                      Save Company
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs Content */}
              <div className="space-y-6">
                {/* About */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">About</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{selectedCompany.about}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2 text-sm sm:text-base">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span>Founded</span>
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">{selectedCompany.founded}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2 text-sm sm:text-base">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span>Company Size</span>
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">{selectedCompany.size} employees</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2 text-sm sm:text-base">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <span>Website</span>
                    </h4>
                    <a href={`https://${selectedCompany.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center space-x-1 text-sm sm:text-base">
                      <span className="truncate">{selectedCompany.website}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center space-x-2 text-sm sm:text-base">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <span>Email</span>
                    </h4>
                    <a href={`mailto:${selectedCompany.email}`} className="text-blue-600 hover:text-blue-700 text-sm sm:text-base truncate block">
                      {selectedCompany.email}
                    </a>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompany.services.map((service, idx) => (
                      <span key={idx} className="px-3 sm:px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-xs sm:text-sm">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">Achievements</h3>
                  <div className="space-y-2">
                    {selectedCompany.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-slate-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">{selectedCompany.requirements}</p>
                    <p className="text-xs sm:text-sm text-slate-600">Active Requirements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">{selectedCompany.collaborations}</p>
                    <p className="text-xs sm:text-sm text-slate-600">Collaborations</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-slate-900">{selectedCompany.rating}</p>
                    <p className="text-xs sm:text-sm text-slate-600">Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Requirement Detail Modal */}
      {selectedRequirement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRequirement(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedRequirement.type === 'Resource' ? 'bg-blue-100 text-blue-700' :
                      selectedRequirement.type === 'Partnership' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {selectedRequirement.type}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {selectedRequirement.category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{selectedRequirement.title}</h2>
                  <p className="text-sm sm:text-base text-slate-600">{selectedRequirement.companyName}</p>
                </div>
                <button
                  onClick={() => setSelectedRequirement(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Description</h3>
                <p className="text-sm sm:text-base text-slate-600">{selectedRequirement.description}</p>
              </div>
              
              {selectedRequirement.responsibilities && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedRequirement.responsibilities.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm sm:text-base text-slate-600">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedRequirement.requirements_list && (
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedRequirement.requirements_list.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2 text-sm sm:text-base text-slate-600">
                        <Check className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-slate-900 mb-2 text-sm sm:text-base">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRequirement.skills.map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm rounded-lg font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm">Budget</h3>
                  <p className="text-sm text-slate-600">{selectedRequirement.budget}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm">Duration</h3>
                  <p className="text-sm text-slate-600">{selectedRequirement.duration}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm">Posted</h3>
                  <p className="text-sm text-slate-600">{selectedRequirement.posted}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm">Responses</h3>
                  <p className="text-sm text-slate-600">{selectedRequirement.responses} companies</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
                  Submit Proposal
                </button>
                <button className="px-6 py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-sm sm:text-base">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Requirement Modal */}
      {showPostRequirement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowPostRequirement(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Post New Requirement</h2>
                <button
                  onClick={() => setShowPostRequirement(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Requirement Title *
                </label>
                <input
                  type="text"
                  value={newRequirement.title}
                  onChange={(e) => setNewRequirement({...newRequirement, title: e.target.value})}
                  placeholder="e.g., Senior Full-Stack Developer"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Type *
                  </label>
                  <select
                    value={newRequirement.type}
                    onChange={(e) =>
                      setNewRequirement({
                        ...newRequirement,
                        type: e.target.value as 'Resource' | 'Partnership' | 'Service'
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="Resource">Resource</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Service">Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Category *
                  </label>
                  <select
                    value={newRequirement.category}
                    onChange={(e) => setNewRequirement({...newRequirement, category: e.target.value})}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="Development">Development</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Security">Security</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Description *
                </label>
                <textarea
                  value={newRequirement.description}
                  onChange={(e) => setNewRequirement({...newRequirement, description: e.target.value})}
                  placeholder="Describe your requirement in detail..."
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Budget
                  </label>
                  <input
                    type="text"
                    value={newRequirement.budget}
                    onChange={(e) => setNewRequirement({...newRequirement, budget: e.target.value})}
                    placeholder="e.g., $50k - $80k"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newRequirement.duration}
                    onChange={(e) => setNewRequirement({...newRequirement, duration: e.target.value})}
                    placeholder="e.g., 3 months"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Required Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={newRequirement.skills}
                  onChange={(e) => setNewRequirement({...newRequirement, skills: e.target.value})}
                  placeholder="e.g., React, Node.js, AWS"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              <div className="flex items-start space-x-2 p-4 bg-blue-50 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">Review before posting</p>
                  <p className="text-xs sm:text-sm text-blue-700">Make sure all information is accurate. Your requirement will be visible to all companies on the platform.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={handlePostRequirement}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  disabled={!newRequirement.title || !newRequirement.description}
                >
                  Post Requirement
                </button>
                <button 
                  onClick={() => setShowPostRequirement(false)}
                  className="px-6 py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}