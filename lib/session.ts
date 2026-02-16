import { FamilyProfile } from "@/types";

const SESSION_KEY = "zela_session";
const PROFILE_KEY = "zela_profile";

export function setLoggedSession(profile: FamilyProfile) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SESSION_KEY, "true");
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(PROFILE_KEY);
}

export function hasSession() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SESSION_KEY) === "true";
}

export function getStoredProfile(): FamilyProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as FamilyProfile;
  } catch {
    return null;
  }
}
