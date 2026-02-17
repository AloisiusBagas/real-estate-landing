import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { motion, useInView } from "framer-motion";
import { 
  Home, 
  Menu, 
  X, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Phone, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Button } from "./components/ui/button";

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

// Property data
const featuredProperties = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075",
    price: "$930,000",
    address: "789 Lakefront Street",
    city: "San Francisco",
    state: "CA 94122",
    sqft: "2,856",
    beds: 5,
    baths: 3,
    featured: true
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
    price: "$720,000",
    address: "456 Palm Avenue",
    city: "Los Angeles",
    state: "CA 90210",
    sqft: "2,100",
    beds: 4,
    baths: 2
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070",
    price: "$1,250,000",
    address: "123 Ocean Drive",
    city: "Miami",
    state: "FL 33139",
    sqft: "3,400",
    beds: 6,
    baths: 4
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    price: "$580,000",
    address: "321 Mountain View",
    city: "Denver",
    state: "CO 80202",
    sqft: "1,850",
    beds: 3,
    baths: 2
  }
];

const showcaseProperties = {
  buy: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071",
      location: "Atlanta, GA",
      sqft: "3,126",
      beds: 4,
      baths: 3
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070",
      location: "San Francisco, CA",
      sqft: "2,254",
      beds: 3,
      baths: 2
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070",
      location: "Boston, MA",
      sqft: "3,100",
      beds: 5,
      baths: 3
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2070",
      location: "Austin, TX",
      sqft: "2,800",
      beds: 4,
      baths: 3
    }
  ],
  rent: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=2070",
      location: "New York, NY",
      sqft: "1,200",
      beds: 2,
      baths: 1
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070",
      location: "Chicago, IL",
      sqft: "1,500",
      beds: 2,
      baths: 2
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070",
      location: "Seattle, WA",
      sqft: "1,800",
      beds: 3,
      baths: 2
    }
  ],
  sold: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084",
      location: "Phoenix, AZ",
      sqft: "2,400",
      beds: 4,
      baths: 2
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070",
      location: "Portland, OR",
      sqft: "2,100",
      beds: 3,
      baths: 2
    }
  ]
};

// Header Component
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "header-scrolled" : "header-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="/" 
            data-testid="logo"
            className={`font-bold text-2xl tracking-tight font-['Outfit'] transition-colors ${
              isScrolled ? "text-[#1A1A1A]" : "text-white"
            }`}
          >
            HOUSFY
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <button
              onClick={() => scrollToSection("about")}
              data-testid="nav-about"
              className={`text-sm font-medium transition-colors hover:text-[#C19A6B] ${
                isScrolled ? "text-[#1A1A1A]" : "text-white"
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("properties")}
              data-testid="nav-properties"
              className={`text-sm font-medium transition-colors hover:text-[#C19A6B] ${
                isScrolled ? "text-[#1A1A1A]" : "text-white"
              }`}
            >
              Properties
            </button>
            <button
              onClick={() => scrollToSection("showcase")}
              data-testid="nav-services"
              className={`text-sm font-medium transition-colors hover:text-[#C19A6B] ${
                isScrolled ? "text-[#1A1A1A]" : "text-white"
              }`}
            >
              Services
            </button>
          </div>

          {/* Contact Button */}
          <button
            onClick={() => scrollToSection("contact")}
            data-testid="nav-contact-btn"
            className="hidden md:block gold-button bg-[#C19A6B] text-white rounded-full px-6 py-2.5 text-sm font-semibold"
          >
            Contact Us
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-btn"
            className={`md:hidden p-2 ${isScrolled ? "text-[#1A1A1A]" : "text-white"}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          data-testid="mobile-menu"
          className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-100"
        >
          <div className="px-6 py-6 space-y-4">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left text-[#1A1A1A] font-medium py-2 hover:text-[#C19A6B]"
            >
              About Us
            </button>
            <button
              onClick={() => scrollToSection("properties")}
              className="block w-full text-left text-[#1A1A1A] font-medium py-2 hover:text-[#C19A6B]"
            >
              Properties
            </button>
            <button
              onClick={() => scrollToSection("showcase")}
              className="block w-full text-left text-[#1A1A1A] font-medium py-2 hover:text-[#C19A6B]"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full bg-[#C19A6B] text-white rounded-full py-3 text-center font-semibold mt-4"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
      )}
    </header>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section data-testid="hero-section" className="relative h-screen min-h-[700px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2074"
          alt="Luxury interior"
          className="w-full h-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl"
        >
          <h1 
            data-testid="hero-title"
            className="font-['Outfit'] text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Find Your Dream<br />Home Today
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
            Welcome to our real estate agency, where your dream home awaits. 
            Let us help you find the perfect property for you.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              data-testid="hero-view-btn"
              className="bg-white text-[#1A1A1A] rounded-full px-8 py-4 font-semibold hover:bg-gray-100 transition-all active:scale-95"
            >
              View
            </button>
            <button
              data-testid="hero-learn-btn"
              className="border-2 border-white text-white rounded-full px-8 py-4 font-semibold hover:bg-white hover:text-[#1A1A1A] transition-all"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        data-testid="stats-card"
        className="stats-card hidden md:block absolute -bottom-16 right-6 lg:right-20 bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full z-20"
      >
        <h3 className="font-['Outfit'] text-lg font-semibold text-[#1A1A1A] mb-2">Who We Are?</h3>
        <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
          We offer a range of services including buying, selling, and property management.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="font-['Outfit'] text-3xl font-bold text-[#C19A6B]">80+</div>
            <div className="text-xs text-[#6B7280] mt-1">Premium House</div>
          </div>
          <div className="text-center">
            <div className="font-['Outfit'] text-3xl font-bold text-[#C19A6B]">500+</div>
            <div className="text-xs text-[#6B7280] mt-1">Agent House</div>
          </div>
          <div className="text-center">
            <div className="font-['Outfit'] text-3xl font-bold text-[#C19A6B]">2K+</div>
            <div className="text-xs text-[#6B7280] mt-1">Happy Clients</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Animation wrapper component
const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Featured Properties Section
const FeaturedProperties = () => {
  return (
    <section id="properties" data-testid="properties-section" className="py-24 md:py-32 mt-16 md:mt-0 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="font-['Outfit'] text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-4">
                Discover Your Perfect<br />Property Match
              </h2>
            </div>
            <p className="text-[#6B7280] max-w-md mt-4 md:mt-0">
              Discover Your Perfect Property Match with our expert team, dedicated 
              to finding the ideal home or investment in California, San Francisco, 
              and Miami.
            </p>
          </div>
        </AnimatedSection>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Large Card */}
          <AnimatedSection className="md:col-span-7">
            <div 
              data-testid="property-card-featured"
              className="property-card group relative overflow-hidden rounded-2xl bg-white h-full"
            >
              <div className="aspect-[4/3] md:aspect-auto md:h-[500px] overflow-hidden">
                <img
                  src={featuredProperties[0].image}
                  alt={featuredProperties[0].address}
                  className="property-card-image w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="bg-[#C19A6B] text-white px-4 py-2 rounded-lg inline-block mb-3">
                  <span className="font-['Outfit'] text-2xl font-bold">{featuredProperties[0].price}</span>
                </div>
                <div className="text-white">
                  <p className="font-medium">{featuredProperties[0].address}</p>
                  <p className="text-white/70 text-sm">{featuredProperties[0].city}, {featuredProperties[0].state}</p>
                </div>
                <div className="flex gap-6 mt-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <Square size={14} /> {featuredProperties[0].sqft} Sq Ft
                  </span>
                  <span className="flex items-center gap-1">
                    <Bed size={14} /> {featuredProperties[0].beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={14} /> {featuredProperties[0].baths} Baths
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Right Column Cards */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6">
            {featuredProperties.slice(1, 4).map((property, index) => (
              <AnimatedSection key={property.id}>
                <div 
                  data-testid={`property-card-${property.id}`}
                  className="property-card group relative overflow-hidden rounded-2xl bg-white"
                >
                  <div className="aspect-[4/3] md:h-[152px] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.address}
                      className="property-card-image w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
                      <p className="font-['Outfit'] font-bold text-[#1A1A1A]">{property.price}</p>
                      <p className="text-xs text-[#6B7280]">{property.city}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  return (
    <section id="about" data-testid="about-section" className="bg-[#121212] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <AnimatedSection>
            <div>
              <h2 className="font-['Outfit'] text-4xl md:text-5xl font-semibold text-white mb-6">
                About <span className="text-[#C19A6B]">Us</span>
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  HOUSFY, your trusted partner in the world of real estate. 
                  We take pride in offering top-notch services for buying, selling, 
                  and renting properties in the most sought-after areas—California, 
                  San Francisco, and Miami.
                </p>
                <p>
                  Our agency specializes in finding the perfect homes 
                  and commercial properties for our clients. We believe that every 
                  transaction marks the beginning of a long-term relationship.
                </p>
                <p>
                  Our team of experienced agents is committed to guiding you 
                  through every step of the process, from the initial consultation to 
                  closing the deal. Your satisfaction is our top priority, and we strive 
                  to exceed your expectations with transparency, professionalism, 
                  and attention to detail.
                </p>
              </div>
              <button 
                data-testid="about-learn-more-btn"
                className="mt-8 gold-button bg-[#C19A6B] text-white rounded-full px-8 py-4 font-semibold inline-flex items-center gap-2"
              >
                Learn More <ArrowRight size={18} />
              </button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7937959/pexels-photo-7937959.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                alt="Happy couple receiving keys"
                className="rounded-2xl w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#C19A6B] text-white p-6 rounded-xl hidden md:block">
                <div className="font-['Outfit'] text-3xl font-bold">15+</div>
                <div className="text-sm">Years Experience</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Property Showcase Section
const PropertyShowcase = () => {
  const [activeTab, setActiveTab] = useState("buy");
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const properties = showcaseProperties[activeTab];
  
  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.children[0]?.offsetWidth || 0;
      const gap = 24;
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(properties.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <section id="showcase" data-testid="showcase-section" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-['Outfit'] text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-8">
              Property Showcase
            </h2>
            
            {/* Tabs */}
            <div className="flex justify-center items-center gap-4 mb-8 flex-wrap">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList className="bg-[#F8F9FA] p-1 rounded-full">
                  <TabsTrigger 
                    value="buy" 
                    data-testid="tab-buy"
                    className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-[#C19A6B] data-[state=active]:text-white"
                  >
                    Buy
                  </TabsTrigger>
                  <TabsTrigger 
                    value="rent"
                    data-testid="tab-rent"
                    className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-[#C19A6B] data-[state=active]:text-white"
                  >
                    Rent
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sold"
                    data-testid="tab-sold"
                    className="rounded-full px-6 py-2 text-sm font-medium data-[state=active]:bg-[#C19A6B] data-[state=active]:text-white"
                  >
                    Sold
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Search Input */}
              <div className="relative">
                <Input 
                  placeholder="Enter City or Zip Code" 
                  data-testid="showcase-search"
                  className="rounded-full pl-4 pr-12 py-2 w-64 border-gray-200"
                />
                <button 
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#C19A6B] text-white p-2 rounded-full"
                >
                  <MapPin size={16} />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((property, index) => (
              <AnimatedSection key={property.id}>
                <div 
                  data-testid={`showcase-card-${property.id}`}
                  className="property-card flex-shrink-0 w-[300px] md:w-[350px] snap-start rounded-2xl overflow-hidden bg-white shadow-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.location}
                      className="property-card-image w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 bg-white">
                    <h4 className="font-['Outfit'] font-semibold text-lg text-[#1A1A1A] mb-3">
                      {property.location}
                    </h4>
                    <div className="flex gap-4 text-[#6B7280] text-sm">
                      <span className="flex items-center gap-1">
                        <Square size={14} /> {property.sqft} Sq Ft
                      </span>
                      <span className="flex items-center gap-1">
                        <Bed size={14} /> {property.beds} Beds
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath size={14} /> {property.baths} Baths
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            data-testid="carousel-prev"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-[#C19A6B] hover:text-white transition-colors"
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            data-testid="carousel-next"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden md:flex w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg hover:bg-[#C19A6B] hover:text-white transition-colors"
            disabled={currentIndex === properties.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "w-8 bg-[#C19A6B]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <AnimatedSection>
            <div>
              <h2 className="font-['Outfit'] text-4xl md:text-5xl font-semibold text-[#1A1A1A] mb-6">
                Get In Touch
              </h2>
              <p className="text-[#6B7280] mb-8 leading-relaxed">
                Have questions about a property or want to schedule a viewing? 
                Reach out to us and our team will get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#C19A6B]/10 rounded-full flex items-center justify-center">
                    <Phone className="text-[#C19A6B]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Phone</p>
                    <p className="font-medium text-[#1A1A1A]">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#C19A6B]/10 rounded-full flex items-center justify-center">
                    <Mail className="text-[#C19A6B]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Email</p>
                    <p className="font-medium text-[#1A1A1A]">contact@housfy.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#C19A6B]/10 rounded-full flex items-center justify-center">
                    <MapPin className="text-[#C19A6B]" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-[#6B7280]">Address</p>
                    <p className="font-medium text-[#1A1A1A]">123 Market Street, San Francisco, CA 94102</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Name</label>
                  <Input
                    type="text"
                    data-testid="contact-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="contact-input w-full rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Email</label>
                  <Input
                    type="email"
                    data-testid="contact-email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="contact-input w-full rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Phone</label>
                  <Input
                    type="tel"
                    data-testid="contact-phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="contact-input w-full rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#1A1A1A] mb-2">Message</label>
                  <Textarea
                    data-testid="contact-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your dream home..."
                    rows={4}
                    className="contact-input w-full rounded-lg resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  data-testid="contact-submit"
                  className="w-full gold-button bg-[#C19A6B] hover:bg-[#D4AF37] text-white rounded-full py-4 font-semibold"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

// Footer Section
const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer data-testid="footer" className="bg-[#1A1A1A] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-['Outfit'] text-2xl font-bold mb-4">HOUSFY</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Your trusted partner in finding the perfect home. 
              Premium real estate services in California, San Francisco, and Miami.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C19A6B] transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C19A6B] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C19A6B] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#C19A6B] transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-['Outfit'] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button onClick={() => scrollToSection("about")} className="footer-link text-gray-400 hover:text-[#C19A6B] text-sm">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("properties")} className="footer-link text-gray-400 hover:text-[#C19A6B] text-sm">
                  Properties
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("showcase")} className="footer-link text-gray-400 hover:text-[#C19A6B] text-sm">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection("contact")} className="footer-link text-gray-400 hover:text-[#C19A6B] text-sm">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-['Outfit'] font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><span className="text-gray-400 text-sm">Buy Property</span></li>
              <li><span className="text-gray-400 text-sm">Sell Property</span></li>
              <li><span className="text-gray-400 text-sm">Rent Property</span></li>
              <li><span className="text-gray-400 text-sm">Property Management</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-['Outfit'] font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Market Street, San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" />
                <span>contact@housfy.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 HOUSFY. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-[#C19A6B] text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-[#C19A6B] text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroSection />
        <FeaturedProperties />
        <AboutSection />
        <PropertyShowcase />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
