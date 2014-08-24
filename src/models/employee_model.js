App.Employee = Ember.Object.extend({
    name: undefined,
    gender: undefined,
    avatar: undefined,
    hired: undefined,
    busy: undefined,
    current_story: undefined,

    // List of worlds that interest this employee
    interests_worlds: undefined,

    // Levels per role (initialized value between 0 and infinity)
    level_artist: undefined,
    level_writer: undefined,
    level_editor: undefined,
    level_promoter: undefined,
    level_techie: undefined,

    experience: function() {
        return this.get('level_artist') + this.get('level_writer') + this.get('level_editor') + this.get('level_promoter') + this.get('level_techie');
    }.property('level_artist', 'level_writer', 'level_editor', 'level_promoter', 'level_techie'),

    rank: function() {
        var exp = this.get('experience');
        var title;

        if (!exp || exp < 5) {
            title = 'Total Noob';
        } else if (exp >= 5 && exp < 20) {
            title = 'Novice Fanfictionalist';
        } else if (exp >= 20 && exp < 50) {
            title = 'Established Author of Fanfiction';
        } else if (exp >= 50 && exp < 200) {
            title = 'Established Author of Fanfiction';
        } else if (exp >= 200 && exp < 1000) {
            title = 'Hemmingway of Crossover'
        } else if (exp >= 1000) {
            title = 'Crossover God';
        }

        return title;
    }.property('experience'),

    // Base Characteristics (initialized value between 1 and 20)
    base_creativity: undefined, // artist, writer
    base_grammar: undefined, // writer, editor
    base_charisma: undefined, // editor, promoter
    base_math: undefined, // promoter, techie
    base_digital_dexterity: undefined, // techie, artist

    // Leveled Characteristics
    creativity: function() {
        return this.get('base_creativity') + this.get('level_artist') + this.get('level_writer');
    }.property('base_creativity', 'level_artist', 'level_writer'),
    grammar: function() {
        return this.get('base_grammar') + this.get('level_writer') + this.get('level_editor');
    }.property('base_grammar', 'level_writer', 'level_editor'),
    charisma: function() {
        return this.get('base_charisma') + this.get('level_editor') + this.get('level_promoter');
    }.property('base_charisma', 'level_editor', 'level_promoter'),
    math: function() {
        return this.get('base_math') + this.get('level_editor') + this.get('level_techie');
    }.property('base_math', 'level_promoter', 'level_techie'),
    digital_dexterity: function() {
        return this.get('base_math') + this.get('level_techie') + this.get('level_artist');
    }.property('base_digital_dexterity', 'level_techie', 'level_artist'),

    // Compensation in cents that employee will be paid weekly
    // (based on the idea that a totally average employee with 10 in all
    // characteristics will be paid ~$780.00 per week)
    salary: function() {
        var salary = 0;

        salary += this.get('creativity') * 900;
        salary += this.get('grammar') * 500;
        salary += this.get('charisma') * 1000;
        salary += this.get('math') * 1100
        salary += this.get('digital_dexterity') * 300;

        // Augment salary based on experience
        if (this.get('experience') > 0) {
            salary *= (this.get('experience') / 30 + 1);
        }

        return salary;
    }.property('creativity', 'grammar', 'charisma', 'math', 'digital_dexterity', 'experience')
});