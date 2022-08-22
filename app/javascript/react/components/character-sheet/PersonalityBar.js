import { faL } from "@fortawesome/free-solid-svg-icons"
import { property, set } from "lodash"
import React, { useEffect, useState } from "react"
import Dropzone from "react-dropzone"

const PersonalityBar = props => {
	const [expanded, setExpanded] = useState(true)
	const [editingBio, setEditingBio] = useState(false)
	const [editingAbout, setEditingAbout] = useState(false)
	const [editPayload, setEditPayload] = useState({})
	const [editingImage, setEditingImage] = useState(false)

	useEffect(() => {
		setEditPayload({
			bio: props.text_info.bio,
			description: props.text_info.description,
			level: props.leveling_info.level,
			experience: props.leveling_info.experience
		})
	}, [props.character])

	const toggleExpanded = (event) => {
		if (expanded) {
			setExpanded(false)
		} else {
			setExpanded(true)
		}
	}

	const toggleBio = (event) => {
		if (editingBio) {
			setEditingBio(false)
		} else {
			setEditingBio(true)
		}
	}

	const toggleAbout = (event) => {
		if (editingAbout) {
			setEditingAbout(false)
		} else {
			setEditingAbout(true)
		}
	}

	const toggleImage = (event) => {
		if (editingImage) {
			setEditingImage(false)
		} else {
			setEditingImage(true)
		}
	}

	const handleChange = (event) => {
		setEditPayload ({
      ...editPayload,
			[event.currentTarget.name]: event.currentTarget.value
    })
	}

	const handleFormSubmit = (event) => {
		event.preventDefault()

		let payload = new FormData()
		payload.append("image", editPayload.image)
		payload.append("bio", editPayload.bio)
		payload.append("description", editPayload.description)
		payload.append("level", editPayload.level)
		payload.append("experience", editPayload.experience)
		
		props.updateCharacter(payload)

		setEditingAbout(false)
		setEditingBio(false)
		setEditingImage(false)
	}

	const handleFileUpload = (acceptedFiles) => {
		setEditPayload({
			...editPayload,
			image: acceptedFiles[0]
		})
	}

	const growth = () => {
		const roleGrowth = props.role.growth.split("//")
		const misfortuneGrowth = props.misfortunes.map( misfortune => `Triggered your "${misfortune.title}" misfortune.` )
		const anxietyGrowth = props.anxieties.map( anxiety => `Triggered your "${anxiety.title}" anxiety.`)
		const allGrowth = [].concat(roleGrowth, misfortuneGrowth, anxietyGrowth)
		return allGrowth.map( growth => {
			return (
				<li className="growth-text" key={growth} >
					{growth}
				</li>
			)
		})
	}

	let image
	if (editingImage) {
		image = (
			<form onSubmit={handleFormSubmit} className="character-sheet-image-editing">
				<div>
					<label className="horizons-body-text bold"> Upload New Image:
						<Dropzone onDrop={handleFileUpload}>
							{({getRootProps, getInputProps}) => (
								<section>
									<div {...getRootProps()}>
										<input {...getInputProps()} />
										<p className="horizons-body-font">Drag a new image here, or click to upload one locally</p>
									</div>
								</section>
							)}
						</Dropzone>
					</label>
				</div>

				<div className="button-group" >
					<input type="submit" className="button bold horizons-body-font" value="Upload" />
					<div onClick={toggleImage} className="button bold horizons-body-font alert" > Cancel </div>
				</div>
			</form>
		)
	} else {
		image = (
				<img onClick={toggleImage} src={props.image.url} className="character-sheet-image" />
		)
	}

	let bio
	if (editingBio) {
		bio = (
			<form onSubmit={handleFormSubmit} >
				<div className="about-section" >
					<div className="grid-x about-header" >
						<h6 className="cell auto text-left horizons-title-font bold about-title-text"> Bio: </h6>
						<div>
							<input type="submit" className="cell small-2 text-center horizons-body-font thin-button" value="save" />
						</div>
					</div>
					<hr/>
					<div className="about-body horizons-body-font" >
						<textarea
							rows={4}
							cols={50} 
							name="bio"
							id="bio"
							type="text"
							onChange={handleChange}
							value={editPayload.bio}
						/>
					</div>
				</div>
			</form>
		)
	} else {
		bio = (
			<div className="about-section" >
				<div className="grid-x about-header" >
					<h6 className="cell auto text-left horizons-title-font bold about-title-text"> Bio: </h6>
					<p onClick={toggleBio} className="cell small-1 text-center horizons-body-font edit-toggle"> edit </p>
				</div>
				<hr/>
				<div className="about-body horizons-body-font" >
					{props.text_info.bio} 
				</div>
			</div>
		)
	}

	let about
	if (editingAbout) {
		about = (
			<form onSubmit={handleFormSubmit} >
				<div className="about-section" >
					<div className="grid-x about-header" >
						<h6 className="cell auto text-left horizons-title-font bold about-title-text"> About: </h6>
						<div>
							<input type="submit" className="cell small-2 text-center horizons-body-font thin-button" value="save" />
						</div>
					</div>
					<hr/>
					<div className="about-body horizons-body-font" >
						<textarea
							rows={4}
							cols={50} 
							name="description"
							id="description"
							type="text"
							onChange={handleChange}
							value={editPayload.description}
						/>
					</div>
				</div>
			</form>
		)
	} else {
		about = (
			<div className="about-section" >
				<div className="grid-x about-header" >
					<h6 className="cell auto text-left horizons-title-font bold about-title-text"> About: </h6>
					<p onClick={toggleAbout} className="cell small-1 text-center horizons-body-font edit-toggle"> edit </p>
				</div>
				<hr/>
				<div className="about-body horizons-body-font" >
					{props.text_info.description} 
				</div>
			</div>
		)
	}

	let section
	if (expanded) {
		section = (
			<div className="grid-x grid-margin-x callout landing-page-tile char-sheet-element">
				<div className="cell small-12 large-3 character-card-image-wrapper">
					{image}
				</div>

				<div className="cell small-12 large-5 text-center " >
					<h2 className="horizons-title-font sheet-header bold" >{props.name}</h2>
					<h3 className="horizons-body-font subtitle" > {`the ${props.role.title}`} </h3>
					<div className="leveling-section callout cell small-12 text-center grid-x grid-margin-x">
						<div className="cell small-6 horizons-body-font char-sheet-text text-right" > 
							{`Level: ${props.leveling_info.level}`} 
						</div>

						<div className="cell small-6 horizons-body-font char-sheet-text text-left" > 
							{`EXP: ${props.leveling_info.experience}`} 
						</div>

						<div className="cell small-12 horizons-body-font button bold" >
							Spend Experience
						</div>

						<div className="cell small-12" >
							<p className="growth-reminder-text growth-text horizons-body-font"> At the end of a session, you gain 1 experience for each of the following you accomplished: </p>
							<div className="growth-options-div" >
								<ul className="horizons-body-font growth-section">
									{growth()}
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="cell small-12 large-4" >
					{bio}
					{about}
				</div>
				<div className="cell auto button bold horizons-body-text expanded" onClick={toggleExpanded} > Hide </div>
			</div>
		)
	} else {
		section = (
			<div className="callout landing-page-tile char-sheet-element text-center unexpanded" onClick={toggleExpanded} >
				<h2 className="horizons-title-font sheet-header bold" >{props.name}</h2>
				<h3 className="horizons-body-font subtitle" > {`the ${props.role.title}`} </h3>
			</div>
		)
	}

	return (
		<div>
			{section}
		</div>
	)
}

export default PersonalityBar