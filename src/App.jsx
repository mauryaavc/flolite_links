import { useEffect, useMemo, useRef, useState } from 'react'
import { Command } from 'cmdk'
import {
  ArrowUpRight, ChevronDown, Command as CmdIcon, Container, Download, LayoutGrid, MapPin, Monitor,
  Moon, Package, PackageCheck, Rocket, ScanSearch, Search, Sun, Truck, X,
} from 'lucide-react'
import { ROOT, tiles } from './data'
import './App.css'

const ICONS = {
  All: LayoutGrid, Inbound: Download, 'Put Away': PackageCheck, 'Kalash Inbound': Package,
  'Kalash LU': Container, 'Customer outbound': Truck, 'Non Customer outbound': Rocket,
  'Desktop Flows': Monitor, 'Inventory View': ScanSearch, 'Hyper Local': MapPin,
}
const HUES = [222] // single brand hue; add more values to bring per-tile colours back
const reEsc = (t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function Highlight({ text, q }) {
  if (!q) return text
  return text.split(new RegExp(`(${reEsc(q)})`, 'ig')).map((p, k) => (k % 2 ? <mark key={k}>{p}</mark> : p))
}

const spot = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Navigator({ wh, onChange }) {
  const BASE = `${ROOT}/${wh.id}`
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(null)
  const [palette, setPalette] = useState(false)
  const [theme, setTheme] = useState(
    () => localStorage.getItem('flolite-theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
  )
  const input = useRef(null)
  const q = query.trim().toLowerCase()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('flolite-theme', theme)
  }, [theme])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPalette((o) => !o) }
      else if (e.key === '/' && document.activeElement !== input.current && !palette) { e.preventDefault(); input.current?.focus() }
      else if (e.key === 'Escape' && document.activeElement === input.current) { setQuery(''); input.current.blur() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [palette])

  const counts = useMemo(() => tiles.map((t) => t.sections.reduce((n, s) => n + s.items.length, 0)), [])
  const totalItems = counts.reduce((a, b) => a + b, 0)

  const results = tiles
    .map((tile, idx) => {
      const tileHit = !q || tile.name.toLowerCase().includes(q)
      const sections = tile.sections
        .map((s) => ({ ...s, items: s.items.filter((it) => tileHit || it.text.toLowerCase().includes(q)) }))
        .filter((s) => s.items.length)
      return { tile, hue: HUES[idx % HUES.length], sections }
    })
    .filter((r) => r.sections.length && (q || !active || r.tile.name === active))

  return (
    <>
      <div className="hero">
        <i className="blob b1" /><i className="blob b2" /><i className="blob b3" />

        <nav className="nav">
          <span className="logo"><b>FLO</b>LITE</span>
          <button className="pill" type="button" onClick={onChange} title="Change warehouse">
            <MapPin size={14} /> {wh.name} <small>{wh.id}</small> <ChevronDown size={14} />
          </button>
          <span className="grow" />
          <button className="round" type="button" aria-label="Quick jump (Ctrl+K)" title="Quick jump (Ctrl+K)" onClick={() => setPalette(true)}>
            <CmdIcon size={17} />
          </button>
          <button className="round" type="button" aria-label="Toggle dark mode" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </nav>

        <div className="hero-body">
          <p className="eyebrow">{tiles.length} tiles · {totalItems} screens</p>
          <h1>Where to in <span>{wh.name}</span>?</h1>
          <div className="bigsearch">
            <Search size={20} />
            <input
              ref={input} value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder="Search any tile, flow or screen…" aria-label="Search" autoComplete="off"
            />
            {query ? <button type="button" aria-label="Clear" onClick={() => setQuery('')}><X size={18} /></button> : <kbd>/</kbd>}
          </div>
        </div>
      </div>

      <section className="bento" aria-label="Tiles">
        {tiles.map((t, i) => {
          const Icon = ICONS[t.name] || LayoutGrid
          const on = active === t.name && !q
          return (
            <button
              key={t.name} type="button" onMouseMove={spot}
              className={`tile${on ? ' on' : ''}${active && !on && !q ? ' dim' : ''}`}
              style={{ '--h': HUES[i % HUES.length], animationDelay: `${i * 45}ms` }}
              aria-pressed={on}
              onClick={() => { setQuery(''); setActive(on ? null : t.name) }}
            >
              <Icon className="wm" size={84} strokeWidth={1.4} />
              <Icon size={24} />
              <strong>{t.name}</strong>
              <span>{counts[i]} screens</span>
            </button>
          )
        })}
      </section>

      <main className="flow">
        {results.map(({ tile, hue, sections }, n) => {
          const Icon = ICONS[tile.name] || LayoutGrid
          return (
            <section className="block" key={tile.name} style={{ '--h': hue, animationDelay: `${Math.min(n, 6) * 60}ms` }}>
              <header>
                <span className="badge"><Icon size={20} /></span>
                <h2><Highlight text={tile.name} q={q} /></h2>
                <a className="open" href={BASE + tile.path} target="_blank" rel="noopener">Open tile <ArrowUpRight size={15} /></a>
              </header>
              {sections.map((s) => (
                <div className="grp" key={s.label}>
                  {tile.sections.length > 1 && <h3><i />{s.label}</h3>}
                  <div className="chips">
                    {s.items.map((it, k) => (
                      <a className="chip" key={it.path + it.text} href={BASE + it.path} target="_blank" rel="noopener"
                        style={{ animationDelay: `${Math.min(k, 12) * 25}ms` }}>
                        <Highlight text={it.text} q={q} />
                        <ArrowUpRight size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )
        })}

        {!results.length && (
          <div className="empty">
            <Search size={40} />
            <strong>Nothing matches “{query}”</strong>
            <p>Check the spelling or try a shorter term.</p>
            <button className="open" onClick={() => setQuery('')}>Clear search</button>
          </div>
        )}
      </main>

      <footer>FLOLITE Navigator · {wh.id} · press <kbd>Ctrl</kbd> <kbd>K</kbd> to jump anywhere</footer>

      <Command.Dialog open={palette} onOpenChange={setPalette} label="Quick jump" className="cmdk" loop>
        <Command.Input placeholder="Jump to any screen…" />
        <Command.List>
          <Command.Empty>No screens found.</Command.Empty>
          {tiles.map((t) => (
            <Command.Group key={t.name} heading={t.name}>
              {t.sections.flatMap((s) => s.items.map((it) => (
                <Command.Item
                  key={t.name + it.path + it.text} value={`${t.name} ${s.label} ${it.text}`}
                  onSelect={() => { window.open(BASE + it.path, '_blank', 'noopener'); setPalette(false) }}
                >
                  {it.text}<small>{s.label}</small>
                </Command.Item>
              )))}
            </Command.Group>
          ))}
        </Command.List>
      </Command.Dialog>
    </>
  )
}

function Landing({ list, error, onPick }) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [cur, setCur] = useState(0)
  const t = text.trim().toLowerCase()
  const matches = list.filter((w) => !t || `${w.name} ${w.id} ${w.city}`.toLowerCase().includes(t)).slice(0, 50)

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setCur((c) => Math.min(c + 1, matches.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setCur((c) => Math.max(c - 1, 0)) }
    else if (e.key === 'Enter' && matches[cur]) onPick(matches[cur])
    else if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div className="landing hero">
      <i className="blob b1" /><i className="blob b2" /><i className="blob b3" />
      <div className="landing-in">
        <span className="logo big"><b>FLO</b>LITE</span>
        <h1>Select your <span>warehouse</span></h1>
        <p>Pick a store to open its FLOLITE screens.</p>
        <div className="combo">
          <div className="bigsearch">
            <MapPin size={20} />
            <input
              autoFocus value={text} placeholder="Search store name or warehouse ID"
              role="combobox" aria-expanded={open} aria-controls="wh-list" autoComplete="off"
              onChange={(e) => { setText(e.target.value); setOpen(true); setCur(0) }}
              onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)} onKeyDown={onKey}
            />
          </div>
          {open && (
            <ul id="wh-list" role="listbox">
              {matches.map((w, k) => (
                <li key={w.id} role="option" aria-selected={k === cur} className={k === cur ? 'cur' : ''}
                  onMouseDown={() => onPick(w)} onMouseEnter={() => setCur(k)}>
                  <b>{w.name}</b> <span>({w.id})</span>
                </li>
              ))}
              {!matches.length && <li className="none">{list.length ? 'No matching warehouse' : 'Loading…'}</li>}
            </ul>
          )}
        </div>
        {error && <p className="err">Could not load warehouses.json — run the export script. ({error})</p>}
      </div>
    </div>
  )
}

export default function App() {
  const [list, setList] = useState([])
  const [error, setError] = useState('')
  const [wh, setWh] = useState(() => {
    try { return JSON.parse(localStorage.getItem('flolite-wh')) } catch { return null }
  })

  useEffect(() => {
    fetch('/warehouses.json').then((r) => (r.ok ? r.json() : Promise.reject(r.status))).then(setList).catch((e) => setError(String(e)))
  }, [])

  const pick = (w) => { localStorage.setItem('flolite-wh', JSON.stringify(w)); setWh(w) }
  const clear = () => { localStorage.removeItem('flolite-wh'); setWh(null) }

  return wh ? <Navigator wh={wh} onChange={clear} /> : <Landing list={list} error={error} onPick={pick} />
}
