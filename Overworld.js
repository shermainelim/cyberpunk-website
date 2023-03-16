class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
    this.xy = null;
  }

  startGameLoop(mapConfig) {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      function getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
        const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y
        console.log("x: " + x + " y: " + y);
        var numericArray = new Array(2);
        numericArray[0] = x * scaleX;
        numericArray[1] = y * scaleY;

        return numericArray;
      }

      //Establish the camera person
      const cameraPerson = this.map.gameObjects.hero;

      const canvas = document.querySelector("canvas");

      const sleep = document?.querySelector(".sleep");

      sleep?.addEventListener("mousedown", function (e) {
        cameraPerson.x = 610;
        cameraPerson.y = 370;
      });

      const city = document?.querySelector(".city");

      city?.addEventListener("mousedown", function (e) {
        cameraPerson.x = 200;
        cameraPerson.y = 710;
      });

      const cityDay = document?.querySelector(".cityDay");

      cityDay?.addEventListener("mousedown", function (e) {
        cameraPerson.x = 410;
        cameraPerson.y = 625;
      });

      const moon = document?.querySelector(".moon");

      moon?.addEventListener("mousedown", function (e) {
        cameraPerson.x = 520;
        cameraPerson.y = 750;
      });

      canvas.addEventListener("click", function (e) {
        this.xy = getCursorPosition(canvas, e);

        cameraPerson.x = this.xy[0];
        cameraPerson.y = this.xy[1];
      });

      //Update all objects
      Object.values(this.map.gameObjects).forEach((object) => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        });
      });

      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects)
        .sort((a, b) => {
          return a.y - b.y;
        })
        .forEach((object) => {
          object.sprite.draw(this.ctx, cameraPerson);
        });

      //Draw Upper layer
      this.map.drawUpperImage(this.ctx, cameraPerson);

      if (!this.map.isPaused) {
        requestAnimationFrame(() => {
          step();
        });
      }
    };
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //Is there a person here to talk to?
      this.map.checkForActionCutscene();
    });
    new KeyPressListener("Escape", () => {
      if (!this.map.isCutscenePlaying) {
        this.map.startCutscene([{ type: "pause" }]);
      }
    });
  }

  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", (e) => {
      if (e.detail.whoId === "hero") {
        //Hero's position has changed
        this.map.checkForFootstepCutscene();
      }
    });
  }

  startMap(mapConfig, heroInitialState = null) {
    this.map = new OverworldMap(mapConfig);
    this.map.overworld = this;
    this.map.mountObjects();

    if (heroInitialState) {
      const { hero } = this.map.gameObjects;
      this.map.removeWall(hero.x, hero.y);
      hero.x = heroInitialState.x;
      hero.y = heroInitialState.y;
      hero.direction = heroInitialState.direction;
      this.map.addWall(hero.x, hero.y);
    }

    // this.progress.mapId = mapConfig.id;
    // this.progress.startingHeroX = this.map.gameObjects.hero.x;
    // this.progress.startingHeroY = this.map.gameObjects.hero.y;
    // this.progress.startingHeroDirection = this.map.gameObjects.hero.direction;
  }

  async init() {
    const container = document.querySelector(".game-container");

    //Create a new Progress tracker

    //Start the first map


    //Create controls
    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    //Kick off the game!
    this.startGameLoop();

    // this.map.startCutscene([
    //   { type: "battle", enemyId: "beth" }
    //   // { type: "changeMap", map: "DemoRoom"}
    //   // { type: "textMessage", text: "This is the very first message!"}
    // ])
  }
}
