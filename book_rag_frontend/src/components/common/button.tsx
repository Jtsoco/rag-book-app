
export interface buttonProps {
  onClick: () => void;
  text: string;
}
export function Button(props: buttonProps ) {
  return (
    <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded" onClick={props.onClick}>
      {props.text}
    </button>
  );
}
