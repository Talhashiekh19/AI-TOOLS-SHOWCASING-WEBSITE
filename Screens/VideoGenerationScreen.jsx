import React, { useState } from "react";
import ReusableScreenContainer from "../Components/ReusableScreenContainer";
import HeadingAndDesc from "../Components/ToolsHeadingAndDesc";
import ImagePromptInputAndButton from "../Components/ImagePromptInputAndButton";
import { Player } from "video-react";

const VideoGenerationScreen = () => {
  const [prompt, setprompt] = useState("");

  async function handleVideoGeneration() {
    const url =
      "https://text-to-video.p.rapidapi.com/v3/process_text_and_search_media";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "f8779f6b33msh87f375a21ad501ep1d6054jsne95f7029c532",
        "x-rapidapi-host": "text-to-video.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script:
          "Welcome to our YouTube channel where we will guide you through an exciting 2-day itinerary to visit Bali. Day 1, start your morning by exploring the iconic Tanah Lot temple and enjoy the stunning sunrise views. Afterward, head to the laid-back town of Ubud, where you can visit the famous Monkey Forest and experience the traditional Balinese culture. For lunch, try the local delicacies at one of the many Warungs (small local restaurants) in Ubud. In the afternoon, make your way to Tegalalang Rice Terrace, a beautiful and breathtaking sight that will surely leave you in awe. Next, visit the Ubud Art Market and shop for unique souvenirs, handmade crafts, and beautiful artwork created by local artisans. Before dinner, take a yoga class or indulge in a relaxing Balinese massage to unwind and rejuvenate. On day 2, start your morning with a trip to the stunning Tirta Gangga water palace and enjoy serenity surrounded by beautiful water gardens. Afterward, head to the Tegenungan Waterfall and take a refreshing dip in the crystal-clear water. For lunch, try the famous Babi Guling (suckling pig) at Ibu Oka, a well-known restaurant in Ubud. In the afternoon, visit the incredible Uluwatu Temple and be amazed by its cliffside location and panoramic ocean views. Stay until sunset and witness the mesmerizing Kecak Fire Dance performance. Before your trip ends, don't forget to enjoy a seafood dinner at Jimbaran Bay, where you can feast on fresh catch while enjoying the beautiful beach atmosphere. That concludes our 2-day itinerary to visit Bali, packed with incredible sights, cultural experiences, and mouthwatering food. Make sure to subscribe to our channel for more travel tips and amazing destinations.",
        dimension: "16:9",
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.table(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <ReusableScreenContainer>
      <HeadingAndDesc
        heading={
          <p>
            Text to <span className="colorfull_text">Video generation</span>
          </p>
        }
        description="Transform your words into stunning videos with HiSkyVid"
      />
      <ImagePromptInputAndButton
        value={prompt}
        setvalue={setprompt}
        handleImageGeneration={handleVideoGeneration}
        placeholder={
          "Fierce warrior in futuristic armor, standing tall under a stormy sky."
        }
      />
      {/* <Player
        playsInline
        poster={Image}
        fluid
        autoPlay={true}
        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
      /> */}
    </ReusableScreenContainer>
  );
};

export default VideoGenerationScreen;
