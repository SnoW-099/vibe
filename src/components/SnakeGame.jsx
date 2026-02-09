import React, { useRef, useEffect, useState } from 'react';
import './SnakeGame.css';

const GRID_SIZE = 20;
const TILE_SIZE = 20;
const SPEED = 100;

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
                    newHead.x < 0 ||
                    newHead.x >= GRID_SIZE ||
                    newHead.y < 0 ||
                    newHead.y >= GRID_SIZE ||
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
    }, [started, gameOver, direction, food]); // Removed 'snake' from dependencies to avoid loop restart issues? No, snake state updates inside.
    // Actually, snake dependency is tricky in intervals. Using functional update in setSnake solves it.

    // Key Controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (!started && !gameOver) {
                setStarted(true);
                setDirection({ x: 1, y: 0 }); // Start moving right
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

    // Draw Canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw Snake
        ctx.fillStyle = '#fff';
        snake.forEach((segment, index) => {
            ctx.globalAlpha = index === 0 ? 1 : 0.6; // Head is brighter
            ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE - 2, TILE_SIZE - 2);
        });
        ctx.globalAlpha = 1;

        // Draw Food
        ctx.fillStyle = '#ff4757';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff4757';
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
                <span>Score: {score}</span>
                <span>Best: {highScore}</span>
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
                        <p>Press ARROWS to Start</p>
                    </div>
                )}

                {gameOver && (
                    <div className="game-overlay">
                        <h3>Game Over</h3>
                        <p>Score: {score}</p>
                        <button onClick={resetGame} className="restart-btn">Try Again</button>
                    </div>
                )}
            </div>

            <p className="game-instructions">Use arrow keys or WASD to move</p>
        </div>
    );
}

export default SnakeGame;
