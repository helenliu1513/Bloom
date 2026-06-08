import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { generateBloomMessage, type Nutrient } from "@/lib/bloom.functions";

interface Activity {
  id: number;
  who: string;
  nutrient: Nutrient;
  note: string;
}

export interface BloomResultUI {
  bloomed_message: string;
  what_changed: string;
  why_this_helps: string;
  nutrient: Nutrient;
  growth_points: number;
  recognition_signal: string;
  source: "ai" | "fallback";
}

const INITIAL_ACTIVITY: Activity[] = [
  { id: 1, who: "Maya", nutrient: "Bloom", note: "sending appreciation" },
  { id: 2, who: "Alex", nutrient: "Water", note: "supporting a blocked teammate" },
  { id: 3, who: "Jordan", nutrient: "Sunlight", note: "making a confusing ask clearer" },
  { id: 4, who: "Priya", nutrient: "Butterfly", note: "encouraging a teammate" },
];

const INITIAL_LEADERBOARD = [
  { name: "Maya", points: 92, badge: "Top Bloomer" },
  { name: "Alex", points: 81, badge: "Support Star" },
  { name: "Jordan", points: 74, badge: "Clarity Champion" },
  { name: "Priya", points: 69, badge: "Encouragement Spark" },
  { name: "You", points: 36, badge: "Rising Bloomer" },
];

interface Ctx {
  // workspace
  message: string;
  setMessage: (s: string) => void;
  selectedAction: string;
  setSelectedAction: (s: string) => void;
  customInstruction: string;
  setCustomInstruction: (s: string) => void;
  loading: boolean;
  result: BloomResultUI | null;
  used: boolean;
  copied: boolean;
  handleBloom: (useCustom: boolean) => Promise<void>;
  handleUse: () => void;
  handleCopy: () => Promise<void>;

  // stats
  myGrowth: number;
  myHealth: number;
  teamHealth: number;
  kindMsgs: number;
  appreciation: number;
  clarity: number;
  supported: number;

  // garden state
  growthTick: number;
  lastNutrient: Nutrient | undefined;
  activity: Activity[];
  leaderboard: typeof INITIAL_LEADERBOARD;
  sortedLeaderboard: typeof INITIAL_LEADERBOARD;
  teamPoints: Record<string, number>;

  // board
  recogNote: string | null;
  setRecogNote: (s: string | null) => void;
}

const BloomContext = createContext<Ctx | null>(null);

export function useBloom() {
  const ctx = useContext(BloomContext);
  if (!ctx) throw new Error("useBloom must be used within BloomProvider");
  return ctx;
}

export function BloomProvider({ children }: { children: ReactNode }) {
  const bloomFn = useServerFn(generateBloomMessage);

  const [message, setMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState("Make it Friendlier");
  const [customInstruction, setCustomInstruction] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BloomResultUI | null>(null);
  const [used, setUsed] = useState(false);
  const [copied, setCopied] = useState(false);

  const [myGrowth, setMyGrowth] = useState(36);
  const [myHealth, setMyHealth] = useState(78);
  const [teamHealth, setTeamHealth] = useState(84);
  const [kindMsgs, setKindMsgs] = useState(18);
  const [appreciation, setAppreciation] = useState(5);
  const [clarity, setClarity] = useState(7);
  const [supported, setSupported] = useState(6);

  const [activity, setActivity] = useState<Activity[]>(INITIAL_ACTIVITY);
  const [leaderboard, setLeaderboard] = useState(INITIAL_LEADERBOARD);
  const [growthTick, setGrowthTick] = useState(0);
  const [lastNutrient, setLastNutrient] = useState<Nutrient | undefined>();
  const [recogNote, setRecogNote] = useState<string | null>(null);

  const sortedLeaderboard = useMemo(
    () => [...leaderboard].sort((a, b) => b.points - a.points),
    [leaderboard],
  );
  const teamPoints = useMemo(
    () => Object.fromEntries(leaderboard.map((p) => [p.name, p.points])),
    [leaderboard],
  );

  async function handleBloom(useCustom: boolean) {
    if (!message.trim() || loading) return;
    const goal = useCustom ? customInstruction.trim() : selectedAction;
    if (!goal) {
      toast("Please add a custom instruction or pick a quick action.");
      return;
    }
    setLoading(true);
    setUsed(false);
    setCopied(false);
    try {
      const r = await bloomFn({
        data: { message: message.trim(), improvement_goal: goal, is_custom_instruction: useCustom },
      });
      setResult(r as BloomResultUI);
      if (r.source === "fallback") {
        toast("Showing a fallback bloom — AI did not respond.", { icon: "🌱" });
      }
    } catch (e) {
      toast.error("Something went wrong. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function handleUse() {
    if (!result || used) return;
    setUsed(true);
    const { nutrient, growth_points } = result;
    setMyHealth((h) => Math.min(100, h + 3));
    setMyGrowth((g) => g + growth_points);
    setTeamHealth((h) => Math.min(100, h + 2));
    setKindMsgs((n) => n + 1);
    if (nutrient === "Bloom") setAppreciation((n) => n + 1);
    if (nutrient === "Sunlight" || nutrient === "Roots") setClarity((n) => n + 1);
    if (nutrient === "Water" || nutrient === "Butterfly") setSupported((n) => n + 1);

    setActivity((a) => [
      { id: Date.now(), who: "You", nutrient, note: "improving a message" },
      ...a.slice(0, 6),
    ]);
    setLeaderboard((lb) => {
      const next = lb.map((p) =>
        p.name === "You" ? { ...p, points: p.points + growth_points } : p,
      );
      const me = next.find((p) => p.name === "You")!;
      if (me.points >= 70) me.badge = "Clarity Champion";
      if (me.points >= 90) me.badge = "Top Bloomer";
      return next;
    });
    setLastNutrient(nutrient);
    setGrowthTick((t) => t + 1);
    toast.success("Your garden bloomed 🌱");
  }

  async function handleCopy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.bloomed_message);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy");
    }
  }

  const value: Ctx = {
    message, setMessage,
    selectedAction, setSelectedAction,
    customInstruction, setCustomInstruction,
    loading, result, used, copied,
    handleBloom, handleUse, handleCopy,
    myGrowth, myHealth, teamHealth, kindMsgs, appreciation, clarity, supported,
    growthTick, lastNutrient, activity, leaderboard, sortedLeaderboard, teamPoints,
    recogNote, setRecogNote,
  };

  return <BloomContext.Provider value={value}>{children}</BloomContext.Provider>;
}
