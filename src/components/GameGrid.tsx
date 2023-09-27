import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface Game {
  id: number;
  name: string;
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const GameGrid = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<FetchGamesResponse>("/xgames")
      .then((res) => {
        setGames(res.data.results);
      })
      .catch((err) => {
        setError(err.message);
      });
  });

  return (
    <div>
      <ul>
        {error.length == 0 ? (
          games.map((game: Game) => <li key={game.id}>{game.name}</li>)
        ) : (
          <li> {error} </li>
        )}
      </ul>
    </div>
  );
};

export default GameGrid;