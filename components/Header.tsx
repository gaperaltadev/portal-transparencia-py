import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface HeaderProps {
  breadcrumb?: BreadcrumbItem[];
}

export default function Header({ breadcrumb }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-md" aria-hidden="true" />
          <div>
            <p className="font-bold text-gray-900 leading-tight text-sm">Transparencia Municipal PY</p>
            <p className="text-xs text-gray-500">Gastos públicos · Paraguay</p>
          </div>
        </Link>

        {breadcrumb && (
          <nav aria-label="Ruta de navegación" className="ml-2">
            <ol className="flex items-center gap-2 text-sm text-gray-500">
              {breadcrumb.map((item, i) => (
                <li key={item.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-blue-600 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-700 font-medium" aria-current="page">
                      {item.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    </header>
  );
}
