var NavigationItemSchema = new Schema({
	title: String,
	type_: String,
	icon: String,
	url: String,
	badge_title: String,
	badge_bg: String,
	badge_fg: String,

}
})
module.exports = mongoose.model('NavigationItem', NavigationItemSchema);
