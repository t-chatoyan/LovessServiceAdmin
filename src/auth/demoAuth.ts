export const DEMO_ADMIN_USERNAME = 'admin'
export const DEMO_ADMIN_PASSWORD = 'admin123'

const AUTH_KEY = 'lovess_admin_demo_auth'

export function isAuthenticated(): boolean {
  return (
    localStorage.getItem(AUTH_KEY) === '1' || sessionStorage.getItem(AUTH_KEY) === '1'
  )
}

export function setAuthenticated(remember: boolean) {
  if (remember) {
    localStorage.setItem(AUTH_KEY, '1')
    sessionStorage.removeItem(AUTH_KEY)
  } else {
    sessionStorage.setItem(AUTH_KEY, '1')
    localStorage.removeItem(AUTH_KEY)
  }
}

export function clearAuthenticated() {
  localStorage.removeItem(AUTH_KEY)
  sessionStorage.removeItem(AUTH_KEY)
}

export function validateDemoAdmin(username: string, password: string) {
  return username === DEMO_ADMIN_USERNAME && password === DEMO_ADMIN_PASSWORD
}


