import React, { useState, useEffect } from "react";

function Game() {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [gameMode, setGameMode] = useState(16);
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const initialCards = {
    4: [
      "/images/img1.png",
      "/images/img1.png",
      "/images/img2.png",
      "/images/img2.png",
    ],
    16: [
      "/images/img1.png",
      "/images/img1.png",
      "/images/img2.png",
      "/images/img2.png",
      "/images/img3.png",
      "/images/img3.png",
      "/images/img4.png",
      "/images/img4.png",
      "/images/img5.png",
      "/images/img5.png",
      "/images/img6.png",
      "/images/img6.png",
      "/images/img7.png",
      "/images/img7.png",
      "/images/img8.png",
      "/images/img8.png",
    ],
    36: [
      "/images/img1.png",
      "/images/img1.png",
      "/images/img2.png",
      "/images/img2.png",
      "/images/img3.png",
      "/images/img3.png",
      "/images/img4.png",
      "/images/img4.png",
      "/images/img5.png",
      "/images/img5.png",
      "/images/img6.png",
      "/images/img6.png",
      "/images/img7.png",
      "/images/img7.png",
      "/images/img8.png",
      "/images/img8.png",
      "/images/img9.png",
      "/images/img9.png",
      "/images/img10.png",
      "/images/img10.png",
      "/images/img11.png",
      "/images/img11.png",
      "/images/img12.png",
      "/images/img12.png",
      "/images/img13.png",
      "/images/img13.png",
      "/images/img14.png",
      "/images/img14.png",
      "/images/img15.png",
      "/images/img15.png",
      "/images/img16.png",
      "/images/img16.png",
      "/images/img17.png",
      "/images/img17.png",
      "/images/img18.png",
      "/images/img18.png",
    ],
  };

  const shuffleCards = (cards) => {
    return [...cards].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const storedColor = localStorage.getItem("backgroundColor") || "#ffffff";
    const storedMode = Number(localStorage.getItem("gameMode")) || 16;
    setBackgroundColor(storedColor);
    setGameMode(storedMode);
    resetGame(storedMode);
  }, []);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => setTimer((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  const resetGame = (mode) => {
    setCards(shuffleCards(initialCards[mode]));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTimer(0);
    setGameOver(false);
    setGameStarted(false);
  };

  const handleCardClick = (index) => {
    if (
      !gameStarted ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        // Matched cards logic
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]);
        if (matchedCards.length + 2 === cards.length) {
          setGameOver(true);
          saveWinHistory(); // Save the win details
        }
      } else {
        // No match logic
        setTimeout(() => setFlippedCards([]), 1000);
      }
      setMoves((prev) => prev + 1);
    }
  };

  const saveWinHistory = () => {
    const date = new Date().toLocaleString();
    const history = JSON.parse(localStorage.getItem("gameHistory")) || [];
    history.push({
      date,
      mode: gameMode,
      moves,
      time: timer,
    });
    localStorage.setItem("gameHistory", JSON.stringify(history));
  };

  const startGame = () => {
    setGameStarted(true);
    setFlippedCards([]);
    setMoves(0);
    setTimer(0);
    setMatchedCards([]);
  };

  return (
    <div className="game" style={{ backgroundColor }}>
      <h1>Memory Cards Game</h1>
      {!gameStarted && (
        <button onClick={startGame} className="start-button">
          Start Game
        </button>
      )}
      {gameStarted && (
        <>
          <h2>Moves: {moves}</h2>
          <h2>Timer: {timer} seconds</h2>
          <div
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${Math.sqrt(gameMode)}, 100px)`,
            }}
          >
            {cards.map((card, index) => (
              <div
                key={index}
                className={`card ${
                  flippedCards.includes(index) || matchedCards.includes(index)
                    ? "flipped"
                    : ""
                }`}
                onClick={() => handleCardClick(index)}
              >
                {flippedCards.includes(index) ||
                matchedCards.includes(index) ||
                gameOver ? (
                  <img className="card-img" src={card} alt="card" />
                ) : (
                  "?"
                )}
              </div>
            ))}
          </div>
        </>
      )}
      {gameOver && (
        <h2>
          You won in {moves} moves and {timer} seconds!
        </h2>
      )}
    </div>
  );
}

export default Game;
