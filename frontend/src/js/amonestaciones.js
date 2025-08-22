const API_URL = "http://localhost:4100";

// Registrar amonestación
document.getElementById("formAmonestacion").addEventListener("submit", async e => {
    e.preventDefault();

    const form = e.target;
    const amonestacion = {
        codigo_ciudadano: form.codigo_ciudadano.value,
        motivo: form.motivo.value
    };

    const res = await fetch(`${API_URL}/amonestacion/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(amonestacion)
    });

    const data = await res.json();

    if (data.status === "ok") {
        alert(`✅ Amonestación registrada. Sanción: ${data.data.sancion}`);
        const codigo = form.codigo_ciudadano.value;

        // limpiar form
        form.reset();

        // recargar historial
        if (codigo) buscarAmonestaciones(codigo);
    } else {
        alert("❌ Error al registrar amonestación");
    }
});

// Buscar amonestaciones por ciudadano
async function buscarAmonestaciones(codigoParam) {
  const codigo = codigoParam || document.getElementById("ciudadanoBuscar").value;
  if (!codigo) return;

  const res = await fetch(`${API_URL}/amonestacion/ciudadano/${codigo}`);
  const data = await res.json();

  const tbody = document.querySelector("#tablaAmonestaciones tbody");
  tbody.innerHTML = "";

  data.data.forEach(a => {
    let nivelTxt = "";
    if (a.nivel === 1) nivelTxt = "Primera";
    else if (a.nivel === 2) nivelTxt = "Segunda";
    else if (a.nivel >= 3) nivelTxt = "Tercera o más";

    const row = `<tr>
      <td>${a.fecha}</td>
      <td>${nivelTxt}</td>
      <td>${a.descripcion}</td>
      <td><span class="badge bg-danger">${a.sancion}</span></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

