import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardBody, CardTitle, CardText, CardSubtitle, Button } from 'reactstrap';
import rpsImage from '@/../public/rps.jpg';
import coinToss from '@/../public/cointoss-2.jpg';
import dummyGame from '@/../public/number.jpg';
import { playGame, selectGames } from '../../../redux/cardSlice';

const GameList = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const games = useSelector(selectGames);
  const router = useRouter();

  const handlePlayNowClick = (gameRoute) => {
    if (isAuth) {
      dispatch(playGame(gameRoute));
      router.push(`/gamelist/${gameRoute}`);
    } else {
      router.push('/login');
    }
  };

  const rpsGame = games.find((game) => game.id === 'game');
  const dummy = games.find((game) => game.id === 'gamedummy');
  const coinTossGame = games.find((game) => game.id === 'cointoss');

  return (
    <div className="GameListContainer">
      <div className="CardWrapper">
        {/* Rock Paper Scissor */}
        <Card
          key={rpsGame.id}
          body
          color="light"
          style={{
            width: '18rem',
          }}
        >
          <Image
            alt="Sample"
            style={{
              width: '260px',
              height: '200px',
              objectFit: 'cover',
            }}
            src={rpsImage}
          />
          <CardBody>
            <CardTitle tag="h4" className="text-center">
              Rock Paper Scissor
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              Single Player Game
            </CardSubtitle>
            <br />
            <CardText className="text-center">
              A classic hand game of strategy and chance, Rock, Paper, Scissors is a simple yet engaging contest where
              players choose one of three symbols to beat their opponent.
            </CardText>
            <br />
            <div className="d-flex justify-content-center">
              <Button
                size="sm"
                id="rps"
                className="ButtonPlayNow"
                onClick={() => handlePlayNowClick(rpsGame.id)}
              >
                {rpsGame.played ? 'Already Played' : 'Play Game'}
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Game Dummy */}
        <Card
          key={dummy.id}
          body
          color="light"
          style={{
            width: '18rem',
          }}
        >
          <Image
            alt="Sample"
            style={{
              width: '260px',
              height: '200px',
              objectFit: 'cover',
            }}
            src={dummyGame}
          />
          <CardBody>
            <CardTitle tag="h4" className="text-center">
              Game Dummy
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              Single Player Game
            </CardSubtitle>
            <br />
            <CardText className="text-center">
              The Auto Number Generator Game is an interactive and automated gaming system that generates numbers
              dynamically for players. It provides an engaging experience.
            </CardText>
            <br />
            <div className="d-flex justify-content-center">
            <Button
                size="sm"
                className="ButtonPlayNow"
                onClick={() => handlePlayNowClick(dummy.id)}
              >
                {dummy.played ? 'Already Played' : 'Play Game'}
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Coin Toss */}
        <Card
          key={coinTossGame.id}
          body
          color="light"
          style={{
            width: '18rem',
          }}
        >
          <Image
            alt="Sample"
            style={{
              width: '260px',
              height: '200px',
              objectFit: 'cover',
            }}
            src={coinToss}
          />
          <CardBody>
            <CardTitle tag="h4" className="text-center">
              Coin Toss
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted text-center" tag="h6">
              Multiplayer Game
            </CardSubtitle>
            <br />
            <CardText className="text-center">
              A simple game where two players take turns calling `heads`` or `tails` before flipping a coin. The
              winner is the one whose choice matches the side the coin lands on.
            </CardText>
            <br />
            <div className="d-flex justify-content-center">
              <Button size="sm" className="ButtonPlayNow" disabled>
                Coming Soon
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default GameList;
