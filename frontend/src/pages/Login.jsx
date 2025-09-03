import React from 'react'

export default function Login() {
  const [form, setForm] = React.useState({ username: '', password: '' })
  const [msg, setMsg] = React.useState('')
  const [err, setErr] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setMsg(''); setErr(''); setLoading(true)
    try {
      const res = await fetch('http://localhost:5050/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      setMsg(data.message)
      setForm({ username: '', password: '' })
    } catch (err) {
      setErr(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="card">
      <h2 className="title">Login</h2>
      <p className="subtitle mb-4">After login you will see a welcome message.</p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input name="username" value={form.username} onChange={onChange} className="input" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input name="password" type="password" value={form.password} onChange={onChange} className="input" required />
        </div>
        <div className="flex items-center justify-between">
          <button className="btn btn-primary" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
          <a href="/signup" className="text-sm text-indigo-600 hover:underline">Create account</a>
        </div>
      </form>
      {msg && <p className="mt-4 text-green-700">{msg}</p>}
      {err && <p className="mt-4 text-red-600">{err}</p>}
    </div>
  )
}
