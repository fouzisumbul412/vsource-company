import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import JoinUsPage from "./pages/JoinUsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import DelayedPopup from "./components/DelayedPopup";
// import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ContactBar from "./components/ContactBar";
import { useEffect, useRef } from "react";
import FaqSection from "./components/home/FaqSection";
const queryClient = new QueryClient();

const App = () => {
  const faqRef = useRef<HTMLDivElement>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage faqRef={faqRef} />} />
                <Route path="/about-us" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <ContactBar />
            <Footer />
            <DelayedPopup />
            {/* <WhatsAppButton /> */}
            <ScrollToTopButton />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
