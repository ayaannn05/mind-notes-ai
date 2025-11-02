import FormattedMarkdown from "../../utils/FormattedMarkdown";
const DetailNotes = ({ note }) => {
  return (
    <div className="prose max-w-none">
      <FormattedMarkdown>{note.notes}</FormattedMarkdown>
    </div>
  );
};

export default DetailNotes;
