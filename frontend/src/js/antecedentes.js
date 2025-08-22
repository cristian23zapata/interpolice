const API_URL = "http://localhost:4100";

// Cargar delitos en el <select>
async function cargarDelitos() {
    const res = await fetch(`${API_URL}/delito/listartodos`);
    const data = await res.json();
    const select = document.getElementById("delitosSelect");
    select.innerHTML = ""; // limpiar antes de volver a llenar
    data.data.forEach(delito => {
        const option = document.createElement("option");
        option.value = delito.id_delito;
        option.textContent = delito.nombre_delito;
        select.appendChild(option);
    });
}

// Registrar antecedente
document.getElementById("formAntecedente").addEventListener("submit", async e => {
    e.preventDefault();

    const form = e.target;
    const delitos = Array.from(document.getElementById("delitosSelect").selectedOptions).map(o => o.value);

    const antecedente = {
        codigo_ciudadano: form.codigo_ciudadano.value,
        fecha: form.fecha.value,
        hora: form.hora.value,
        lugar: form.lugar.value,
        descripcion: form.descripcion.value,
        delitos: delitos
    };

    const res = await fetch(`${API_URL}/antecedente/crear`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(antecedente)
    });

    const data = await res.json();

    if (data.status === "ok") {
        alert("✅ Antecedente registrado correctamente");

        // Guardamos el ciudadano para recargar historial
        const codigo = form.codigo_ciudadano.value;

        // Limpiar formulario
        form.reset();

        // Si usas Select2 o similar, hay que limpiar manualmente
        const select = document.getElementById("delitosSelect");
        if (window.$ && $(select).data('select2')) {
            $(select).val(null).trigger('change');
        }

        // Recargar historial automáticamente
        if (codigo) {
            buscarAntecedentes(codigo);
        }
    } else {
        alert("❌ Error al registrar antecedente");
    }
});

// Buscar antecedentes por ciudadano
async function buscarAntecedentes(codigoParam) {
    const codigo = codigoParam || document.getElementById("ciudadanoBuscar").value;
    if (!codigo) return;

    const res = await fetch(`${API_URL}/antecedente/ciudadano/${codigo}`);
    const data = await res.json();

    const tbody = document.querySelector("#tablaAntecedentes tbody");
    tbody.innerHTML = "";

    data.data.forEach(a => {
        const row = `<tr>
            <td>${a.fecha.split("T")[0]}</td>
            <td>${a.hora}</td>
            <td>${a.lugar}</td>
            <td>${a.descripcion}</td>
            <td>${
                a.delitos
                    ? a.delitos.split(",").map(d => `<span class="badge bg-danger me-1">${d.trim()}</span>`).join(" ")
                    : "—"
            }</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

cargarDelitos();
