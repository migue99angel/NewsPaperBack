var mongoose = require('mongoose');

var NewspaperEntrySchema = new mongoose.Schema({
    id: { type: Number, default: '', unique: true },
	title: { type: String, default: ''},
	image: { type: String, default: ''},
	link: { type: String, default: ''},
	abstract: { type: String, default: ''},
	publisher: {
        id: { type: Number, default: '' },
        name: { type: String, default: ''},
        joined_date: { type: Date, default: '' }
	},
	languages: { type: [String], default: []},
	creation_date: { type: Date, default: '' }
})

mongoose.model('NewspaperEntry', NewspaperEntrySchema);