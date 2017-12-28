
import React from 'react'

import { ListItem } from 'material-ui/List'
import Toggle from 'material-ui/Toggle'

import WarningIcon from 'material-ui/svg-icons/alert/warning';
import BuildIcon from 'material-ui/svg-icons/action/build';


import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'


const styles = {
	pending: {
		color: 'gray'
	},
	toggleButton: {
		position: 'absolute',
		display: 'block',
		top: '0px',
		right: '4px',
		padding: '12px',
		border: 'none',
		background: 'none'
	}
}

const Device = ({
	id,
	type,
	name,
	nameDevice,
	...device
}) => {
	if (!type) {
		return <ListItem
			style={styles.pending}
			key={id}
			primaryText={`Pending Device - ${id}`}
			disabled={true}
			rightIcon={<WarningIcon />}
		/>
	}
	if (!name) {
		let name = ''
		return <ListItem
			key={id}
			primaryText={`New Device - ${id}`}
			rightIcon={<BuildIcon />}
		>
			<TextField hintText="Name this device" onChange={(e, newName) => {
				name = newName
			}}/>
			<FlatButton label="words" onClick={
				() => nameDevice({
					id,
					name
				})
			} />
		</ListItem>
	}
	switch (type) {
		case 'lamp':
			return <ListItem
				key={id}
				primaryText={name}
				rightIconButton={<button style={styles.toggleButton}>
					<Toggle
						toggled={device.light.on}
					/>
				</button>}
			/>
	}
}

export default Device
