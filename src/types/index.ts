export type HairstyleCategory = "short" | "medium" | "long" | "curly" | "updo" | "bangs";

export interface Hairstyle {
  id: string;
  name: string;
  category: HairstyleCategory;
  thumbnailUrl: string;
  assetUrl: string;
  offset: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
  };
  license: string;
}

export type AppScreen = "home" | "camera" | "snapshot";

export interface UIState {
  currentScreen: AppScreen;
  selectedHairstyleId: string | null;
  isCameraActive: boolean;
  isTracking: boolean;
  errorMessage: string | null;
}
