import React, { FC } from 'react';
import { Text } from 'ink';
import SelectInput from 'ink-select-input';

interface ItemType {
	label: string;
	value: string;
}

const App: FC<{ name?: string }> = () => {
	const handleSelect = (item: ItemType) => {
		console.log(item);
	}

	const items: ItemType[] = [
		{
			label: '业务项目',
			value: 'first'
		},
		{
			label: '库项目',
			value: 'second'
		}
	]

	return (
		<>
			<Text color="green">请选择所要创建的项目</Text>
			<SelectInput items={items} onSelect={handleSelect} />
		</>
	)
}


export default App;
