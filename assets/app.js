const WHATSAPP_NUMBER = "59175110085";
const WHATSAPP_BASE = `https://wa.me/${WHATSAPP_NUMBER}`;
const PRODUCTS = [
  { id: "p-001", title: "Cuff Cuero Vegetal", price: 1200, desc: "Cuff cuero vegetal con cabujón amatista. Uso ejecutivo.", img:"/assets/product-1.jpg" },
  { id: "p-002", title: "Pulsera Ónix", price: 350, desc: "Pulsera cuentas ónix, estilo sobrio.", img:"/assets/product-2.jpg" },
  { id: "p-003", title: "Cuff Atelier Granate", price: 2800, desc: "Edición limitada, preventa con anticipo.", img:"/assets/product-3.jpg" }
];

function formatBs(n){ return `Bs. ${n.toLocaleString('es-BO')}`; }

const grid = document.getElementById("product-grid");
PRODUCTS.forEach(p => {
  const el = document.createElement("div");
  el.className = "card";
  el.innerHTML = `
    <div class="h-44 w-full rounded overflow-hidden mb-4"><img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover"></div>
    <h4 class="font-semibold">${p.title}</h4>
    <p class="text-sm text-muted mt-2">${p.desc}</p>
    <div class="mt-4 flex items-center justify-between">
      <div class="text-lg font-medium">${formatBs(p.price)}</div>
      <button class="btn-open btn-outline" data-id="${p.id}">Ver</button>
    </div>
  `;
  grid.appendChild(el);
});

const modal = document.getElementById("product-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalReserve = document.getElementById("modal-reserve");
const modalClose = document.getElementById("modal-close");

document.addEventListener("click", e => {
  if(e.target.matches(".btn-open")){
    const id = e.target.dataset.id;
    const p = PRODUCTS.find(x=>x.id===id);
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalPrice.textContent = formatBs(p.price);
    modalReserve.dataset.sku = p.id;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
  if(e.target === modalClose) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
  if(e.target === modalReserve){
    const sku = e.target.dataset.sku;
    const product = PRODUCTS.find(x=>x.id===sku);
    const message = `Hola Maison Privé, deseo reservar: ${product.title} (SKU ${product.id}). Ciudad de entrega: [Ciudad]. Prefiero recomendación inmediata.`;
    // Optional: register lead to Xano via fetch (add your endpoint)
    // fetch("https://YOUR_XANO/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({sku:product.id, source:"web"}) });
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`, "_blank");
  }
  if(e.target.matches(".reserve")){
    const sku = e.target.dataset.sku;
    const message = `Hola Maison Privé, quiero reservar ${sku}. Soy de [Ciudad].`;
    window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`, "_blank");
  }
});

document.getElementById("btn-consult").addEventListener("click", (e)=>{
  e.preventDefault();
  const msg = "Hola Maison Privé, deseo una recomendación privada. Mi ciudad es [Ciudad], presupuesto [Bs.].";
  window.open(`${WHATSAPP_BASE}?text=${encodeURIComponent(msg)}`, "_blank");
});
