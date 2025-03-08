import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {
  name: "Aline Nink",
  bio: "Desenvolvedora Front-End apaixonada por tecnologia e design, focada em criar soluções modernas e responsivas. Explorando o gerenciamento de redes sociais com ferramentas que otimizam a produtividade e ampliam o impacto digital.",
  photoUrl:  require("../profile.JPG"),
  platforms: ["Instagram", "YouTube", "TikTok", "LinkedIn"], // Plataformas iniciais
  socialLinks: {
    instagram: "",
    youtube: "",
    tiktok: "",
    linkedin: "",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    updateProfile(state, action) {
      return { ...state, ...action.payload };
    },
    addPlatform(state, action) {
      if (!state.platforms.includes(action.payload)) {
        state.platforms.push(action.payload);
      }
    },
    removePlatform(state, action) {
      state.platforms = state.platforms.filter((p) => p !== action.payload);
    },
    updateSocialLink(state, action) {
      const { platform, link } = action.payload;
      if (state.socialLinks[platform] !== undefined) {
        state.socialLinks[platform] = link;
      }
    },
  },
});

export const { updateProfile, addPlatform, removePlatform, updateSocialLink } =
  profileSlice.actions;

export default profileSlice.reducer;
