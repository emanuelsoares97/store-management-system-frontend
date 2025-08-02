document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form')
    const messageDiv = document.getElementById('login-msg')
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
  
      const email = form.email.value
      const password = form.password.value
  
      try {
        const response = await fetch('https://store-management-system-xemr.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          messageDiv.textContent = errorData.message || 'Erro ao fazer login.'
          messageDiv.style.color = 'red'
          return
        }
  
        const data = await response.json()
        console.log(data)
        messageDiv.textContent = 'Login realizado com sucesso!'
        messageDiv.style.color = 'green'
  
        // guarda o token JWT no localStorage para usar nas outras requisições
        localStorage.setItem('token', data.data.access_token)
  
        // encaminha para pagina princial
        window.location.href = 'index.html'
  
      } catch (error) {
        messageDiv.textContent = 'Erro de rede. Tente novamente.'
        messageDiv.style.color = 'red'
      }
    })
  })
  