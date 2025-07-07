document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const listaDiv = document.getElementById('user-lista');
  const form = document.getElementById('form-user');
  const msgDiv = document.getElementById('user-criar-msg');
  let usersCache = [];

  async function listarUsers() {
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/user/actives', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Erro ao buscar utilizadors');
      const data = await response.json();
      const users = data.data.users;
      usersCache = users;
      if (!Array.isArray(users) || users.length === 0) {
        listaDiv.innerHTML = '<p>Nenhum utilizador encontrado.</p>';
        return;
      }
      let html = '<table style="width:100%;border-collapse:collapse;margin-top:1rem;">';
      html += '<tr><th>ID</th><th>Nome</th><th>Email</th><th>Função</th><th>Ações</th></tr>';
      users.forEach(user => {
        html += `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
            <button class="editar-btn" data-id="${user.id}">Editar</button>
            <button class="desativar-btn" data-id="${user.id}">Desativar</button>
          </td>
        </tr>`;
      });
      html += '</table>';
      listaDiv.innerHTML = html;
      addActionListeners();
    } catch (err) {
      listaDiv.innerHTML = `<p style=\"color:red;\">Erro ao buscar utilizadors.</p>`;
    }
  }

  function addActionListeners() {
    document.querySelectorAll('.editar-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        exibirFormularioEdicao(id);
      });
    });
    document.querySelectorAll('.desativar-btn').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = btn.getAttribute('data-id');
        if (confirm('Tem certeza que deseja desativar este utilizador?')) {
          await desativarUser(id);
        }
      });
    });
  }

  function exibirFormularioEdicao(id) {
    const user = usersCache.find(u => u.id == id);
    if (!user) return;
    listaDiv.innerHTML = `
      <h2>Editar utilizador</h2>
      <form id="form-editar-user">
        <label>Nome: <input name="name" value="${user.name}" required /></label><br>
        <label>Email: <input name="email" value="${user.email}" disabled /></label><br>
        <label>Password: <input name="password" type="password" placeholder="Nova password (opcional)" /></label><br>
        <label>Função:
          <select name="role" required>
            <option value="admin"${user.role === 'admin' ? ' selected' : ''}>Admin</option>
            <option value="gerente"${user.role === 'gerente' ? ' selected' : ''}>Gerente</option>
            <option value="estoque"${user.role === 'estoque' ? ' selected' : ''}>Estoque</option>
            <option value="user"${user.role === 'user' ? ' selected' : ''}>User</option>
          </select>
        </label><br>
        <button type="submit">Salvar</button>
        <button type="button" id="cancelar-edicao">Cancelar</button>
      </form>
      <div id="editar-user-msg"></div>
    `;
    document.getElementById('cancelar-edicao').onclick = listarUsers;
    document.getElementById('form-editar-user').onsubmit = async (e) => {
      e.preventDefault();
      const formEdit = e.target;
      const name = formEdit.name.value.trim();
      const password = formEdit.password.value.trim();
      const role = formEdit.role.value;
      const msg = document.getElementById('editar-user-msg');
      msg.textContent = '';
      if (!name || !role) {
        msg.textContent = 'Nome e função são obrigatórios.';
        msg.style.color = 'red';
        return;
      }
      try {
        const body = { name, role };
        if (password) body.password = password;
        const response = await fetch(`https://store-management-system-xemr.onrender.com/api/user/${id}/update`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        });
        const data = await response.json();
        if (!response.ok) {
          msg.textContent = data.message || 'Erro ao editar utilizador.';
          msg.style.color = 'red';
          return;
        }
        msg.textContent = data.message || 'utilizador editado com sucesso!';
        msg.style.color = 'green';
        setTimeout(listarUsers, 1000);
      } catch (err) {
        msg.textContent = 'Erro ao editar utilizador.';
        msg.style.color = 'red';
      }
    };
  }

  async function desativarUser(id) {
    try {
      const response = await fetch(`https://store-management-system-xemr.onrender.com/api/user/${id}/desactivate`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message || 'Erro ao desativar utilizador.');
        return;
      }
      alert(data.message || 'utilizador desativado com sucesso!');
      await listarUsers();
    } catch (err) {
      alert('Erro ao desativar utilizador.');
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msgDiv.textContent = '';
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const role = form.role.value;
    if (!name || !email || !password || !role) {
      msgDiv.textContent = 'Todos os campos são obrigatórios.';
      msgDiv.style.color = 'red';
      return;
    }
    try {
      const response = await fetch('https://store-management-system-xemr.onrender.com/api/user/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await response.json();
      if (!response.ok) {
        msgDiv.textContent = data.message || 'Erro ao criar utilizador.';
        msgDiv.style.color = 'red';
        return;
      }
      msgDiv.textContent = data.message || 'utilizador criado com sucesso!';
      msgDiv.style.color = 'green';
      form.reset();
      await listarUsers();
    } catch (err) {
      msgDiv.textContent = 'Erro ao criar utilizador.';
      msgDiv.style.color = 'red';
    }
  });

  listarUsers();
});
