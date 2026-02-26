import React, { useMemo, useRef, useState, useEffect } from 'react';

const services = [
  {
    icon: 'mdi:gold',
    title: 'Harga Tinggi',
    desc: 'Penilaian mengikuti harga pasar terbaru dengan transparansi penuh.'
  },
  {
    icon: 'mdi:shield-check',
    title: 'Transaksi Aman',
    desc: 'Sistem keamanan berlapis dan dokumen rapi untuk ketenangan Anda.'
  },
  {
    icon: 'mdi:clock-fast',
    title: 'Proses Cepat',
    desc: 'Pembayaran instan dalam hitungan menit, tanpa birokrasi.'
  }
];

const steps = [
  { title: 'Konsultasi', desc: 'Tentukan jenis emas dan kebutuhan Anda.' },
  { title: 'Penilaian', desc: 'Uji kadar dengan alat presisi di hadapan Anda.' },
  { title: 'Kesepakatan', desc: 'Harga final disetujui transparan.' },
  { title: 'Pembayaran', desc: 'Dana cair instan ke cash atau transfer.' }
];

const testimonials = [
  { quote: 'Proses cepat, harga tinggi. Sangat puas.', name: 'Budi', city: 'Jakarta' },
  { quote: 'Datang langsung, langsung cair.', name: 'Sari', city: 'Bandung' },
  { quote: 'Tidak ribet, transparan.', name: 'Andi', city: 'Bekasi' },
  { quote: 'Pelayanan ramah dan profesional.', name: 'Rina', city: 'Depok' },
  { quote: 'Harga lebih tinggi dari tempat lain.', name: 'Wahyu', city: 'Tangerang' },
  { quote: 'Cocok untuk jual emas mendesak.', name: 'Lina', city: 'Bogor' },
  { quote: 'Aman dan terpercaya.', name: 'Fajar', city: 'Jakarta' },
  { quote: 'Rekomendasi terbaik.', name: 'Dewi', city: 'Cikarang' }
];

const faqs = [
  {
    q: 'Apakah bisa jual emas tanpa surat?',
    a: 'Bisa. Kami tetap melakukan verifikasi dan penilaian sesuai standar keamanan.'
  },
  {
    q: 'Berapa lama proses pencairan?',
    a: 'Rata-rata 10–20 menit setelah penilaian selesai dan disepakati.'
  },
  {
    q: 'Apakah harga selalu mengikuti pasar?',
    a: 'Ya, harga diperbarui berkala dan diinformasikan secara transparan.'
  },
  {
    q: 'Apakah ada layanan jemput?',
    a: 'Tersedia untuk area tertentu dengan janji temu terlebih dahulu.'
  }
];

const branches = [
  { city: 'Jakarta', address: 'Kawasan Premium, Jakarta Pusat' },
  { city: 'Bandung', address: 'Dago Luxury Avenue' },
  { city: 'Bekasi', address: 'Grand Galaxy City' },
  { city: 'Tangerang', address: 'Alam Sutera Boulevard' }
];

const gallery = [
  { title: 'Ruang Tamu VIP', tag: 'Private Lounge' },
  { title: 'Meja Penilaian', tag: 'Precision Desk' },
  { title: 'Area Konsultasi', tag: 'Calm & Quiet' },
  { title: 'Showcase Kadar', tag: 'Verified Purity' },
  { title: 'Spot Foto Premium', tag: 'Brand Experience' },
  { title: 'Area Pembayaran', tag: 'Instant Transfer' }
];

const formatIDR = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value || 0);

export default function App() {
  const [grams, setGrams] = useState(10);
  const [karat, setKarat] = useState(24);
  const [pricePerGram, setPricePerGram] = useState(1150000);
  const [openFaq, setOpenFaq] = useState(0);
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  const estimate = useMemo(() => {
    const purity = Math.min(Math.max(karat, 1), 24) / 24;
    return grams * pricePerGram * purity;
  }, [grams, karat, pricePerGram]);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    let index = 0;
    const cards = () => track.querySelectorAll('.testimonial-card');

    const slide = () => {
      const list = cards();
      if (!list.length) return;
      const gap = parseFloat(getComputedStyle(track).gap || 24);
      const cardWidth = list[0].offsetWidth + gap;
      const visible = Math.max(1, Math.floor(wrap.offsetWidth / cardWidth));
      index = index + 1;
      if (index > list.length - visible) index = 0;
      track.style.transform = `translateX(-${index * cardWidth}px)`;
    };

    const id = setInterval(slide, 4500);
    const onResize = () => {
      index = 0;
      track.style.transform = 'translateX(0px)';
    };

    window.addEventListener('resize', onResize);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className="page">
      <header>
        <div className="nav container">
          <div className="logo">
            <img src="/img/logo.png" alt="Central Jual Emas" />
            <span>Central Jual Emas</span>
          </div>
          <nav>
            <a href="#home">Home</a>
            <a href="#layanan">Layanan</a>
            <a href="#estimasi">Estimasi</a>
            <a href="#testimoni">Testimoni</a>
            <a href="#faq">FAQ</a>
            <a href="#kontak">Kontak</a>
          </nav>
        </div>
      </header>

      <section id="home" className="hero section">
        <div className="hero-content container">
          <div className="hero-text">
            <span className="eyebrow">Pusat Jual Emas Terpercaya</span>
            <h1>
              Jual Emas Cepat &amp; <span>Aman</span>
            </h1>
            <p>
              Pengalaman premium dengan proses transparan, ruang VIP, dan harga terbaik di kelasnya.
            </p>
            <div className="cta-row">
              <a href="#kontak" className="btn">
                Hubungi Kami
              </a>
              <a href="#estimasi" className="btn btn-ghost">
                Cek Estimasi
              </a>
            </div>
            <div className="hero-metrics">
              <div>
                <h4>12+</h4>
                <p>Cabang Strategis</p>
              </div>
              <div>
                <h4>10K+</h4>
                <p>Pelanggan Puas</p>
              </div>
              <div>
                <h4>5 Menit</h4>
                <p>Rata-rata Proses</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="glass-panel">
              <p className="tag">Premium Service</p>
              <h3>Harga &amp; Keamanan Utama</h3>
              <p>
                Tim penilai bersertifikat dengan alat uji presisi, memastikan Anda mendapat nilai terbaik.
              </p>
              <div className="badge-row">
                <span>Zero Hidden Fee</span>
                <span>Secure Vault</span>
                <span>Private Lounge</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="section light">
        <div className="container center">
          <h2>Layanan Eksklusif</h2>
          <p className="subtitle">
            Standar pelayanan premium untuk memastikan pengalaman jual emas yang elegan dan nyaman.
          </p>
          <div className="services">
            {services.map((item) => (
              <div key={item.title} className="service">
                <span className="iconify" data-icon={item.icon}></span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section process">
        <div className="container">
          <div className="split">
            <div>
              <h2>Proses Elegan &amp; Transparan</h2>
              <p className="subtitle">
                Dari konsultasi hingga pembayaran, setiap langkah dikawal detail dan profesional.
              </p>
            </div>
            <div className="steps">
              {steps.map((step, i) => (
                <div key={step.title} className="step">
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="estimasi" className="section ivory">
        <div className="container">
          <div className="split">
            <div>
              <h2>Estimasi Nilai Emas</h2>
              <p className="subtitle">
                Masukkan berat dan kadar untuk estimasi cepat. Harga per gram dapat Anda sesuaikan.
              </p>
              <div className="price-note">
                Update manual sesuai harga pasar hari ini.
              </div>
            </div>
            <div className="calculator">
              <label>
                Berat (gram)
                <input
                  type="number"
                  min="1"
                  value={grams}
                  onChange={(e) => setGrams(Number(e.target.value))}
                />
              </label>
              <label>
                Kadar (karat)
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={karat}
                  onChange={(e) => setKarat(Number(e.target.value))}
                />
              </label>
              <label>
                Harga per gram (IDR)
                <input
                  type="number"
                  min="1000"
                  value={pricePerGram}
                  onChange={(e) => setPricePerGram(Number(e.target.value))}
                />
              </label>
              <div className="estimate">
                <span>Estimasi</span>
                <strong>{formatIDR(estimate)}</strong>
              </div>
              <a
                className="btn"
                href="https://wa.me/6285219542001?text=Halo%20Central%20Jual%20Emas,%20saya%20ingin%20estimasi%20harga"
                target="_blank"
                rel="noreferrer"
              >
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section gallery">
        <div className="container">
          <h2>Galeri Ruang Premium</h2>
          <p className="subtitle">
            Nuansa elegan, pencahayaan hangat, dan privasi terbaik untuk Anda.
          </p>
          <div className="gallery-grid">
            {gallery.map((item) => (
              <div key={item.title} className="gallery-card">
                <div className="gallery-overlay"></div>
                <div className="gallery-content">
                  <span>{item.tag}</span>
                  <h4>{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimoni" className="section testimonials">
        <div className="container">
          <h2>Apa Kata Pelanggan Kami</h2>
          <p className="subtitle">Testimoni nyata dari pelanggan yang sudah merasakan layanan premium kami.</p>
          <div className="testimonial-wrapper" ref={wrapRef}>
            <div className="testimonial-track" ref={trackRef}>
              {testimonials.map((item) => (
                <div key={item.name + item.city} className="testimonial-card">
                  <p>"{item.quote}"</p>
                  <span>
                    &mdash; {item.name}, {item.city}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section branches">
        <div className="container">
          <div className="split">
            <div>
              <h2>Jaringan Cabang Premium</h2>
              <p className="subtitle">
                Tersedia di lokasi strategis dengan akses mudah dan area parkir luas.
              </p>
            </div>
            <div className="branch-grid">
              {branches.map((branch) => (
                <div key={branch.city} className="branch-card">
                  <h4>{branch.city}</h4>
                  <p>{branch.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section faq">
        <div className="container">
          <h2>Pertanyaan Umum</h2>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <button
                key={item.q}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <div>
                  <h4>{item.q}</h4>
                  <p>{item.a}</p>
                </div>
                <span className="iconify" data-icon="mdi:chevron-down"></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="kontak" className="section social">
        <div className="container social-wrap">
          <div>
            <h2>Lihat Aktivitas Kami</h2>
            <p className="subtitle">Ikuti update promo dan aktivitas harian kami di media sosial.</p>
          </div>
          <div className="social-btns">
            <a href="https://www.tiktok.com/@terima.jual_emas">TikTok @centraljualemas</a>
            <a href="https://www.facebook.com/jualemastanpasurat">Facebook Central Jual Emas</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div>
            <h4>Central Jual Emas</h4>
            <p>Layanan jual emas premium dengan proses cepat, aman, dan transparan.</p>
          </div>
          <div>
            <h5>Kontak</h5>
            <p>WhatsApp: 0852-1954-2001</p>
            <p>Open: 09.00 - 20.00</p>
          </div>
          <div>
            <h5>Legal</h5>
            <p>Transaksi resmi &amp; aman</p>
            <p>Privasi pelanggan terjaga</p>
          </div>
        </div>
        <div className="footer-bottom">&copy; 2026 Central Jual Emas</div>
      </footer>

      <a
        href="https://wa.me/6285219542001?text=Halo%20Central%20Jual%20Emas,%20saya%20ingin%20jual%20emas"
        className="float-wa"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat WhatsApp"
      >
        <span className="iconify" data-icon="mdi:whatsapp"></span>
      </a>
    </div>
  );
}