import React, { Fragment, useState } from "react"

const AboutSection = props => {
	const [editingAbout, setEditingAbout] = useState(false)

	const toggleAbout = () => {
		setEditingAbout(true)
	}

	const submitEdits = event => {
		event.preventDefault()
		props.handleFormSubmit(event)
		setEditingAbout(false)
	}

	
	let about
	if (editingAbout) {
		about = (
			<form onSubmit={submitEdits} >
				<div className="campaign-about-section" >
					<div className="grid-x about-header" >
						<h6 className="cell auto text-left horizons-title-font bold about-title-text"> About: </h6>
						<div>
							<input type="submit" className="cell shrink text-center horizons-body-font thin-button" value="save" />
						</div>
					</div>
					<hr/>
					<div className="campaign-about-body horizons-body-font" >
						<textarea
							rows={9}
							cols={50} 
							name="description"
							id="description"
							type="text"
							onChange={props.handleChange}
							value={props.editPayload.description}
						/>
					</div>
				</div>
			</form>
		)
	} else {
		let editable
		if (props.owner) {
			editable = (
				<p onClick={toggleAbout} className="cell shrink text-center horizons-body-font edit-toggle"> edit </p>
			)
		}
		
		about = (
			<div className="campaign-about-section" >
				<div className="grid-x about-header" >
					<h6 className="cell auto text-left horizons-title-font bold about-title-text"> About: </h6>
					{editable}
				</div>
				<hr/>
				<div className="campaign-about-body " >
						<pre>
							<span className="horizons-body-font">
								{props.description} 
							</span>
						</pre>
					</div>
			</div>
		)
	}

	return (
		<Fragment >
			{about}
		</Fragment>
	)
}

export default AboutSection