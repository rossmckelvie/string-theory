GameController = Class.create(Sprite, {
  initialize: function(scene) {
    Sprite.call(this, 0, 0);
    this.image = game.assets['images/square_glow.png'];
    this.x = -10;
    this.y = -10;
    this.scene = scene;

    this.level = 0;
    this.maxLevel = false;
    this.enemyChoiceTotalWeight = 0;

    this.spamming = false;
    this.spamClass = "";
    this.spamCount = 0;

    this.levels = [
      // LEVEL 0
      {
        score: 0,
        spawn_rate: 60,
        level_end_spam: ['Triangle', 7],
        enemies: [
          ['Triangle', 50],
          ['Square', 40]
        ]
      },

      // LEVEL 1
      {
        score: 400,
        spawn_rate: 55,
        level_end_spam: ['Square', 4],
        enemies: [
          ['Triangle', 18],
          ['Circle', 20],
          ['Square', 40]
        ]
      },

      // LEVEL 2
      {
        score: 1400,
        spawn_rate: 50,
        level_end_spam: ['Circle', 2],
        enemies: [
          ['Triangle', 18],
          ['Circle', 20],
          ['Square', 40],
          ['Worm', 15]
        ]
      },

      // LEVEL 3
      {
        score: 2200,
        spawn_rate: 40,
        level_end_spam: ['Worm', 1],
        enemies: [
          ['Circle', 20],
          ['Square', 40],
	        ['Worm', 35]
        ]
      },

      // LEVEL 4
      {
        score: 3000,
        spawn_rate: 35,
        level_end_spam: ['BlackHole', 1],
        enemies: [
          ['Triangle', 30],
          ['Circle', 30],
	        ['Square', 40],
	        ['Worm', 40]
        ]
      },
      // LEVEL 5
      {
        score: 4000,
        spawn_rate: 35,
        level_end_spam: ['Square', 4],
        enemies: [
          ['Triangle', 30],
          ['Square', 40],
          ['Circle', 30],
        ]
      },
        // LEVEL 6
        {
          score: 5000,
          spawn_rate: 30,
          level_end_spam: ['Triangle', 7],
          enemies: [
            ['Circle', 30],
            ['Square', 40],
            ['Worm', 30]
          ]
        },
        // LEVEL 7
        {
          score: 6000,
          spawn_rate: 25,
          level_end_spam: ['Circle', 2],
          enemies: [
            ['Square', 40],
            ['Circle', 30],
            ['BlackHole', 10]
          ]
        },
        // LEVEL 9
        {
          score: 8000,
          spawn_rate: 20,
          level_end_spam: ['Worm', 1],
          enemies: [
            ['Square', 50],
            ['Circle', 30],
            ['BlackHole', 15]
          ]
        },
        // LEVEL 10
        {
          score: 10000,
          spawn_rate: 15,
          level_end_spam: ['Triangle', 7],
          enemies: [
            ['Circle', 20],
            ['Square', 30],
            ['Worm', 40]
          ]
        }
    ];

    this.corners = [
      [0, 0],
      [game.width, 0],
      [game.width, game.height],
      [0, game.height]
    ];

    this.setEnemyChoiceTotalWeight();
  },

  onenterframe: function() {
    // Spam if needed
    if (this.spamming) {
      if (this.age % 15 === 0)
        this.sendWave();
      return;
    }

    // Incrememnt level if needed
    if (!this.maxLevel && this.scene.score >= this.levels[this.level + 1]['score']) {
      // Spam boss enemies
      this.levelSpam(this.levels[this.level]['level_end_spam']);

      // Update level
      if (++this.level >= this.levels.length - 1) {
        this.level--;
        this.maxLevel = true;
      } else {
        if (newPlayer.weaponLevel < 4)
          newPlayer.weaponLevel++;
      }
    }

    // Check to see if it's time to spawn an enemy
    if (this.age % this.levels[this.level]['spawn_rate'] === 0 && !scene.reviving)
      this.spawnEnemy();
  },

  spawnEnemy: function() {
    var random = Math.floor(Math.random() * this.enemyChoiceTotalWeight);
    var i, cumulativeWeight = 0;
    var corner = this.randomSpawnCorner();

    for (i = 0; i < this.levels[this.level]['enemies'].length; i++) {
      cumulativeWeight += this.levels[this.level]['enemies'][i][1];

      if (random < cumulativeWeight) {
        var enemy = new window[this.levels[this.level]['enemies'][i][0]](corner[0], corner[1]);

        enemyGroup.addChild(enemy);
        return;
      }
    }
  },

  randomSpawnCorner: function() {
    var horizontalSpawn = this.randomBinary() === 0 ? 0 : game.width,
    verticalSpawn = this.randomBinary() === 0 ? 0 : game.height;

    return [ horizontalSpawn, verticalSpawn ];
  },

  setEnemyChoiceTotalWeight: function() {
    this.enemyChoiceTotalWeight = 0;

    for (var i = 0; i < this.levels[this.level]['enemies'].length; i++)
      this.enemyChoiceTotalWeight += this.levels[this.level]['enemies'][i][1];
  },

  levelSpam: function(spam) {
    this.spamming = true;
    this.spamClass = spam[0];
    this.spamCount = spam[1];
  },

  sendWave: function() {
    for (var i = 0; i < this.corners.length; i++)
      enemyGroup.addChild(new window[this.spamClass](this.corners[i][0], this.corners[i][1]));

    if (--this.spamCount <= 0)
      this.spamming = false;
  },

  randomBinary: function() {
    return Math.floor(Math.random() * 2);
  }
});
