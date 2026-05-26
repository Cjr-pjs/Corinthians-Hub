import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_DIR = path.join(process.cwd(), "cache");
const CACHE_FILE = path.join(CACHE_DIR, "players.json");
const API_SPORTS_URL = "https://v3.football.api-sports.io/players/squads?team=131";

type ApiSportsResponse = {
  response?: Array<{
    players?: Array<{
      id?: number;
      name?: string;
      age?: number | null;
      number?: number | null;
      position?: string | null;
      photo?: string | null;
    }>;
  }>;
};

export type CorinthiansPlayer = {
  id: number;
  name: string;
  age: number | null;
  number: number | null;
  position: string | null;
  photo: string | null;
};

type CachedPlayersPayload = {
  fetchedAt: number;
  players: CorinthiansPlayer[];
};

type GlobalCache = {
  payload?: CachedPlayersPayload;
};

const globalCache = globalThis as typeof globalThis & {
  __corinthiansPlayersCache?: GlobalCache;
};

function isFresh(fetchedAt: number) {
  return Date.now() - fetchedAt < CACHE_TTL_MS;
}

async function readFileCache() {
  try {
    const raw = await readFile(CACHE_FILE, "utf8");
    const parsed = JSON.parse(raw) as CachedPlayersPayload;

    if (!Array.isArray(parsed.players) || typeof parsed.fetchedAt !== "number") {
      return null;
    }

    if (!isFresh(parsed.fetchedAt)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

async function writeFileCache(payload: CachedPlayersPayload) {
  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(CACHE_FILE, JSON.stringify(payload, null, 2), "utf8");
}

async function fetchFromApiSports() {
  const apiKey = process.env.API_SPORTS_KEY;

  if (!apiKey) {
    throw new Error("API_SPORTS_KEY não foi configurada.");
  }

  const response = await fetch(API_SPORTS_URL, {
    headers: {
      "x-apisports-key": apiKey,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Falha ao consultar API-Sports: ${response.status} ${errorBody}`);
  }

  const data = (await response.json()) as ApiSportsResponse;

  return (data.response?.[0]?.players ?? [])
    .filter((player): player is NonNullable<typeof player> => Boolean(player?.id && player.name))
    .map((player) => ({
      id: player.id ?? 0,
      name: player.name ?? "",
      age: player.age ?? null,
      number: player.number ?? null,
      position: player.position ?? null,
      photo: player.photo ?? null,
    }));
}

export async function getCorinthiansPlayers() {
  const cachedPayload = globalCache.__corinthiansPlayersCache?.payload;

  if (cachedPayload && isFresh(cachedPayload.fetchedAt)) {
    return cachedPayload.players;
  }

  const persistedPayload = await readFileCache();

  if (persistedPayload) {
    globalCache.__corinthiansPlayersCache = { payload: persistedPayload };
    return persistedPayload.players;
  }

  const players = await fetchFromApiSports();
  const payload: CachedPlayersPayload = {
    fetchedAt: Date.now(),
    players,
  };

  globalCache.__corinthiansPlayersCache = { payload };

  try {
    await writeFileCache(payload);
  } catch {
  }

  return players;
}