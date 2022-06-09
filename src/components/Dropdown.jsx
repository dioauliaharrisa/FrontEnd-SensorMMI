export default function Dropdown({ text }) {
  return (
    <div className="mt-2 pl-3 w-48 h-6 border border-slate-300 text-slate-300 rounded-sm bg-white">
      {text}
      <div className="flex float-right h-full w-8 bg-slate-300 justify-center items-center">
        <i class="fa-solid fa-caret-down text-slate-700"></i>
      </div>
    </div>
  );
}
