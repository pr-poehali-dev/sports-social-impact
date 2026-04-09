import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SECTIONS = [
  { id: "results", label: "Результаты" },
  { id: "sources", label: "Источники" },
  { id: "conclusions", label: "Выводы" },
];

const STATS_DATA = [
  {
    category: "Цифровизация образования",
    rows: [
      { label: "Использование цифровых технологий в учебном процессе", value: 87 },
      { label: "Внедрение дистанционного обучения", value: 73 },
      { label: "Удовлетворённость студентов онлайн-форматом", value: 61 },
      { label: "Готовность преподавателей к цифровым инструментам", value: 54 },
    ],
  },
  {
    category: "Академическая успеваемость",
    rows: [
      { label: "Улучшение успеваемости при смешанном обучении", value: 78 },
      { label: "Снижение отсева при адаптивных программах", value: 42 },
      { label: "Рост научной активности студентов", value: 66 },
      { label: "Эффективность проектного обучения", value: 81 },
    ],
  },
  {
    category: "Социальная интеграция",
    rows: [
      { label: "Инклюзивность образовательной среды", value: 59 },
      { label: "Межкультурная коммуникация в группах", value: 47 },
      { label: "Доступность образовательных ресурсов", value: 70 },
    ],
  },
];

const SOURCES = [
  {
    id: 1,
    authors: "Иванов А. В., Петрова М. Н.",
    year: 2023,
    title: "Цифровая трансформация высшего образования: вызовы и перспективы",
    journal: "Педагогика и психология образования",
    volume: "№ 4",
    pages: "С. 12–28",
    type: "Статья",
    url: "#",
  },
  {
    id: 2,
    authors: "Смирнов Д. К.",
    year: 2022,
    title: "Адаптивные образовательные технологии в современном университете",
    journal: "Высшее образование в России",
    volume: "Т. 31, № 6",
    pages: "С. 45–61",
    type: "Статья",
    url: "#",
  },
  {
    id: 3,
    authors: "Козлова Е. С., Фёдоров П. Р., Новикова Т. Л.",
    year: 2023,
    title: "Инклюзивность как принцип организации образовательного пространства",
    journal: "Социология образования",
    volume: "№ 2",
    pages: "С. 88–104",
    type: "Статья",
    url: "#",
  },
  {
    id: 4,
    authors: "Романов В. А.",
    year: 2021,
    title: "Методология исследования качества образования",
    journal: "— М.: Издательство МГУ",
    volume: "",
    pages: "312 с.",
    type: "Монография",
    url: "#",
  },
  {
    id: 5,
    authors: "UNESCO",
    year: 2022,
    title: "Global Education Monitoring Report 2022",
    journal: "UNESCO Publishing",
    volume: "",
    pages: "480 p.",
    type: "Доклад",
    url: "https://en.unesco.org/gem-report",
  },
  {
    id: 6,
    authors: "Быкова О. П., Шевченко И. В.",
    year: 2023,
    title: "Проектное обучение как инструмент развития профессиональных компетенций",
    journal: "Вопросы образования",
    volume: "№ 1",
    pages: "С. 33–52",
    type: "Статья",
    url: "#",
  },
];

const CONCLUSIONS = [
  {
    number: "01",
    title: "Цифровые технологии как инфраструктура",
    text: "Исследование подтверждает высокий уровень внедрения цифровых инструментов (87%), однако выявляет значительный разрыв между технической оснащённостью и готовностью преподавательского состава к их эффективному применению (54%).",
  },
  {
    number: "02",
    title: "Смешанное обучение — наиболее результативная модель",
    text: "Показатель улучшения успеваемости при смешанном обучении (78%) и эффективности проектного метода (81%) указывают на целесообразность дальнейшего масштабирования гибридных образовательных форматов.",
  },
  {
    number: "03",
    title: "Инклюзивность требует системной поддержки",
    text: "Относительно невысокие показатели инклюзивности (59%) и межкультурной коммуникации (47%) свидетельствуют о необходимости разработки специализированных программ социальной интеграции в академической среде.",
  },
];

const RECOMMENDATIONS = [
  "Разработать и внедрить программы повышения цифровой компетентности преподавательского состава с акцентом на педагогические аспекты технологий.",
  "Создать институциональную модель смешанного обучения, регламентирующую распределение аудиторной и дистанционной нагрузки.",
  "Сформировать межфакультетские рабочие группы по инклюзивному образованию с привлечением студенческих представителей.",
  "Провести лонгитюдное исследование влияния адаптивных технологий на снижение академического отсева в трёхлетней перспективе.",
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function StatBar({ value, delay = 0 }: { value: number; delay?: number }) {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="relative h-2 rounded-sm overflow-hidden" style={{ background: "var(--muted)" }}>
      <div
        className="absolute inset-y-0 left-0 rounded-sm"
        style={{
          background: "linear-gradient(to right, var(--navy-mid), var(--gold))",
          width: inView ? `${value}%` : "0%",
          transition: inView ? `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms` : "none",
        }}
      />
    </div>
  );
}

function ResultsSection() {
  return (
    <section id="results" className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold font-ibm"
          style={{ background: "var(--navy-mid)" }}
        >
          I
        </div>
        <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--navy-deep)" }}>
          Результаты и статистика
        </h2>
      </div>
      <div className="divider-gold mb-8" />

      {STATS_DATA.map((group, gi) => (
        <div key={gi} className="mb-10">
          <h3
            className="font-ibm text-xs uppercase mb-5"
            style={{ color: "var(--gold)", letterSpacing: "0.15em" }}
          >
            {group.category}
          </h3>

          <div className="border rounded-sm overflow-hidden" style={{ borderColor: "var(--divider)" }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: "var(--navy-deep)" }}>
                  <th className="text-left px-5 py-3 font-ibm font-medium text-xs uppercase text-white" style={{ letterSpacing: "0.1em" }}>
                    Показатель
                  </th>
                  <th className="text-right px-5 py-3 font-ibm font-medium text-xs uppercase text-white w-16" style={{ letterSpacing: "0.1em" }}>
                    %
                  </th>
                  <th className="px-5 py-3 w-48 hidden md:table-cell" />
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b last:border-0 transition-colors"
                    style={{
                      borderColor: "var(--divider)",
                      background: ri % 2 === 0 ? "#fff" : "var(--surface)",
                    }}
                  >
                    <td className="px-5 py-4 font-ibm text-sm" style={{ color: "var(--text-body)" }}>
                      {row.label}
                    </td>
                    <td
                      className="px-5 py-4 text-right font-cormorant text-xl font-semibold"
                      style={{ color: "var(--navy-mid)" }}
                    >
                      {row.value}%
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <StatBar value={row.value} delay={ri * 80} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  );
}

function SourcesSection() {
  const [filter, setFilter] = useState("Все");
  const types = ["Все", "Статья", "Монография", "Доклад"];
  const filtered = filter === "Все" ? SOURCES : SOURCES.filter((s) => s.type === filter);

  return (
    <section id="sources" className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold font-ibm"
          style={{ background: "var(--navy-mid)" }}
        >
          II
        </div>
        <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--navy-deep)" }}>
          Список источников и ссылок
        </h2>
      </div>
      <div className="divider-gold mb-6" />

      <div className="flex gap-2 mb-6 flex-wrap items-center">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className="px-4 py-1.5 text-xs font-ibm font-medium uppercase rounded-sm border transition-all"
            style={{
              letterSpacing: "0.1em",
              background: filter === t ? "var(--navy-mid)" : "transparent",
              color: filter === t ? "#fff" : "var(--text-muted)",
              borderColor: filter === t ? "var(--navy-mid)" : "var(--divider)",
            }}
          >
            {t}
          </button>
        ))}
        <span className="ml-auto font-ibm text-xs" style={{ color: "var(--text-muted)" }}>
          {filtered.length} {filtered.length === 1 ? "источник" : filtered.length < 5 ? "источника" : "источников"}
        </span>
      </div>

      <div className="border rounded-sm overflow-hidden" style={{ borderColor: "var(--divider)" }}>
        {filtered.map((src, i) => (
          <div
            key={src.id}
            className="flex gap-4 px-5 py-4 border-b last:border-0"
            style={{
              borderColor: "var(--divider)",
              background: i % 2 === 0 ? "#fff" : "var(--surface)",
            }}
          >
            <span
              className="font-cormorant text-2xl font-semibold mt-0.5 w-7 shrink-0 text-right"
              style={{ color: "var(--gold)" }}
            >
              {src.id}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-ibm text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
                <span style={{ color: "var(--text-muted)" }}>{src.authors}</span>
                {" "}({src.year}).{" "}
                <em>{src.title}</em>.{" "}
                <span style={{ color: "var(--text-muted)" }}>
                  {src.journal}{src.volume ? `, ${src.volume}` : ""}{src.pages ? `. ${src.pages}` : ""}
                </span>
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span
                  className="text-xs font-ibm uppercase px-2 py-0.5 rounded-sm"
                  style={{ background: "var(--secondary)", color: "var(--text-muted)", letterSpacing: "0.08em" }}
                >
                  {src.type}
                </span>
                {src.url && src.url !== "#" && (
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-ibm hover:opacity-70 transition-opacity"
                    style={{ color: "var(--navy-light)" }}
                  >
                    <Icon name="ExternalLink" size={12} />
                    Открыть источник
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConclusionsSection() {
  return (
    <section id="conclusions" className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold font-ibm"
          style={{ background: "var(--navy-mid)" }}
        >
          III
        </div>
        <h2 className="font-cormorant text-3xl font-semibold" style={{ color: "var(--navy-deep)" }}>
          Выводы и рекомендации
        </h2>
      </div>
      <div className="divider-gold mb-8" />

      <h3 className="font-ibm text-xs uppercase mb-6" style={{ color: "var(--gold)", letterSpacing: "0.15em" }}>
        Основные выводы
      </h3>

      <div className="grid gap-4 mb-10">
        {CONCLUSIONS.map((c) => (
          <div
            key={c.number}
            className="flex gap-6 p-6 border rounded-sm"
            style={{ borderColor: "var(--divider)", background: "#fff" }}
          >
            <div
              className="font-cormorant text-4xl font-bold leading-none shrink-0 select-none"
              style={{ color: "var(--divider)" }}
            >
              {c.number}
            </div>
            <div>
              <h4 className="font-cormorant text-xl font-semibold mb-2" style={{ color: "var(--navy-deep)" }}>
                {c.title}
              </h4>
              <p className="font-ibm text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {c.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="font-ibm text-xs uppercase mb-6" style={{ color: "var(--gold)", letterSpacing: "0.15em" }}>
        Практические рекомендации
      </h3>

      <div className="border rounded-sm overflow-hidden" style={{ borderColor: "var(--divider)" }}>
        {RECOMMENDATIONS.map((rec, i) => (
          <div
            key={i}
            className="flex items-start gap-4 px-6 py-4 border-b last:border-0"
            style={{
              borderColor: "var(--divider)",
              background: i % 2 === 0 ? "#fff" : "var(--surface)",
            }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white font-ibm text-xs font-semibold"
              style={{ background: "var(--gold)" }}
            >
              {i + 1}
            </div>
            <p className="font-ibm text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
              {rec}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Index() {
  const [activeSection, setActiveSection] = useState("results");

  useEffect(() => {
    const handler = () => {
      const sections = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));
      for (const s of [...sections].reverse()) {
        if (s.el && s.el.getBoundingClientRect().top <= 120) {
          setActiveSection(s.id);
          return;
        }
      }
      setActiveSection("results");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
      {/* Header */}
      <header style={{ background: "var(--navy-deep)" }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p
                className="font-ibm text-xs uppercase mb-3"
                style={{ color: "var(--gold)", letterSpacing: "0.18em" }}
              >
                Академическое исследование · 2024
              </p>
              <h1 className="font-cormorant text-4xl md:text-5xl font-semibold leading-tight text-white mb-3">
                Цифровая трансформация<br />
                <span style={{ color: "var(--gold-light)" }}>высшего образования</span>
              </h1>
              <p className="font-ibm text-sm font-light" style={{ color: "rgba(255,255,255,0.5)" }}>
                Анализ показателей внедрения, академической успеваемости и социальной интеграции
              </p>
            </div>
            <div className="hidden md:block shrink-0 text-right">
              <p className="font-ibm text-xs mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>Авторы</p>
              <p className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Иванов А. В.</p>
              <p className="font-ibm text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>Петрова М. Н.</p>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky nav */}
      <nav className="sticky top-0 z-20 border-b" style={{ background: "#fff", borderColor: "var(--divider)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-8 h-12">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`nav-link ${activeSection === s.id ? "active" : ""}`}
              >
                {s.label}
              </button>
            ))}
            <div className="ml-auto flex items-center gap-2 font-ibm text-xs" style={{ color: "var(--text-muted)" }}>
              <Icon name="BookOpen" size={14} />
              <span>{SOURCES.length} источников</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Summary cards */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: "87%", label: "Цифровизация", icon: "Monitor" },
            { value: "81%", label: "Проектное обуч.", icon: "TrendingUp" },
            { value: "10", label: "Блоков данных", icon: "BarChart2" },
            { value: "6", label: "Источников", icon: "BookMarked" },
          ].map((card, i) => (
            <div
              key={i}
              className="p-5 border rounded-sm"
              style={{ background: "#fff", borderColor: "var(--divider)" }}
            >
              <Icon name={card.icon as "Monitor"} size={16} className="mb-3" style={{ color: "var(--gold)" }} />
              <div className="font-cormorant text-3xl font-semibold" style={{ color: "var(--navy-deep)" }}>
                {card.value}
              </div>
              <div className="font-ibm text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-6 pb-12">
        <ResultsSection />
        <SourcesSection />
        <ConclusionsSection />
      </main>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: "transparent", background: "var(--navy-deep)" }}>
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          <p className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            © 2024 · Академическое исследование
          </p>
          <p className="font-ibm text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Данные носят иллюстративный характер
          </p>
        </div>
      </footer>
    </div>
  );
}
