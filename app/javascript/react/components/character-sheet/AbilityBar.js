import React, { useState } from "react"
import SkillCard from "./SkillCard"
import KnackCard from "./KnackCard"
import BackstoryCard from "./BackstoryCard"

const AbilityBar = props => {
	const [knacksExpanded, setKnacksExpanded] = useState(false)
	const [skillsExpanded, setSkillsExpanded] = useState(false)
	const [backstoryExpanded, setBackstoryExpanded] = useState(false)

	const toggleKnacks = () => {
		if (knacksExpanded) {
			setKnacksExpanded(false)
		} else {
			setKnacksExpanded(true)
		}
	}

	const toggleSkills = () => {
		if (skillsExpanded) {
			setSkillsExpanded(false)
		} else {
			setSkillsExpanded(true)
		}
	}

	const toggleBackstory = () => {
		if (backstoryExpanded) {
			setBackstoryExpanded(false)
		} else {
			setBackstoryExpanded(true)
		}
	}



	let backstorySection
	if (backstoryExpanded) {
		let passion = {
			...props.passion,
			type: "Passion"
		}

		let anxieties = props.anxieties.map( anxiety => {
			return { 
				...anxiety,
				type: "Anxiety"
			}
		})

		let misfortunes = props.misfortunes.map( misfortune => {
			return { 
				...misfortune,
				type: "Misfortune"
			}
		})

		let backstoryAll = [passion].concat(misfortunes, anxieties)
		const backstory = backstoryAll.map( element => {
			return (
				<BackstoryCard
					key={element.id}
					type={element.type}
					title={element.title}
					passive={element.passive}
					trigger={element.trigger}
					flavor_text={element.flavor_text}
				/>
			)
		})

		backstorySection = (
			<div className="cell small-12 about-section-mini" >
				<div onClick={toggleBackstory} >
					<h6 className="horizons-title-font bold card-section-header"> Backstory Elements </h6>
					<hr className="row-splitter" />
				</div>
				<div className="grid-x grid-margin-x">
					{backstory}
				</div>
			</div>
		)
	} else {
		backstorySection = (
			<div onClick={toggleBackstory} className="cell auto text-center about-section-mini horizons-body-font bold expandable" >
				Backstory
			</div>
		)
	}

	let knacksSection
	if (knacksExpanded) {
		const knacks = props.knacks.map( knack => {
			return (
				<KnackCard
					key={knack.id}
					title={knack.title}
					rules_text={knack.rules_text}
					options={knack.options}
				/>
			)
		})

		knacksSection = (
			<div className="cell small-12 about-section-mini" >
				<div onClick={toggleKnacks} >
					<h6 className="horizons-title-font bold card-section-header"> Knacks </h6>
					<hr className="row-splitter" />
				</div>
				<div className="grid-x grid-margin-x">
					{knacks}
				</div>
			</div>
		)
	} else {
		knacksSection = (
			<div onClick={toggleKnacks} className="cell auto text-center about-section-mini horizons-body-font bold expandable" >
				Knacks
			</div>
		)
	}

	let skillsSection
	if (skillsExpanded) {
		const skills = props.skills.map( skill => {
			return (
				<SkillCard
					key={skill.id}
					title={skill.title}
					action_type={skill.action_type}
					focus={skill.focus}
					trigger={skill.trigger}
					rules_text={skill.rules_text}
					options={skill.options}
				/>
			)
		})

		skillsSection = (
			<div className="cell small-12 about-section-mini" >
				<div onClick={toggleSkills} >
					<h6 className="horizons-title-font bold card-section-header"> Skills </h6>
					<hr className="row-splitter" />
				</div>
				<div className="grid-x grid-margin-x">
					{skills}
				</div>
			</div>
		)
	} else {
		skillsSection = (
			<div onClick={toggleSkills} className="cell auto text-center about-section-mini horizons-body-font bold expandable" >
				Skills
			</div>
		)
	}

	return (
		<div className="callout landing-page-tile char-sheet-element" >

			<div className="grid-x grid-margin-x ability-row">
				<div className="cell small-12 medium-9 grid-x grid-margin-x">
					<div className="cell small-12 medium-6 about-section-mini" >
						<h6 className="text-left horizons-title-font bold"> Proficiencies: </h6>
						<hr/>
						<div className="horizons-body-font" >
							{props.text_info.proficiencies} &nbsp;
							<i className="reminder-text" >{`(You take +1 to any roll using one of these.)`}</i> 
						</div>
					</div>

					<div className="cell small-12 medium-6 about-section-mini" >
						<h6 className="text-left horizons-title-font bold"> Training: </h6>
						<hr/>
						<div className="horizons-body-font" >
							{props.text_info.training} &nbsp;
							<i className="reminder-text" >{`(You can use these all without taking disadvantage.)`}</i> 
						</div>
					</div>

				</div>

				<div className="cell auto grid-x grid-margin-x reaction-die-section">

					<div className="cell small-6 medium-12 grid-x">
						<div className="cell small-12 horizons-body-font text-center bold">
							Combat Die
						</div>
						<div className="cell small-8 horizons-body-font text-center reaction-die-badge">
							<span> d{props.combat_die} </span> 
						</div>
					</div>

					<div className="cell small-6 medium-12 grid-x text-center reaction-die-unit">
						<div className="cell small-12 horizons-body-font text-center bold">
							Speed
						</div>
						<div className="cell small-8 horizons-body-font text-center reaction-die-badge">
							<span> {props.speed} ft  </span> 
						</div>
					</div>

				</div>

			</div>

			<hr className="row-splitter"/>

			<div className="grid-x grid-margin-x ability-row" >
				{backstorySection}
				{knacksSection}
				{skillsSection}
			</div>
			
		</div>
	)
}

export default AbilityBar