import Topbar from "@/components/Topbar";

export default function ModulePlaceholder({ title, description, Icon }) {
  return (
    <>
      <Topbar title={title} />
      <div className="p-8">
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-white py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <Icon size={28} />
          </div>
          <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
          <p className="mt-1 max-w-md text-sm text-stone-500">{description}</p>
          <span className="mt-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
            En construcción
          </span>
        </div>
      </div>
    </>
  );
}
