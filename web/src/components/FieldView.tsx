interface IFieldView {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

function FieldView({ value }: IFieldView) {
  return (
    <p className="content has-text-weight-normal p-2 field-view">{value}</p>
  );
}

export default FieldView;
