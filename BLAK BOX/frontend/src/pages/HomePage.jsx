import React, { useEffect, useState } from 'react';
import HomeNavBar from '../components/HomeNavBar.jsx';
import client from '../api/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from '../components/Footer.jsx';
import '../styles/styleHomePage.css';
import ContactSection from '../components/ContactSection.jsx';

export default function HomePage() {
    console.log('Renderizando HomePage');
    const [categories] = useState([
        { title: 'PC Components', img: '/Images/pc_components.png', desc: 'Motherboards, CPUs, RAM and more.' },
        { title: 'Graphic Cards', img: '/Images/graphics.jpg', desc: 'High-performance GPUs for gaming and work.' },
        { title: 'Peripherals', img: '/Images/peripherals.png', desc: 'Keyboards, mice, headsets and accessories.' },
        { title: 'Smartphones', img: '/Images/smartphones.jpg', desc: 'Latest smartphones and accessories.' },
        { title: 'Laptops', img: '/Images/laptops.jpg', desc: 'Powerful laptops for work and play.' },
        { title: 'Gaming Consoles', img: '/Images/gaming-consoles.jpg', desc: 'Next-gen consoles and games.' },
        { title: 'Smart Home', img: '/Images/smart-home.jpg', desc: 'Smart devices for your home.' },
        { title: 'Wearables', img: '/Images/wearables.png', desc: 'Smartwatches and fitness trackers.' },
        { title: 'Audio', img: '/Images/audio.jpg', desc: 'Headphones, speakers and sound systems.' }
    ]);

    const [brands] = useState([
        { name: 'Logitech', logoUrl: '/Images/logitech_logo.png' },
        { name: 'AMD', logoUrl: '/Images/amd_logo.jpg' },
        { name: 'ASUS', logoUrl: '/Images/ASUS_logo.jpg' },
        { name: 'AsRock', logoUrl: '/Images/asrock_logo.jpg'},
        { name: 'Corsair', logoUrl: '/Images/corsair_logo.jpg'},
        { name: 'Gigabyte', logoUrl: '/Images/gigabyte_logo.png'},
        { name: 'Intel', logoUrl: '/Images/intel_logo.jpg'},
        { name: 'Nvidia', logoUrl: '/Images/nvidia_logo.jpg'},
        { name: 'AMD Radeon', logoUrl: '/Images/radeon_logo.png'},
        { name: 'Redragon', logoUrl: '/Images/redragon_logo.png'},
        { name: 'SecretLab', logoUrl: '/Images/secretlab_logo.png'},
    ]);

    return (
        <>
        <HomeNavBar />

        {/* Hero Section */}
        <section className="hero">
            <div className="overlay"></div>
            <div className="hero-content">
            <h1>Welcome to BLAK BOX</h1>
            <p>Your one-stop solution for all your needs.</p>
            <a href="/store" className="btn btn-hero">Shop Now</a>
            </div>
        </section>
        
        {/* Categories Section */}
        <section className="categories py-5 m-3">
            <div className="container-fluid px-0">
            <h2 className="section-title text-center mb-4">Our Store</h2>
            <div className="row">
                {categories.map(cat => (
                <div key={cat.title} className="col-md-4 mb-4">
                    <div className="category-card">
                    <img src={cat.img} className="card-img-top" alt={cat.title} />
                    <div className="card-body">
                        <h5 className="card-title">{cat.title}</h5>
                        <p className="card-text">{cat.desc}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>

        {/* Brands Carousel */}
        <section className="brands py-5 bg-dark text-white">
        <div className="container text-center">
            <h2 className="section-title mb-4">Our Brands</h2>

            {/* 1) Chunk brands groups of 3 */}
            {(() => {
            const chunks = []
            for (let i = 0; i < brands.length; i += 3) {
                chunks.push(brands.slice(i, i + 3))
            }
            return (
                <div
                id="brandCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
                >
                <div className="carousel-inner">
                    {chunks.map((group, idx) => (
                        <div
                        key={`slide-${idx}`}  // key para cada slide
                        className={`carousel-item ${idx === 0 ? 'active' : ''}`}
                        >
                        <div className="row justify-content-center">
                            {group.map((b) => (
                            <div key={`brand-${b.name}`} className="col-md-4 mb-4 d-flex justify-content-center">
                                <div className="brand-card p-3">
                                <img src={b.logoUrl} alt={b.name} className="img-fluid" />
                                <p className="mt-2">{b.name}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                    ))}
                </div>


                {/* Controls */}
                <button
                    className="carousel-control-prev btn-circle btn-purple"
                    type="button"
                    data-bs-target="#brandCarousel"
                    data-bs-slide="prev"
                >
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button
                    className="carousel-control-next btn-circle btn-purple"
                    type="button"
                    data-bs-target="#brandCarousel"
                    data-bs-slide="next"
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
                </div>
            )
            })()}
        </div>
        </section>

        <ContactSection />
        <Footer />
        </>
    );
    }
