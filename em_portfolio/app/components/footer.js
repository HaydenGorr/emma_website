import strings from '../string_consts.json'

export default function Em_footer() {
  return (
    <div>
        <div className="bg-blue-smoke-100 rounded-t-md p-4 justify-around flex">
            <p>{strings.footer_text[0]}</p>
            <p>{strings.footer_text[1]}</p>
        </div>
    </div>
  );
}
