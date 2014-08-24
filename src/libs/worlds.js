App.Worlds = Em.A([
	Ember.Object.create({
		name: "Naruto",
		google: 76000000,
		popularity: 70,
		weirdness: 0.01,
		genre: ['action', 'adventure'],
		medium: 'manga',
		characters: ['Naruto', 'Sasuke', 'Sakura', 'Hinata', 'Kakashi', 'Orochimaru', 'Gaara'],
		locations: ['Konoha', 'Hidden Sand Village', 'Country of Stone', 'Ninja Academy'],
		props: ['Shadow Clone Jutstu', 'Rasengan', 'Icha Icha Paradice'],
		fuckingWat: false
	}), Ember.Object.create({
		name: "Star Wars",
		google: 72000000,
		popularity: 95,
		weirdness: 0.02,
		genre: ['sci-fi', 'adventure'],
		medium: 'movie',
		characters: ['Han Solo', 'Luke', 'Chewbacka', 'General Grievous', 'Mace Windu', 'Princess Leah', 'Amidala'],
		locations: ['Tatooine', 'Hoth', 'Endor', 'Death Star'],
		props: ['lightsabre', 'X-Wing', 'midichlorians', 'Sarlacc'],
		fuckingWat: false
	}), Ember.Object.create({
		name: "Star Trek: The Next Generation",
		popularity: 35,
		google: 16400000,
		weirdness: 0.03,
		genre: ['sci-fi'],
		medium: 'TV',
		characters: ['Worf', 'Data', 'Jean Luc Picard', 'Wesley', 'Q', 'Counselor Troi', 'Dr. Crusher', 'Belana Troi', 'Guinan'],
		locations: ['Star Fleet Academy', 'Wolf 359', 'Betazed', 'Delta Quadrent', 'The Q Continuum', "Qo'noS"],
		props: ['tricorder', 'phaser', 'cloaking device', 'dilithium crystal', 'Borg technology'],
		fuckingWat: false
	}), Ember.Object.create({
		name: "Muppet Babies",
		google: 762000,
		popularity: 20,
		weirdness: 0.8,
		genre: ['comedy', 'kids'],
		medium: 'cartoon',
		characters: ['Nanny', 'Baby Fozzie Bear', 'Baby Piggy', 'Baby Gonzo', 'Baby Rowlf'],
		locations: ['the nursery', 'Doorknob World'],
		props: ['imagination', 'old toys', "Nanny's socks"],
		fuckingWat: true
	}), Ember.Object.create({
		name: "The Wonder Years",
		google: 747000,
		popularity: 20,
		weirdness: 0.75,
		genre: ['drama'],
		medium: 'TV',
		characters: ['Kevin Arnold', 'Winnie Cooper', 'Paul Joshua Pfeiffer', 'Wayne Arnold'],
		locations: ["Winnie's beddroom", "Lincoln Junior High", "McKinley High School", "NORCOM"],
		props: ['first car', 'first kiss', 'first fight'],
		fuckingWat: true
	}), Ember.Object.create({
		name: "Doctor Who",
		google: 31700000,
		popularity: 60,
		weirdness: 0.01,
		genre: ['sci-fi', 'adventure'],
		medium: 'tv',
		characters: ['The Doctor', 'Strax', 'River Song', 'The Master', 'Davros', 'Clara', 'Rory Willimas'],
		locations: ['Earth', 'TARDIS', 'Gallifrey', 'E-Space', 'Mondas'],
		props: ['sonic screw driver', 'TARDIS', 'Dalekanium', 'psychic paper'],
		fuckingWat: false
	}), Ember.Object.create({
		name: "Winnie-the-Pooh",
		google: 9810000,
		popularity: 20,
		weirdness: 0.68,
		genre: ['comedy', 'kids'],
		medium: 'book',
		characters: ['Winnie-the-Pooh', 'Piglet', 'Tigger', 'Christopher Robin', 'Eeyore', 'Hephalumps'],
		locations: ["The Hundred Acre Wood", "Six Pine Trees", "Where The Woozle Wasn't", "Pooh Corner", "Owl's House"],
		props: ['honey', 'Pooh Sticks', 'the North Pole', "Hephalumps"],
		fuckingWat: true
	}),
	Ember.Object.create({
		name: "Harry Potter",
		google: 9810000,
		popularity: 20,
		weirdness: 0.02,
		genre: ['comedy', 'kids', 'adnedture', 'fantasy', ],
		medium: 'book',
		characters: ['Harry Potter', 'Hagrid', 'Snape', 'Dobby', 'Petunia Dursley', 'Moaning Myrtle', 'Voldemort'],
		locations: ["Diagon Alley", "Hogwartz", "Privet Drive", "The Ministry of Magic", "The Chamber of Secrets"],
		props: ['the snitch', "horcrux", "invisibility cloak", "the elder wand", "the Whomping Willow"],
		fuckingWat: false
	})
]);