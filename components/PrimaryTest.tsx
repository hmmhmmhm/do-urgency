import style from "./PrimaryTest.scss";

export interface IPrimaryTestProps {
  name: string;
}

const PrimaryTest = (props: IPrimaryTestProps) => {
  return (
    <>
      <div className="primaryTest">
        <div>{props.name}</div>
      </div>

      <style jsx>{style}</style>
    </>
  );
};

export default PrimaryTest;
