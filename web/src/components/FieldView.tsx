interface IFieldView {
  value: string;
}

function FieldView({ value }: IFieldView) {
  return (
    <p className="content has-text-weight-normal p-2 field-view">{value}</p>
  );
}

export default FieldView;
