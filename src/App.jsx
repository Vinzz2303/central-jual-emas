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
    a: 'Rata-rata 10-20 menit setelah penilaian selesai dan disepakati.'
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

const trustPoints = [
  {
    icon: 'mdi:file-document-check-outline',
    title: 'Transaksi Resmi',
    desc: 'Setiap transaksi dicatat rapi dengan alur yang jelas.'
  },
  {
    icon: 'mdi:shield-lock-outline',
    title: 'Privasi Terjaga',
    desc: 'Data pelanggan dan nominal transaksi dijaga kerahasiaannya.'
  },
  {
    icon: 'mdi:scale-balance',
    title: 'Uji Kadar Transparan',
    desc: 'Proses pengecekan kadar dilakukan terbuka di hadapan pelanggan.'
  },
  {
    icon: 'mdi:map-marker-radius-outline',
    title: 'Basis Serang, Jangkauan Jabodetabek',
    desc: 'Melayani area Jabodetabek dengan konsultasi dan janji temu.'
  }
];

const branches = [
  { city: 'Serang (Lokasi Utama)', address: 'Kota Serang, Banten' },
  { city: 'Jakarta', address: 'Layanan area DKI Jakarta' },
  { city: 'Bogor - Depok', address: 'Layanan area Bogor dan Depok' },
  { city: 'Tangerang - Bekasi', address: 'Layanan area Tangerang dan Bekasi' }
];

const serviceAreas = [
  { region: 'Serang & Sekitar', cities: ['Kota Serang', 'Kabupaten Serang', 'Cilegon'] },
  { region: 'DKI Jakarta', cities: ['Jakarta Pusat', 'Jakarta Selatan', 'Jakarta Barat', 'Jakarta Timur'] },
  { region: 'Bogor - Depok', cities: ['Kota Bogor', 'Kabupaten Bogor', 'Depok'] },
  { region: 'Tangerang - Bekasi', cities: ['Kota Tangerang', 'Tangerang Selatan', 'Kota Bekasi', 'Kabupaten Bekasi'] }
];

const serviceSla = [
  'Respon WhatsApp rata-rata kurang dari 5 menit saat jam operasional.',
  'Konfirmasi estimasi awal dilakukan di hari yang sama.',
  'Jadwal kunjungan/ketemu diprioritaskan maksimal 24 jam.'
];

const gallery = [
  {
    title: 'Ruang Tamu VIP',
    tag: 'Private Lounge',
    image: '/img/gallery/lounge.webp',
    alt: 'Ruang tamu VIP bernuansa hangat untuk konsultasi privat'
  },
  {
    title: 'Meja Penilaian',
    tag: 'Precision Desk',
    image: '/img/gallery/assessment.webp',
    alt: 'Meja penilaian emas dengan timbangan presisi dan alat uji'
  },
  {
    title: 'Area Konsultasi',
    tag: 'Calm & Quiet',
    image: '/img/gallery/consultation.webp',
    alt: 'Area konsultasi tenang dengan dokumen transaksi pelanggan'
  },
  {
    title: 'Showcase Kadar',
    tag: 'Verified Purity',
    image: '/img/gallery/showcase.webp',
    alt: 'Showcase kadar emas dengan sertifikat verifikasi kemurnian'
  },
  {
    title: 'Spot Foto Premium',
    tag: 'Brand Experience',
    image: '/img/gallery/brand.webp',
    alt: 'Spot foto premium dengan logo Central Jual Emas'
  },
  {
    title: 'Area Pembayaran',
    tag: 'Instant Transfer',
    image: '/img/gallery/payment.webp',
    alt: 'Area pembayaran instan menggunakan mesin EDC'
  }
];

const formatIDR = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value || 0);

const OUNCE_TO_GRAM = 31.1034768;

export default function App() {
  const [grams, setGrams] = useState(10);
  const [karat, setKarat] = useState(24);
  const [pricePerGram, setPricePerGram] = useState(1150000);
  const [priceSource, setPriceSource] = useState('manual-default');
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [estimatorViewed, setEstimatorViewed] = useState(false);
  const [priceStatus, setPriceStatus] = useState('idle');
  const [priceUpdatedAt, setPriceUpdatedAt] = useState('');
  const trackRef = useRef(null);
  const wrapRef = useRef(null);

  const estimate = useMemo(() => {
    const purity = Math.min(Math.max(karat, 1), 24) / 24;
    return grams * pricePerGram * purity;
  }, [grams, karat, pricePerGram]);
  const isEstimateValid = grams > 0 && karat >= 1 && karat <= 24 && pricePerGram >= 1000;
  const estimateNote = !grams
    ? 'Masukkan berat emas terlebih dahulu.'
    : karat < 1 || karat > 24
      ? 'Kadar emas harus di antara 1 sampai 24 karat.'
      : pricePerGram < 1000
        ? 'Harga per gram minimal Rp1.000.'
        : 'Estimasi siap. Lanjutkan konsultasi untuk penilaian final.';
  const waEstimateText = encodeURIComponent(
    `Halo Central Jual Emas, saya ingin estimasi harga.\n` +
      `Berat: ${grams} gram\n` +
      `Kadar: ${karat}K\n` +
      `Harga acuan: ${formatIDR(pricePerGram)}\n` +
      `Estimasi: ${formatIDR(estimate)}`
  );

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchLivePriceFromPublicApis = async () => {
      const [goldResponse, fxResponse] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU', { signal: controller.signal }),
        fetch('https://open.er-api.com/v6/latest/USD', { signal: controller.signal })
      ]);
      if (!goldResponse.ok || !fxResponse.ok) throw new Error('Public API failed');

      const [goldData, fxData] = await Promise.all([goldResponse.json(), fxResponse.json()]);
      const xauUsdPerOunce = Number(goldData?.price);
      const usdIdrRate = Number(fxData?.rates?.IDR);
      const calculatedPricePerGram = Math.round((xauUsdPerOunce * usdIdrRate) / OUNCE_TO_GRAM);

      if (!Number.isFinite(calculatedPricePerGram) || calculatedPricePerGram <= 0) {
        throw new Error('Invalid public API payload');
      }

      return {
        pricePerGram: calculatedPricePerGram,
        source: 'direct-public-api-xau-usdidr',
        updatedAt: new Date().toISOString()
      };
    };

    const loadGoldPrice = async () => {
      try {
        setPriceStatus('loading');
        const response = await fetch('/api/gold-price', { signal: controller.signal });
        if (response.ok) {
          const data = await response.json();
          if (!isMounted) return;

          const apiPrice = Number(data.pricePerGram);
          if (Number.isFinite(apiPrice) && apiPrice > 0) {
            setPricePerGram(apiPrice);
            setPriceSource(String(data.source || 'manual-default'));
            setPriceUpdatedAt(String(data.updatedAt || ''));
            setPriceStatus('ready');
            return;
          }
        }
      } catch (error) {
        if (controller.signal.aborted) return;
      }

      try {
        const publicData = await fetchLivePriceFromPublicApis();
        if (!isMounted) return;
        setPricePerGram(publicData.pricePerGram);
        setPriceSource(publicData.source);
        setPriceUpdatedAt(publicData.updatedAt);
        setPriceStatus('ready');
      } catch (error) {
        if (controller.signal.aborted) return;
        setPriceStatus('fallback');
      }
    };

    loadGoldPrice();
    const intervalId = window.setInterval(loadGoldPrice, 120000);
    return () => {
      isMounted = false;
      controller.abort();
      window.clearInterval(intervalId);
    };
  }, []);

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

  useEffect(() => {
    document.documentElement.classList.add('js');
    const nodes = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove('js');
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMobileNavOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onWhatsappClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('a[href*="wa.me"]');
      if (!link || typeof window.gtag !== 'function') return;

      const section = link.closest('section[id]')?.id || (link.classList.contains('float-wa') ? 'floating' : 'global');
      const label = link.getAttribute('aria-label') || link.textContent?.trim() || 'whatsapp_link';

      window.gtag('event', 'whatsapp_click', {
        event_category: 'engagement',
        event_label: label,
        section,
        link_url: link.href
      });
      window.gtag('event', 'start_whatsapp', {
        event_category: 'conversion',
        event_label: label,
        section
      });

      fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          section,
          label,
          linkUrl: link.href,
          grams,
          karat,
          estimate
        })
      }).catch(() => {
        // No-op: lead capture should never block navigation to WhatsApp.
      });
    };

    document.addEventListener('click', onWhatsappClick);
    return () => document.removeEventListener('click', onWhatsappClick);
  }, [grams, karat, estimate]);

  useEffect(() => {
    const estimatorSection = document.getElementById('estimasi');
    if (!estimatorSection || typeof window.gtag !== 'function') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !estimatorViewed) {
            window.gtag('event', 'view_estimator', {
              event_category: 'engagement',
              event_label: 'estimasi_section'
            });
            setEstimatorViewed(true);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(estimatorSection);
    return () => observer.disconnect();
  }, [estimatorViewed]);

  const formattedPriceUpdatedAt = priceUpdatedAt
    ? new Date(priceUpdatedAt).toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    : '';

  return (
    <div className="page">
      <header>
        <div className="nav container">
          <div className="logo">
            <img
              src="/img/logo-nav.svg"
              alt="Central Jual Emas"
              width="420"
              height="90"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <span>Central Jual Emas</span>
          </div>
          <button
            type="button"
            className={`menu-toggle ${mobileNavOpen ? 'open' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className={mobileNavOpen ? 'open' : ''}>
            <a href="#home" onClick={() => setMobileNavOpen(false)}>Home</a>
            <a href="#layanan" onClick={() => setMobileNavOpen(false)}>Layanan</a>
            <a href="#estimasi" onClick={() => setMobileNavOpen(false)}>Estimasi</a>
            <a href="#testimoni" onClick={() => setMobileNavOpen(false)}>Testimoni</a>
            <a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a>
            <a href="#kontak" onClick={() => setMobileNavOpen(false)}>Kontak</a>
          </nav>
        </div>
      </header>

      <section id="home" className="hero section">
        <div className="hero-content container">
          <div className="hero-text reveal">
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

          <div className="hero-visual reveal" style={{ '--delay': '120ms' }}>
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
            {services.map((item, i) => (
              <div key={item.title} className="service reveal" style={{ '--delay': `${i * 90}ms` }}>
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
              <article className="market-card reveal" style={{ '--delay': '60ms' }}>
                <p className="market-label">Harga Hari Ini</p>
                <p className="market-value">
                  {formatIDR(pricePerGram)}
                  <span>/gram</span>
                </p>
                <p className="market-updated">
                  {priceStatus === 'ready'
                    ? `Update terakhir: ${formattedPriceUpdatedAt || 'baru saja'}`
                    : priceStatus === 'loading'
                      ? 'Memuat harga acuan terbaru...'
                      : 'Mode fallback aktif. Harga acuan tetap bisa Anda ubah manual.'}
                </p>
                <div className="market-formula">
                  <h3>Cara Hitung Estimasi</h3>
                  <p>Estimasi = Berat (gram) x Harga acuan x (Karat/24)</p>
                  <p>Harga final ditentukan setelah uji fisik, berat netto, dan kadar aktual.</p>
                </div>
                <p className="market-source">Sumber acuan: {priceSource.replace(/-/g, ' ')}</p>
              </article>
              <div className="price-note">
                {priceStatus === 'ready'
                  ? `Harga otomatis dari API${formattedPriceUpdatedAt ? ` (${formattedPriceUpdatedAt})` : ''}.`
                  : 'Harga fallback aktif. Anda tetap bisa ubah manual sesuai pasar.'}
              </div>
            </div>
            <div className="calculator">
              <label>
                Berat (gram)
                <input
                  type="number"
                  min="1"
                  value={grams}
                  inputMode="numeric"
                  onChange={(e) => setGrams(Math.max(0, Number(e.target.value) || 0))}
                />
              </label>
              <label>
                Kadar (karat)
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={karat}
                  inputMode="numeric"
                  onChange={(e) => setKarat(Number(e.target.value) || 0)}
                />
              </label>
              <label>
                Harga per gram (IDR)
                <input
                  type="number"
                  min="1000"
                  value={pricePerGram}
                  inputMode="numeric"
                  onChange={(e) => setPricePerGram(Math.max(0, Number(e.target.value) || 0))}
                />
              </label>
              <div className="estimate">
                <span>Estimasi</span>
                <strong>{formatIDR(estimate)}</strong>
              </div>
              <p className={`estimate-note ${isEstimateValid ? 'ok' : ''}`}>{estimateNote}</p>
              <a
                className={`btn ${!isEstimateValid ? 'btn-disabled' : ''}`}
                href={
                  isEstimateValid
                    ? `https://wa.me/6285219542001?text=${waEstimateText}`
                    : '#estimasi'
                }
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
            {gallery.map((item, i) => (
              <div key={item.title} className="gallery-card reveal" style={{ '--delay': `${i * 90}ms` }}>
                <img src={item.image} alt={item.alt} loading="lazy" />
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
              {testimonials.map((item, i) => (
                <div key={item.name + item.city} className="testimonial-card reveal" style={{ '--delay': `${i * 80}ms` }}>
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
                Berlokasi utama di Serang, Banten dan melayani area Jabodetabek dengan janji temu.
              </p>
              <a className="area-link" href="/layanan-jabodetabek.html">
                Lihat Detail Layanan Serang & Jabodetabek
              </a>
            </div>
            <div className="branch-grid">
              {branches.map((branch, i) => (
                <div key={branch.city} className="branch-card reveal" style={{ '--delay': `${i * 90}ms` }}>
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
                className="faq-item reveal"
                style={{ '--delay': `${index * 90}ms` }}
                aria-expanded={openFaq === index}
                onClick={() => {
                  const isOpening = openFaq !== index;
                  setOpenFaq(isOpening ? index : -1);
                  if (isOpening && typeof window.gtag === 'function') {
                    window.gtag('event', 'faq_open', {
                      event_category: 'engagement',
                      event_label: item.q
                    });
                  }
                }}
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
        <div className="container">
          <h2>Kontak & Area Layanan</h2>
          <p className="subtitle">Basis operasional di Serang, Banten. Jangkauan layanan aktif untuk area Jabodetabek dengan jadwal janji temu.</p>
          <div className="contact-grid">
            <article className="contact-panel reveal">
              <h3>Hubungi Kami</h3>
              <p>WhatsApp: 0852-1954-2001</p>
              <p>Jam Operasional: 09.00 - 20.00 WIB (Setiap Hari)</p>
              <ul className="sla-list">
                {serviceSla.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="social-btns">
                <a href="https://www.tiktok.com/@terima.jual_emas">TikTok @centraljualemas</a>
                <a href="https://www.facebook.com/jualemastanpasurat">Facebook Central Jual Emas</a>
              </div>
            </article>

            <article className="contact-panel reveal" style={{ '--delay': '80ms' }}>
              <h3>Lokasi Basis</h3>
              <p>Kota Serang, Banten</p>
              <iframe
                className="map-frame"
                src="https://www.google.com/maps?q=Kota%20Serang%2C%20Banten&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta lokasi basis layanan Central Jual Emas di Serang"
              ></iframe>
            </article>

            <article className="contact-panel reveal" style={{ '--delay': '140ms' }}>
              <h3>Cakupan Area Layanan</h3>
              <div className="area-groups">
                {serviceAreas.map((area) => (
                  <div key={area.region} className="area-group">
                    <h4>{area.region}</h4>
                    <div className="area-chips">
                      {area.cities.map((city) => (
                        <span key={city}>{city}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section trust">
        <div className="container">
          <h2>Keamanan & Kepercayaan</h2>
          <p className="subtitle">
            Kami prioritaskan kenyamanan pelanggan dari proses awal sampai dana cair.
          </p>
          <div className="trust-grid">
            {trustPoints.map((item, i) => (
              <article key={item.title} className="trust-card reveal" style={{ '--delay': `${i * 80}ms` }}>
                <span className="iconify" data-icon={item.icon}></span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </article>
            ))}
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

      <a
        href="https://wa.me/6285219542001?text=Halo%20Central%20Jual%20Emas,%20saya%20ingin%20konsultasi%20cepat"
        className="mobile-cta"
        target="_blank"
        rel="noreferrer"
      >
        Konsultasi Cepat via WhatsApp
      </a>

      <a
        href="https://wa.me/6285219542001?text=Halo%20Central%20Jual%20Emas,%20saya%20ingin%20konsultasi%20harga%20emas"
        className="desktop-cta"
        target="_blank"
        rel="noreferrer"
      >
        Konsultasi Harga Emas Sekarang
      </a>
    </div>
  );
}
