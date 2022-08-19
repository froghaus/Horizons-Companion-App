# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "csv"

anxieties = CSV.parse(File.read("lib/assets/horizons_tables/anxieties.csv"), headers: true)
cultures = CSV.parse(File.read("lib/assets/horizons_tables/cultures.csv"), headers: true)
items = CSV.parse(File.read("lib/assets/horizons_tables/items.csv"), headers: true)
knacks = CSV.parse(File.read("lib/assets/horizons_tables/knacks.csv"), headers: true)
misfortunes = CSV.parse(File.read("lib/assets/horizons_tables/misfortunes.csv"), headers: true)
passions = CSV.parse(File.read("lib/assets/horizons_tables/passions.csv"), headers: true)
roles = CSV.parse(File.read("lib/assets/horizons_tables/roles.csv"), headers: true)
skills = CSV.parse(File.read("lib/assets/horizons_tables/skills.csv"), headers: true)

anxieties.each do |anxiety|
	candidate = Anxiety.new(
		title: anxiety["title"],
		flavor_text: anxiety["flavor_text"],
		passive: anxiety["passive"],
		trigger: anxiety["trigger"]
	)

	if !Anxiety.find_by(title: candidate.title)
		candidate.save
	end
end

misfortunes.each do |misfortune|
	candidate = Misfortune.new(
		title: misfortune["title"],
		flavor_text: misfortune["flavor_text"],
		passive: misfortune["passive"],
		trigger: misfortune["trigger"]
	)

	if !Misfortune.find_by(title: candidate.title)
		candidate.save
	end
end

passions.each do |passion|
	candidate = Passion.new(
		title: passion["title"],
		flavor_text: passion["flavor_text"],
		passive: passion["passive"],
		trigger: passion["trigger"]
	)

	if !Passion.find_by(title: candidate.title)
		candidate.save
	end
end

roles.each do |role|
	candidate = Role.new(
		title: role["title"],
		description: role["description"],
		growth: role["growth"],
		training: role["training"],
		proficiencies: role["proficiencies"],
		combat_die: role["combat_die"],
		reaction_bonus: role["reaction_bonus"],
		ability_title: role["ability_name"],
		ability_text: role["ability_text"]
	)

	if !Role.find_by(title: candidate.title)
		candidate.save
	end
end

cultures.each do |culture|
	candidate = Culture.new(
		title: culture["title"],
		aspect_bonuses: culture["aspect_bonus_choices"],
		description: culture["description"]
	)

	if !Culture.find_by(title: candidate.title)
		candidate.save
	end
end

knacks.each do |knack|
	candidate = Knack.new(
		title: knack["title"],
		rules_text: knack["rules_text"],
		options: knack["options"],
	)

	if knack["owned_by"] == "Role"
		candidate.role = Role.find_by(title: knack["option_for"])
		candidate.culture = Culture.find_by(title: "No Culture")
	elsif knack["owned_by"] == "Culture"
		candidate.culture = Culture.find_by(title: knack["option_for"])
		candidate.role = Role.find_by(title: "No Role")
	end

	if !Knack.where(title: candidate.title, role: candidate.role, culture: candidate.culture).first
		candidate.save
	end
end

skills.each do |skill|
	candidate = Skill.new(
		title: skill["title"],
		action_type: skill["action_type"],
		focus: skill["focus"],
		trigger: skill["trigger"],
		rules_text: skill["rules_text"],
		options: skill["options"],
		starting: skill["starting"],
		role: Role.find_by(title: skill["option_for"])
	)

	if !Skill.where(title: candidate.title, role: candidate.role).first
		candidate.save
	end
end

items.each do |item|
	candidate = Item.new(
		title: item["title"],
		category: item["category"],
		sub_category: item["sub_category"],
		tags: item["tags"],
		damage: item["damage"],
		reach: item["reach"],
		toughness: item["toughness"],
		durability: item["durability"],
		flavor_text: item["flavor_text"],
		rules_text: item["rules_text"],
		bulk: item["bulk"],
		crafting_repair_string: item["crafting_repair"],
		uses: item["uses"],
		action_type: item["action_type"]
	)

	if !Item.find_by(title: candidate.title)
		candidate.save
	end
end

if !User.first.characters
Character.new(
  role: Role.find_by(title: "Muscle"),
  culture: Culture.find_by(title: "Warrior Culture"),
  user: User.first,
  passion: Passion.find_by(title: "Craftwork"),
  name: "Derkhu Menghe",
  physique: 12,
  motor: 8,
  social: 10,
  reason: 8,
  wits: 4,
  athletic: 8,
  convincing: 8,
  expressive: 8,
  graceful: 6,
  intuitive: 8,
  perceptive: 8,
  rugged: 8,
  studious: 6,
  subtle: 8,
  tactile: 10,
  combat: 10,
  grit: 8,
  reflexes: 8,
  resolve: 6,
  athletic_bonus: 2,
  rugged_bonus: 2,
  grit_bonus: 2,
  current_vitality: 2
)
end