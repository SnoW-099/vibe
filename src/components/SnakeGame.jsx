import React, { useRef, useEffect, useState } from 'react';
import './SnakeGame.css';

const GRID_SIZE = 20;
const TILE_SIZE = 20;
const SPEED = 130; // Slower speed for better control

function SnakeGame() {
    const canvasRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState({ x: 0, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(localStorage.getItem('snake_highscore') || 0);
    const [started, setStarted] = useState(false);

    // Game Loop
    useEffect(() => {
        if (!started || gameOver) return;

        const moveSnake = () => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y
                };

                // Check collision with walls
                if (
                    newHead.x < 0 || newHead.x >= GRID_SIZE ||
                    newHead.y < 0 || newHead.y >= GRID_SIZE ||
                    prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
                ) {
                    setGameOver(true);
                    return prevSnake;
                }

                const newSnake = [newHead, ...prevSnake];

                // Check collision with food
                if (newHead.x === food.x && newHead.y === food.y) {
                    setScore(prev => prev + 1);
                    setFood({
                        x: Math.floor(Math.random() * GRID_SIZE),
                        y: Math.floor(Math.random() * GRID_SIZE)
                    });
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        const gameInterval = setInterval(moveSnake, SPEED);
        return () => clearInterval(gameInterval);
    }, [started, gameOver, direction, food]);

    // Key Controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!started && !gameOver) {
                // Prevent starting directly into a wall if careless
                if (['ArrowUp', 'w', 'ArrowDown', 's', 'ArrowLeft', 'a', 'ArrowRight', 'd'].includes(e.key)) {
                    setStarted(true);
                    // Default start direction is right if not specified, managed below
                }
            }

            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    if (direction.y === 0) setDirection({ x: 0, y: -1 });
                    break;
                case 'ArrowDown':
                case 's':
                    if (direction.y === 0) setDirection({ x: 0, y: 1 });
                    break;
                case 'ArrowLeft':
                case 'a':
                    if (direction.x === 0) setDirection({ x: -1, y: 0 });
                    break;
                case 'ArrowRight':
                case 'd':
                    if (direction.x === 0) setDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [direction, started, gameOver]);

    // Update High Score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snake_highscore', score);
        }
    }, [score, highScore]);

    // Draw Canvas (Neon Style)
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear with background
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Grid
        ctx.strokeStyle = '#1a1a1a';
        ctx.lineWidth = 1;
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * TILE_SIZE, 0);
            ctx.lineTo(i * TILE_SIZE, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * TILE_SIZE);
            ctx.lineTo(canvas.width, i * TILE_SIZE);
            ctx.stroke();
        }

        // Draw Snake (Neon Green)
        snake.forEach((segment, index) => {
            // Gradient or solid neon
            ctx.fillStyle = index === 0 ? '#00ff88' : '#00cc6a';
            ctx.shadowBlur = index === 0 ? 15 : 5;
            ctx.shadowColor = '#00ff88';

            // Draw segment
            ctx.fillRect(segment.x * TILE_SIZE + 1, segment.y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);

            // Eyes for head
            if (index === 0) {
                ctx.fillStyle = '#000';
                ctx.shadowBlur = 0;
                // Simple logic for eyes based on general direction or just centered
                ctx.fillRect(segment.x * TILE_SIZE + 5, segment.y * TILE_SIZE + 5, 4, 4);
                ctx.fillRect(segment.x * TILE_SIZE + 11, segment.y * TILE_SIZE + 5, 4, 4);
            }
        });

        ctx.shadowBlur = 0; // Reset shadow for other elements if needed

        // Draw Food (Neon Red Pulse)
        ctx.fillStyle = '#ff0055';
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ff0055';
        ctx.beginPath();
        ctx.arc(
            food.x * TILE_SIZE + TILE_SIZE / 2,
            food.y * TILE_SIZE + TILE_SIZE / 2,
            TILE_SIZE / 3,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;

    }, [snake, food]);

    const resetGame = () => {
        setSnake([{ x: 10, y: 10 }]);
        setFood({ x: 15, y: 15 });
        setDirection({ x: 0, y: 0 });
        setScore(0);
        setGameOver(false);
        setStarted(false);
    };

    return (
        <div className="snake-game-container">
            <div className="snake-stats">
                <span>SCORE: {score}</span>
                <span>BEST: {highScore}</span>
            </div>

            <div className="canvas-wrapper">
                <canvas
                    ref={canvasRef}
                    width={GRID_SIZE * TILE_SIZE}
                    height={GRID_SIZE * TILE_SIZE}
                    className="snake-canvas"
                />

                {!started && !gameOver && (
                    <div className="game-overlay">
                        <p className="blink-text">PRESS ARROWS TO START</p>
                    </div>
                )}

                {gameOver && (
                    <div className="game-overlay">
                        <h3 className="game-over-text">GAME OVER</h3>
                        <p>Score: {score}</p>
                        <button onClick={resetGame} className="restart-btn">RETRY</button>
                    </div>
                )}
            </div>

            <p className="game-instructions">WASD / ARROWS</p>
        </div>
    );
}

export default SnakeGame;
