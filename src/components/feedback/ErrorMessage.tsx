export interface Props {
  message: string;
}

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-70px)]">
      <img
        className="max-w-[480px]"
        src="./images/error.svg"
        alt="Error Robot"
      />
      <h4 className="font-bold">
        { message }
      </h4>
    </div>
  );
}
