import ImageCategoryImage from "./public/image_category.svg";
import IconCategoryImage from "./public/icon_category.svg";
import PdfCategoryImage from "./public/pdf_category.svg";
import VideoCategoryImage from "./public/video_category.svg";
import BackgroundCategoryImage from "./public/background_category.svg";
import BgRemovalCategoryImage from "./public/bgremoval_category.svg";
import TextCategoryImage from "./public/text_category.svg";

export const pages = ["Home", "Categories", "Tools"];


export const LINK_UNDERLINE_COLOR = "#625df5";
export const GREY_COLOR = "hsla(0,0%,100%,.7)";

export const IMAGE_SIZE = 100;

export const CATEGORIES = [
  {
    name: "Image",
    description:
      "Discover AI-powered image editing and enhancement tools designed to elevate your creativity. From filters to artistic transformations.",
    image: ImageCategoryImage,
    key: 1,
  },
  {
    name: "Icon",
    description:
      "Explore AI tools for icon creation and customization. Craft unique, scalable icons that bring clarity and style to any digital project with ease and precision.",
    image: IconCategoryImage,
    key: 2,
  },
  {
    name: "PDF",
    description:
      "Simplify your workflow with AI-driven PDF tools for editing, converting, and organizing documents. Handle all your PDF tasks efficiently in one place.",
    image: PdfCategoryImage,
    key: 3,
  },
  {
    name: "Video",
    description:
      "Unlock the potential of AI in video editing and creation. Automate cutting-edge video processing, from effects to enhancements, for professional-level results.",
    image: VideoCategoryImage,
    key: 4,
  },
  {
    name: "Background",
    description:
      "Seamlessly change or enhance backgrounds with AI tools tailored for stunning transformations. Create visually captivating environments with just a few clicks.",
    image: BackgroundCategoryImage,
    key: 5,
  },
  {
    name: "Background Removal",
    description:
      "Effortlessly remove backgrounds from images using AI technology. Achieve clean, sharp extractions to integrate your subjects into any project or design.",
    image: BgRemovalCategoryImage,
    key: 6,
  },
  {
    name: "News",
    description:
      "Stay ahead with AI-powered news analysis and aggregation tools. Get real-time insights, summaries, and trends tailored to your interests.",
    image: TextCategoryImage,
    key: 7,
  },
];
