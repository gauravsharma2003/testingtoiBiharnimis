import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { trackUserClick, trackUserShown } from "../../utils/analytics";
import CTAButton from "../shared/CTAButton";
import ShareCard from "../shared/ShareCard";
import { HTML_BASE_URL } from "../../constants/gameData";

const ResultScreen = ({
  nodeData,
  nodeId,
  candidateKey,
  //   choiceHistory,
  //   elapsedTime,
  onBackToMenu,
  onPlayAgain,
}) => {
  const navigate = useNavigate();
  const [isSharing, setIsSharing] = useState(false);
  const [useFallbackShare, setUseFallbackShare] = useState(false);
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      trackUserShown({ page_template: "result", section: "toisimulationroom" });
    }
  }, []);

  const handleShare = async () => {
    // Prevent multiple clicks
    if (isSharing) return;

    setIsSharing(true);
    trackUserClick({ label: "share_attempt", candidateKey });

    try {
      // Get the ending node ID from props
      const endNodeId = nodeId || "default";

      // Construct the share URL pointing to the OG-tagged HTML file
      const shareUrl = `${HTML_BASE_URL}/${endNodeId}.html`;

      // Check if the HTML file exists before attempting to share
      const htmlFileExists = await fetch(shareUrl, { method: "HEAD" })
        .then((response) => response.ok)
        .catch(() => false);

      if (!htmlFileExists) {
        // HTML file doesn't exist, use canvas capture fallback
        console.log("HTML file not found, using canvas capture fallback");
        trackUserClick({
          label: "share_no_html_fallback_to_canvas",
          candidateKey,
        });
        setUseFallbackShare(true);
        // Keep isSharing true to trigger ShareCard component
        setTimeout(() => {
          setIsSharing(false);
          setUseFallbackShare(false);
        }, 5000);
        return;
      }

      // Get result text for share message
      const resultMatch = nodeData.text.match(
        /^(VICTORY!|DEFEAT|NARROW VICTORY|LANDSLIDE VICTORY|NARROW DEFEAT|PYRRHIC VICTORY)/
      );
      const result = resultMatch ? resultMatch[1] : "RESULT";

      // Capitalize first letter of candidate name
      const capitalizedCandidate = candidateKey.charAt(0).toUpperCase() + candidateKey.slice(1);

      // Determine share text based on victory or defeat
      const isVictory = result.includes("VICTORY");
      const shareText = isVictory
        ? `I just played the TOI Bihar Election Simulation Game as ${capitalizedCandidate} — VICTORY! 🏆🎉\n👉🏻Try it here:`
        : `I just played the Bihar Election Simulation Game as ${capitalizedCandidate} — and I almost won.⭐️\n\n👉🏻Try it here:`;

      // Check if Web Share API is supported
      if (navigator.share) {
        await navigator.share({
          title: "TOI Bihar Election Simulation",
          text: shareText,
          url: shareUrl,
        });
        console.log("Content shared successfully!");
        trackUserClick({
          label: "share_success",
          method: "web_share_api",
          candidateKey,
        });
        setIsSharing(false);
      } else {
        // Fallback: Open WhatsApp share link
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          shareText + "\n\n" + shareUrl
        )}`;
        window.open(whatsappUrl, "_blank");
        trackUserClick({
          label: "share_success",
          method: "whatsapp_fallback",
          candidateKey,
        });
        setIsSharing(false);
      }
    } catch (error) {
      if (error.name === "AbortError") {
        // User cancelled the share dialog
        console.log("Share cancelled by user");
        setIsSharing(false);
      } else {
        // Error occurred, fall back to canvas capture method
        console.error(
          "URL share failed, falling back to canvas capture:",
          error
        );
        trackUserClick({ label: "share_fallback_to_canvas", candidateKey });
        setUseFallbackShare(true);
        // Keep isSharing true to trigger ShareCard component
        setTimeout(() => {
          setIsSharing(false);
          setUseFallbackShare(false);
        }, 5000);
      }
    }
  };

  const handleBackToMenu = () => {
    trackUserClick({ label: "return_to_menu" });
    onBackToMenu();
  };

  const handlePlayAgain = () => {
    trackUserClick({ label: "restart" });
    onPlayAgain();
  };

  const resultMatch = nodeData.text.match(
    /^(VICTORY!|DEFEAT|NARROW VICTORY|LANDSLIDE VICTORY|NARROW DEFEAT|PYRRHIC VICTORY)/
  );
  const result = resultMatch ? resultMatch[1] : "RESULT";

  const getResultIcon = (result) => {
    if (result.includes("VICTORY")) return "emoji_events";
    if (result.includes("DEFEAT")) return "sentiment_dissatisfied";
    return "help_outline";
  };

  const getResultColor = (result) => {
    if (result.includes("VICTORY")) return "text-black";
    if (result.includes("DEFEAT")) return "text-gray-600";
    return "text-gray-800";
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => navigate("/")}
            className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition"
          >
            <span className="material-icons text-gray-700">arrow_back</span>
          </button>
          <div className="flex items-center gap-2">
            <img
              src="https://static.toiimg.com/photo/124997104.cms"
              alt=""
              className="h-8 w-auto inline-block"
            />
            <span className="text-gray-900 text-sm font-medium whitespace-nowrap">
              Simulation Room : Bihar election
            </span>
          </div>
          <div className="w-10"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Result Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <span
            className={`material-icons text-4xl sm:text-5xl md:text-6xl lg:text-8xl ${getResultColor(
              result
            )} mb-3 sm:mb-4 md:mb-6 block`}
          >
            {getResultIcon(result)}
          </span>
          <h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-bold ${getResultColor(
              result
            )} mb-3 sm:mb-4 md:mb-6 px-2`}
          >
            {result}
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-3 sm:px-4">
            {nodeData.text.replace(/^[A-Z ]+!\s*/, "")}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 mb-6 sm:mb-8 lg:mb-12">
          {/* Campaign Summary - order-2 on mobile, order-1 on lg+ */}
          <div className="order-2 lg:order-1 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
              <span className="material-icons text-black text-lg sm:text-xl md:text-2xl">
                summarize
              </span>
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black">
                Campaign Summary
              </h3>
            </div>
            <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
              {nodeData.summary}
            </p>
          </div>

          {/* Statistics - order-1 on mobile, order-2 on lg+ */}
          {nodeData.stats && (
            <div className="order-1 lg:order-2 bg-white border border-gray-200 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 md:mb-6">
                <span className="material-icons text-black text-lg sm:text-xl md:text-2xl">
                  analytics
                </span>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black">
                  Final Statistics
                </h3>
              </div>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {Object.entries(nodeData.stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center p-2 sm:p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <span className="text-xs sm:text-sm text-gray-600 font-medium">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>
                    <span className="text-xs sm:text-sm md:text-base text-black font-semibold">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="w-full px-3 sm:px-4">
          {/* Mobile Layout */}
          <div className="flex lg:hidden gap-3 items-center justify-between">
            {/* Share Button */}

            <CTAButton
              onClick={handlePlayAgain}
              icon="refresh"
              className="flex-1"
            >
              Play Again
            </CTAButton>

            <CTAButton onClick={handleShare} icon="share" className="flex-1">
              SHARE
            </CTAButton>

            {/* Play Again Button */}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-4 items-center justify-center">
            {/* Share Button */}

            <CTAButton onClick={handlePlayAgain} icon="refresh">
              Play Again
            </CTAButton>

            <CTAButton onClick={handleShare} icon="share">
              SHARE
            </CTAButton>

            {/* Play Again Button */}
          </div>
        </div>
      </main>

      {/* Share Card - Hidden component that auto-triggers sharing (fallback method) */}
      {isSharing && useFallbackShare && (
        <ShareCard nodeData={nodeData} candidateKey={candidateKey} />
      )}
    </div>
  );
};

export default ResultScreen;
