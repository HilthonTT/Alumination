import axios from "axios";

export const isImageUrl = async (imageUrl: string) => {
  try {
    const response = await axios.head(imageUrl);

    const contentType = response.headers["content-type"] as string;

    return contentType.startsWith("image/");
  } catch (error) {
    console.log("[Image_URL_HOOK]", error);
    return false;
  }
};
