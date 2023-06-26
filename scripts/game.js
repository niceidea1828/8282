const paths = [
  {
    coords: [
      [0, 50],
      [-30, 120],
      [0, 180],
      [50, 250],
      [30, 320],
      [30, 350]
    ],
    cf: 1
  },

  {
    coords: [
      [0, 50],
      [40, 120],
      [70, 180],
      [10, 250],
      [-20, 310],
      [-20, 350]
    ],
    cf: 2
  },

  {
    coords: [
      [0, 40],
      [-25, 100],
      [-50, 170],
      [-20, 240],
      [-60, 300],
      [-70, 350]
    ],
    cf: 3
  },

  {
    coords: [
      [0, 40],
      [40, 120],
      [65, 190],
      [95, 260],
      [115, 310],
      [120, 350]
    ],
    cf: 4
  }
];

let active = true;

$(".balance").html(localStorage.balance_b82);

$(".play").click(function () {
  if (!active) {
    return;
  }

  active = false;
  changeBalance(-500);

  const pathInd = randInt(0, paths.length - 1);

  let step = 0;
  const stepAmount = paths[pathInd].coords.length;

  let gameInt = setInterval(() => {
    if (step >= stepAmount) {
      clearInterval(gameInt);

      gameOver(500 * paths[pathInd].cf);

      return;
    }

    const coord = paths[pathInd].coords[step];

    $(".ball").css({
      transform: `translate(${coord[0]}px, ${coord[1]}px)`
    });

    step++;
  }, 400);
});

window.onload = () => {
  $(".wrapper").removeClass("hidden");
};

function changeBalance(amount) {
  localStorage.balance_b82 = +localStorage.balance_b82 + amount;
  $(".balance").html(localStorage.balance_b82);
}

function gameOver(win) {
  if (win) {
    changeBalance(win);

    $(".modal_res").html("YOU WIN!");
    $(".modal_reward").html(win);
  } else {
    $(".modal_res").html("YOU LOSE");
    $(".modal_reward").html(0);
  }

  $(".modal").removeClass("hidden");
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
