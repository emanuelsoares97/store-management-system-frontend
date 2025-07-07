import"./modulepreload-polyfill-B5Qt9EMX.js";import"./logout-DMNDklZ6.js";document.addEventListener("DOMContentLoaded",()=>{const m=localStorage.getItem("token"),u=document.getElementById("user-lista"),i=document.getElementById("form-user"),n=document.getElementById("user-criar-msg");let h=[];async function l(){try{const o=await fetch("https://store-management-system-xemr.onrender.com/api/user/actives",{headers:{Authorization:`Bearer ${m}`}});if(!o.ok)throw new Error("Erro ao buscar utilizadors");const e=(await o.json()).data.users;if(h=e,!Array.isArray(e)||e.length===0){u.innerHTML="<p>Nenhum utilizador encontrado.</p>";return}let a='<table style="width:100%;border-collapse:collapse;margin-top:1rem;">';a+="<tr><th>ID</th><th>Nome</th><th>Email</th><th>Função</th><th>Ações</th></tr>",e.forEach(r=>{a+=`<tr>
          <td>${r.id}</td>
          <td>${r.name}</td>
          <td>${r.email}</td>
          <td>${r.role}</td>
          <td>
            <button class="editar-btn" data-id="${r.id}">Editar</button>
            <button class="desativar-btn" data-id="${r.id}">Desativar</button>
          </td>
        </tr>`}),a+="</table>",u.innerHTML=a,g()}catch{u.innerHTML='<p style="color:red;">Erro ao buscar utilizadors.</p>'}}function g(){document.querySelectorAll(".editar-btn").forEach(o=>{o.addEventListener("click",t=>{const e=o.getAttribute("data-id");f(e)})}),document.querySelectorAll(".desativar-btn").forEach(o=>{o.addEventListener("click",async t=>{const e=o.getAttribute("data-id");confirm("Tem certeza que deseja desativar este utilizador?")&&await v(e)})})}function f(o){const t=h.find(e=>e.id==o);t&&(u.innerHTML=`
      <h2>Editar utilizador</h2>
      <form id="form-editar-user">
        <label>Nome: <input name="name" value="${t.name}" required /></label><br>
        <label>Email: <input name="email" value="${t.email}" disabled /></label><br>
        <label>Password: <input name="password" type="password" placeholder="Nova password (opcional)" /></label><br>
        <label>Função:
          <select name="role" required>
            <option value="admin"${t.role==="admin"?" selected":""}>Admin</option>
            <option value="gerente"${t.role==="gerente"?" selected":""}>Gerente</option>
            <option value="estoque"${t.role==="estoque"?" selected":""}>Estoque</option>
            <option value="user"${t.role==="user"?" selected":""}>User</option>
          </select>
        </label><br>
        <button type="submit">Salvar</button>
        <button type="button" id="cancelar-edicao">Cancelar</button>
      </form>
      <div id="editar-user-msg"></div>
    `,document.getElementById("cancelar-edicao").onclick=l,document.getElementById("form-editar-user").onsubmit=async e=>{e.preventDefault();const a=e.target,r=a.name.value.trim(),d=a.password.value.trim(),c=a.role.value,s=document.getElementById("editar-user-msg");if(s.textContent="",!r||!c){s.textContent="Nome e função são obrigatórios.",s.style.color="red";return}try{const p={name:r,role:c};d&&(p.password=d);const y=await fetch(`https://store-management-system-xemr.onrender.com/api/user/${o}/update`,{method:"PUT",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify(p)}),b=await y.json();if(!y.ok){s.textContent=b.message||"Erro ao editar utilizador.",s.style.color="red";return}s.textContent=b.message||"utilizador editado com sucesso!",s.style.color="green",setTimeout(l,1e3)}catch{s.textContent="Erro ao editar utilizador.",s.style.color="red"}})}async function v(o){try{const t=await fetch(`https://store-management-system-xemr.onrender.com/api/user/${o}/desactivate`,{method:"PATCH",headers:{Authorization:`Bearer ${m}`}}),e=await t.json();if(!t.ok){alert(e.message||"Erro ao desativar utilizador.");return}alert(e.message||"utilizador desativado com sucesso!"),await l()}catch{alert("Erro ao desativar utilizador.")}}i.addEventListener("submit",async o=>{o.preventDefault(),n.textContent="";const t=i.name.value.trim(),e=i.email.value.trim(),a=i.password.value.trim(),r=i.role.value;if(!t||!e||!a||!r){n.textContent="Todos os campos são obrigatórios.",n.style.color="red";return}try{const d=await fetch("https://store-management-system-xemr.onrender.com/api/user/new",{method:"POST",headers:{Authorization:`Bearer ${m}`,"Content-Type":"application/json"},body:JSON.stringify({name:t,email:e,password:a,role:r})}),c=await d.json();if(!d.ok){n.textContent=c.message||"Erro ao criar utilizador.",n.style.color="red";return}n.textContent=c.message||"utilizador criado com sucesso!",n.style.color="green",i.reset(),await l()}catch{n.textContent="Erro ao criar utilizador.",n.style.color="red"}}),l()});
