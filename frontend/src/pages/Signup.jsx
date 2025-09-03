import React from 'react';
import './Signup.css';

export default function Signup() {
  const [form, setForm] = React.useState({ username: '', email: '', password: '' })
  const [msg, setMsg] = React.useState('')
  const [err, setErr] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [fieldErrors, setFieldErrors] = React.useState({})

  const validate = () => {
    const errors = {}
    if (!form.username.trim()) errors.username = 'Username required'
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) errors.email = 'Invalid email'
    return errors
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setFieldErrors({ ...fieldErrors, [e.target.name]: '' })
  }

  const submit = async (e) => {
    e.preventDefault()
    setMsg(''); setErr(''); setLoading(true)
    const errors = validate()
    setFieldErrors(errors)
    if (Object.keys(errors).length) {
      setLoading(false)
      return
    }
    try {
      const res = await fetch('http://localhost:5050/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      console.log(data);
      if (!res.ok) throw new Error(data.message || 'Signup failed')
      setMsg(data.message || 'Signup successful')
      setForm({ username: '', email: '', password: '' })
    } catch (err) {
      setErr(err.message)
    } finally { setLoading(false) }
  }

  const isFormValid = Object.keys(validate()).length === 0

  return (
    <div className="card">
      <h2 className="title">Create an account</h2>
      <p className="subtitle mb-4">Just signup — you will see a success message.</p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input name="username" value={form.username} onChange={onChange} className="input" required />
          {fieldErrors.username && <span className="text-xs text-red-600">{fieldErrors.username}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input name="email" type="email" value={form.email} onChange={onChange} className="input" required />
          {fieldErrors.email && <span className="text-xs text-red-600">{fieldErrors.email}</span>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input name="password" type="password" value={form.password} onChange={onChange} className="input" required />
          {fieldErrors.password && <span className="text-xs text-red-600">{fieldErrors.password}</span>}
        </div>
        <div className="flex items-center justify-between">
          <button className="btn btn-primary flex items-center" type='submit' >
            Sign up
          </button>
          <a href="/login" className="text-sm text-indigo-600 hover:underline">Already have an account?</a>
        </div>
      </form>
      {msg && <p className="mt-4 text-green-700">{msg}</p>}
      {err && <p className="mt-4 text-red-600">{err}</p>}
    </div>
  )
};
