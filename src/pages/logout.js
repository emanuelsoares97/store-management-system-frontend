document.getElementById('logout-btn').addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
  
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      const data = await response.json();
  

      alert(data.message || 'Logout realizado!');
  
    } catch (e) {
      alert(data.message || 'Erro ao efetuar logout.');
    }
  
    localStorage.removeItem('token');
    window.location.href = 'login.html';
  });