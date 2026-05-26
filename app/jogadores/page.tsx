"use client";

import { useEffect, useState } from "react";
import { SiteShell } from "@/components/site-shell";

type SquadPlayer = {
  id: number | string;
  name: string;
  position: string | null;
  photo: string | null;
  number: number | null;
  age: number | null;
};

type PlayersResponse = {
  players: SquadPlayer[];
};

const PLAYERS_CACHE_KEY = "corinthians_players";
const PLAYERS_CACHE_TIMESTAMP_KEY = "corinthians_players_timestamp";
const PLAYERS_CACHE_TTL = 8 * 60 * 60 * 1000;

const positionFilters = [
  { label: "Todos", value: "all" },
  { label: "Goleiros", value: "goalkeeper" },
  { label: "Defensores", value: "defender" },
  { label: "Meio-campo", value: "midfielder" },
  { label: "Atacantes", value: "attacker" },
] as const;

const positionLabels: Record<string, string> = {
  Goalkeeper: "Goleiro",
  Defender: "Defensor",
  Midfielder: "Meio-campo",
  Attacker: "Atacante",
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatPosition(position: string | null) {
  if (!position) {
    return "—";
  }

  return positionLabels[position] ?? position;
}

function getFilterValue(position: string | null) {
  switch (position) {
    case "Goalkeeper":
      return "goalkeeper";
    case "Defender":
      return "defender";
    case "Midfielder":
      return "midfielder";
    case "Attacker":
      return "attacker";
    default:
      return "unknown";
  }
}

function PlayerCard({ player }: { player: SquadPlayer }) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = getInitials(player.name);
  const position = formatPosition(player.position);

  return (
    <article className="player-card">
      <div className="player-card__number" aria-hidden="true">
        {player.number == null ? "—" : `#${player.number}`}
      </div>

      <div
        className={`player-card__avatar${player.photo && !imageFailed ? " player-card__avatar--image" : " player-card__avatar--fallback"}`}
      >
        {player.photo && !imageFailed ? (
          <img src={player.photo} alt={player.name} onError={() => setImageFailed(true)} loading="lazy" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      <div className="player-card__body">
        <div className="player-card__header">
          <p className="player-card__role">{position}</p>
          <h2>{player.name}</h2>
        </div>

        <dl className="player-card__meta">
          <div>
            <dt>Posição</dt>
            <dd>{position}</dd>
          </div>
          <div>
            <dt>Idade</dt>
            <dd>{player.age == null ? "—" : `${player.age} anos`}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default function JogadoresPage() {
  const [players, setPlayers] = useState<SquadPlayer[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [activeFilter, setActiveFilter] = useState<(typeof positionFilters)[number]["value"]>("all");

  useEffect(() => {
    const controller = new AbortController();

    function hydrateFromCache() {
      if (typeof window === "undefined") {
        return false;
      }

      const cachedPlayers = window.localStorage.getItem(PLAYERS_CACHE_KEY);
      const cachedTimestamp = window.localStorage.getItem(PLAYERS_CACHE_TIMESTAMP_KEY);

      if (!cachedPlayers || !cachedTimestamp) {
        return false;
      }

      const timestamp = Number(cachedTimestamp);

      if (!Number.isFinite(timestamp) || Date.now() - timestamp >= PLAYERS_CACHE_TTL) {
        return false;
      }

      try {
        const parsedPlayers = JSON.parse(cachedPlayers) as SquadPlayer[];

        if (!Array.isArray(parsedPlayers)) {
          return false;
        }

        setPlayers(parsedPlayers);
        setStatus(parsedPlayers.length > 0 ? "ready" : "empty");
        return true;
      } catch {
        return false;
      }
    }

    async function loadPlayers() {
      if (hydrateFromCache()) {
        return;
      }

      setStatus("loading");

      try {
        const response = await fetch("/api/corinthians/players", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Não foi possível carregar o elenco agora.");
        }

        const data = (await response.json()) as PlayersResponse;
        const squad = Array.isArray(data.players) ? data.players : [];

        setPlayers(squad);
        setStatus(squad.length > 0 ? "ready" : "empty");

        window.localStorage.setItem(PLAYERS_CACHE_KEY, JSON.stringify(squad));
        window.localStorage.setItem(PLAYERS_CACHE_TIMESTAMP_KEY, String(Date.now()));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setPlayers([]);
        setStatus("error");
      }
    }

    loadPlayers();

    return () => controller.abort();
  }, []);

  const visiblePlayers =
    activeFilter === "all" ? players : players.filter((player) => getFilterValue(player.position) === activeFilter);

  return (
    <SiteShell>
      <section className="page-section page-section--heroish">
        <div className="page-wrap">
          <div className="section-heading">
            <p className="section-heading__kicker">Jogadores</p>
            <h1 className="section-heading__title">Elenco do Corinthians</h1>
            <p className="section-heading__description">
              O elenco é carregado via API-Sports e atualizado sem depender de cards mockados.
            </p>
          </div>

          <div className="players-filters" aria-label="Filtrar jogadores por posição">
            {positionFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`players-filters__button${activeFilter === filter.value ? " players-filters__button--active" : ""}`}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {status === "loading" ? (
            <div className="players-grid" aria-busy="true" aria-live="polite">
              {Array.from({ length: 8 }).map((_, index) => (
                <article key={index} className="player-card player-card--skeleton">
                  <div className="player-card__number player-card__number--skeleton" />
                  <div className="player-card__avatar player-card__avatar--skeleton" />
                  <div className="player-card__body">
                    <div className="player-card__line player-card__line--title" />
                    <div className="player-card__line player-card__line--short" />
                    <div className="player-card__meta player-card__meta--skeleton">
                      <div className="player-card__pill player-card__pill--skeleton" />
                      <div className="player-card__pill player-card__pill--skeleton" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : status === "error" ? (
            <div className="players-state" role="alert">
              <h2>Não foi possível carregar os jogadores. Tente novamente.</h2>
              <button type="button" className="players-state__button" onClick={() => window.location.reload()}>
                Tentar novamente
              </button>
            </div>
          ) : status === "empty" ? (
            <div className="players-state">
              <h2>Nenhum jogador encontrado no elenco.</h2>
            </div>
          ) : visiblePlayers.length > 0 ? (
            <div className="players-grid">
              {visiblePlayers.map((player) => (
                <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          ) : (
            <div className="players-state">
              <h2>Nenhum jogador encontrado no elenco.</h2>
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
