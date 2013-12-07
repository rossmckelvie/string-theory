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

    this.levels = [
      // LEVEL 0
      {
        score: 0,
        spawn_rate: 60,
        enemies: [
          ['Triangle', 50],
          ['Circle', 30],
          ['Square', 40]
        ]
      },

      // LEVEL 1
      {
        score: 400,
        spawn_rate: 40,
        enemies: [
          ['Triangle', 18],
          ['Circle', 20],
          ['Square', 40],
          ['Worm', 20]
        ]
      }
    ];

    this.setEnemyChoiceTotalWeight();
  },

  onenterframe: function() {
    // Incrememnt level if needed
    if (!this.maxLevel && this.scene.score >= this.levels[this.level + 1]['score']) {
      if (++this.level >= this.levels.length) {
        this.level--;
        this.maxLevel = true;
      }
    }

    // Check to see if it's time to spawn an enemy
    if (this.age % this.levels[this.level]['spawn_rate'] === 0)
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
        this.scene.addChild(enemy);
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

  randomBinary: function() {
    return Math.floor(Math.random() * 2);
  }
});
