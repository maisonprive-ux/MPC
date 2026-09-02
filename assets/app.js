// Configuración inicial - reemplaza placeholders
const XANO_API = "https://YOUR_XANO_ENDPOINT/api"; // reemplazar
const WHATSAPP_NUMBER = "59175110085"; // número sin + ni espacios
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;

// Catálogo de ejemplo (reemplazar por fetch a Xano)
const PRODUCTS = [
  { id: "p-001", title: "Cuff Cuero Vegetal", price: 1200, desc: "Cuff cuero vegetal con cabujón amatista. Uso ejecutivo." },
  { id: "p-002", title: "Pulsera Ónix", price: 350, desc: "Pulsera cuentas ónix, estilo sobrio." },
  { id: "p-003", title: "Cuff Atelier Granate", price: 2800, desc: "Edición limitada, preventa con anticipo." }
];

// Render productos
const grid = document.getElementById("product-grid");
PRODUCTS.forEach(p => {
  const card = document.createElement("div");
  card.className = "bg-white rounded-lg p-4 shadow-sm";
  card.innerHTML = `
    <h4 class="font-semibold">${p.title}</h4>
    <p class="text-sm text-gray-500 mt-2">${p.desc}</p>
    <div class="mt-4 flex items-center justify-between">
      <div class="text-lg font-medium">Bs. ${p.price}</div>
      <div>
        <button class="btn-open text-sm text-gray-700" data-id="${p.id}">Ver</button>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

// Modal logic
const modal = document.getElementById("product-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalReserve = document.getElementById("modal-reserve");
const modalClose = document.getElementById("modal-close");

document.querySelectorAll(".btn-open").forEach(btn => {
  btn.addEventListener("click", e => {
    const id = e.target.dataset.id;
    const p = PRODUCTS.find(x => x.id === id);
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalPrice.textContent = `Bs. ${p.price}`;
    modalReserve.dataset.sku = p.id;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
});

// Reserve button opens WhatsApp prefilled message and triggers Xano webhook (optional)
function openWhatsApp(prefill) {
  const text = encodeURIComponent(prefill);
  window.open(`${WHATSAPP_BASE}?text=${text}`, "_blank");
}

modalReserve.addEventListener("click", (e) => {
  const sku = e.target.dataset.sku;
  const product = PRODUCTS.find(x => x.id === sku);
  const message = `Hola, soy cliente interesado en reservar: ${product.title} (SKU ${product.id}). Ciudad de entrega: [Tu ciudad]. Prefiero recomendación inmediata.`;
  // Opcional: enviar evento a Xano via fetch (registro de lead)
  fetch(`${XANO_API}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone: null, sku: product.id, source: "web", note: "Reserva iniciada por web" })
  }).catch(()=>{ /* no bloquear experiencia */ });
  openWhatsApp(message);
});

// Floating CTA
document.getElementById("whatsapp-cta").href = `${WHATSAPP_BASE}?text=${encodeURIComponent("Hola, quiero atención privada con Maison Privé Concierge.")}`;
document.getElementById("btn-consult").addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp("Hola, deseo una recomendación privada. Mi ciudad es [Ciudad], presupuesto [Bs.].");
});

// Bundles reserve buttons
document.querySelectorAll(".btn-reserve").forEach(b => {
  b.addEventListener("click", () => {
    const sku = b.dataset.sku;
    const message = `Hola, quiero reservar el ${sku}. Soy de [Ciudad].`;
    openWhatsApp(message);
  });
});
