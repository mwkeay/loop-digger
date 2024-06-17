"use client";

import { useState, createContext, useContext, ReactNode, Fragment } from "react";
import "@/app/styles/PrettyJSON.css";

const OpenObjectsContext = createContext<{
	openObjects: string[][]
	closeObject: (key: string[]) => void
	openObject: (key: string[]) => void
}>({
	openObjects: [],
	closeObject: () => {
		// This function is intentionally empty and will be replaced in the provider
	},
	openObject: () => {
		// This function is intentionally empty and will be replaced in the provider
	},
});

const PrettyKey = (props: { keyName: string, depth: number }) => (
	<span className={`pretty key depth-${props.depth}`}>
		<span className={`pretty key depth-${props.depth} speechmarks`}>&quot;</span>
		{props.keyName}
		<span className={`pretty key depth-${props.depth} speechmarks`}>&quot;</span>
	</span>
);

const PrettyStringValue = (props: { value: string, depth: number }) => (
	<span className={`pretty value string depth-${props.depth}`}>
		<span className={`pretty value string depth-${props.depth} speechmarks`}>&quot;</span>
		{props.value}
		<span className={`pretty value string depth-${props.depth} speechmarks`}>&quot;</span>
	</span>
);

const PrettyNumberValue = (props: { value: number, depth: number }) => (
	<span className={`pretty value number depth-${props.depth}`}>
		{props.value}
	</span>
);

const PrettyValue = (props: { value: bigint | boolean | symbol | undefined, depth: number }) => (
	<span className={`pretty value depth-${props.depth}`}>
		{JSON.stringify(props.value)}
	</span>
);

const PrettyClosedObject = (props: { onClick: () => void }) => (
	<span onClick={() => props.onClick()}>
		<span className='pretty brackets'>{"{"}</span>
		...
		<span className='pretty brackets'>{"}"}
	</span></span>
);

interface PrettyObjectProps {
	obj: object,
	depth: number,
	indentation: number,
	parent: string[],
	forceOpen?: boolean
}

const PrettyObject: React.FC<PrettyObjectProps> = ({
	obj,
	depth,
	indentation,
	parent,
}) => {
	const { openObjects, closeObject, openObject } = useContext(OpenObjectsContext);

	if (Object.keys(obj).length === 0) return (
		<Fragment>
			<span className='pretty brackets'>
				{"{}"}
			</span>
		</Fragment>
	);

	const entries: ReactNode[] = [];
	const push = (...items: ReactNode[]) => entries.push(items);

	// WARNING: "build" is a recursive function. If broken, the page may freeze.
	const build = (obj: object, depth: number) => {
		push(<span className='pretty brackets' onClick={() => closeObject(parent)}>{"{"}</span>);

		const keys = Object.keys(obj);
		const lastKey = keys[keys.length - 1];

		for (const [key, value] of Object.entries(obj)) {

			push(
				"\n" + (" ".repeat((depth + 1) * indentation)),
				<PrettyKey keyName={key} depth={depth} />,
				": "
			);

			if (typeof value === "string") push(<PrettyStringValue value={value} depth={depth} />);

			else if (typeof value === "number") push(<PrettyNumberValue value={value} depth={depth} />);

			else if (value && typeof value === "object") {
				// if object is in openObjects
				if (openObjects.some(array => JSON.stringify(array) === JSON.stringify([...parent, key]))) {
					push(<PrettyObject obj={value} depth={depth + 1} indentation={indentation} parent={[...parent, key]} />);
				}
				else push(<PrettyClosedObject onClick={() => openObject([...parent, key])} />);
			}
			else {
				push(<PrettyValue value={value} depth={depth} />);
			}

			if (key !== lastKey) push(",");
		}

		push(
			"\n",
			" ".repeat(depth * indentation),
			<span className='pretty brackets'>{"}"}</span>
		);
	};

	build(obj, depth);

	return (
		<Fragment>
			{entries}
		</Fragment>
	);
};

export const PrettyJSON = (props: { json: object, indentation: number }) => {
	const [openObjects, setOpenObjects] = useState<string[][]>([]);

	const closeObject = (key: string[]) => {
		setOpenObjects((prev: string[][]) => prev.filter((item) => JSON.stringify(item) !== JSON.stringify(key)));
	};

	const openObject = (key: string[]) => {
		setOpenObjects((prev: string[][]) => [...prev, key]);
	};

	return (
		<OpenObjectsContext.Provider
			value={{ openObjects, closeObject, openObject }}
		>
			<pre className="pretty-json">
				<PrettyObject obj={props.json} depth={0} indentation={props.indentation} parent={[]} forceOpen={true} />
			</pre>
		</OpenObjectsContext.Provider>
	);
};

export default PrettyJSON;
