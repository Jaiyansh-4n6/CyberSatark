import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export interface UserStats {
  quizCount: number;
  averageScore: number;
  highestScore: number;
  securityScore: number;
}

export interface ActivityLog {
  type: string;
  details: string;
  timestamp: string;
}

export interface UserProfile {
  uid: string;
  username: string;
  email: string;
  role: string;
  stats: UserStats;
  activities: ActivityLog[];
  createdAt: string;
  learnProgress?: number;
  photoURL?: string;
}

export async function getUserRole(uid: string): Promise<string> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return "user";
  return snap.data().role || "user";
}

export async function saveUserProfile(uid: string, username: string, email: string): Promise<void> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  // If user profile already exists, do not overwrite completely, just update or return
  if (snap.exists()) {
    await updateDoc(ref, { username, email });
    return;
  }

  const initialProfile: Omit<UserProfile, "uid"> = {
    username,
    email,
    role: email.toLowerCase() === "admin@cybersatark.com" ? "admin" : "user",
    stats: {
      quizCount: 0,
      averageScore: 0,
      highestScore: 0,
      securityScore: 60, // starting baseline score
    },
    activities: [
      {
        type: "System",
        details: "Account registered successfully",
        timestamp: new Date().toISOString(),
      }
    ],
    createdAt: new Date().toISOString(),
    learnProgress: 0,
  };

  await setDoc(ref, initialProfile);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;
  return { uid, ...snap.data() } as UserProfile;
}

export async function logUserActivity(uid: string, type: string, details: string): Promise<void> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const currentData = snap.data();
  const currentActivities = currentData.activities || [];

  const newActivity: ActivityLog = {
    type,
    details,
    timestamp: new Date().toISOString(),
  };

  // Limit to most recent 10 activities to avoid document size bloat
  const updatedActivities = [newActivity, ...currentActivities].slice(0, 10);

  await updateDoc(ref, {
    activities: updatedActivities,
  });
}

export async function updateUserQuizScore(uid: string, score: number, quizTitle: string): Promise<void> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const data = snap.data();
  const currentStats: UserStats = data.stats || {
    quizCount: 0,
    averageScore: 0,
    highestScore: 0,
    securityScore: 60,
  };

  const newQuizCount = currentStats.quizCount + 1;
  const newHighestScore = Math.max(currentStats.highestScore, score);
  
  // Quiz score is out of 10, let's normalize to percentage (e.g. 8/10 = 80)
  const scorePercent = score * 10;
  const newAverageScore = Math.round(
    (currentStats.averageScore * currentStats.quizCount + scorePercent) / newQuizCount
  );

  // Security score is updated based on quiz score performance (e.g. baseline + adjustments)
  // Let's make it reflect average quiz score or scale appropriately
  const newSecurityScore = Math.min(100, Math.max(0, Math.round(newAverageScore)));

  const updatedStats: UserStats = {
    quizCount: newQuizCount,
    highestScore: newHighestScore,
    averageScore: newAverageScore,
    securityScore: newSecurityScore,
  };

  const currentActivities = data.activities || [];
  const newActivity: ActivityLog = {
    type: "Quiz Completed",
    details: `Finished "${quizTitle}" with score ${score}/10`,
    timestamp: new Date().toISOString(),
  };
  const updatedActivities = [newActivity, ...currentActivities].slice(0, 10);

  await updateDoc(ref, {
    stats: updatedStats,
    activities: updatedActivities,
  });
}

export async function getUserLearnProgress(uid: string): Promise<number> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return 0;
  return snap.data().learnProgress ?? 0;
}

export async function updateUserLearnProgress(uid: string, chapterIndex: number): Promise<void> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  await updateDoc(ref, {
    learnProgress: chapterIndex,
  });
}

export async function updateUserPhoto(uid: string, photoURL: string): Promise<void> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  await updateDoc(ref, { photoURL });
}

export async function updateProfileDetails(uid: string, username: string, email: string): Promise<void> {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;
  await updateDoc(ref, { username, email });
}